import Keyv from "keyv";
import JustWatch from "justwatch-api";
import Queue from "queue-promise";

const cache = new Keyv('sqlite:///tmp/dumbtv.sqlite',  { namespace: 'justwatch', ttl : 1000*60*60*24*7 /* one week */ });
cache.on('error', (error) => {
  console.error(`Cache not available: ${error}.`);
});

const jwClient = new JustWatch({ locale : 'es_ES'});

const providerNames = ['netflix', 'amazonprimevideo', 'disneyplus', 'rtve'];
const providers = {};

(await jwClient.getProviders())
  .filter(p => providerNames.includes(p.technical_name))
  .forEach((p, idx) => providers[p.id] = p);

async function searchStreamingLinks(title) {
  const items = (await jwClient.search({query : title})).items.filter(i => i.offers);
  if (items.length === 0) return;
  // First match should be the best candidate
  const preferredItem = items[0];
  preferredItem.offers = preferredItem.offers
      // Subscriptions only
      .filter(o => o.monetization_type === 'flatrate'
      // Preferred providers only
                  && Object.keys(providers).includes(o.provider_id.toString())
      )
      // StreamingLink object
      .map(o => ({ provider : providers[o.provider_id].technical_name,
                      url : o.urls.deeplink_web
                })
      )
      // Remove duplicated
      .filter((o1, index, self) =>
              index === self.findIndex((o2) => (
              o1.url === o2.url
              ))
      );

      return preferredItem;
}

export default async function enrichAllEntriesWithLinks(entryRowArray) {
  const queue = new Queue({
    concurrent: 2,
    interval: 100
  });
    
  for (let i=0; i < entryRowArray.length; i++) {
    for (let j=0; j < entryRowArray[i].length; j++) {
      const currentEntry = entryRowArray[i][j];
      const currentTitle = currentEntry.original_title || currentEntry.name;

      const streamingLinks = await cache.get(currentTitle);
      if (streamingLinks) {
        console.debug(`Retreived from cache. ${currentTitle}.`);
        currentEntry.streamingLinks = streamingLinks;
        continue;
      }
          
      async function enrichEntryWithLinks() {
        const links = await searchStreamingLinks(currentTitle);
        currentEntry.streamingLinks = links;
        cache.set(currentTitle, links ? links : {});
        console.debug(`Saved in the cache: ${currentTitle}.`);
        return currentEntry;
      }

      console.debug(`Not found in the cache. Queuing ${currentTitle} .`);
      queue.enqueue(enrichEntryWithLinks)      
    }
  }

  return new Promise(function(resolve, reject) {
    if (queue.size === 0) {
      resolve(entryRowArray);
    } else {
      queue.on("end", () => resolve(entryRowArray));
    }
  });
}
