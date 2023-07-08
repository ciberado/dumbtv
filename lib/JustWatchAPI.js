import JustWatch from "justwatch-api";
import Queue from "queue-promise";

const jwClient = new JustWatch({ locale : 'es_ES'});

const providerNames = ['netflix', 'amazonprimevideo', 'disneyplus', 'rtve'];
const providers = {};

(await jwClient.getProviders())
  .filter(p => providerNames.includes(p.technical_name))
  .forEach((p, idx) => providers[p.id] = p);


async function searchStreamingLinks(title) {
    const items = (await jwClient.search({query : title})).items.filter(i => i.offers);
    if (!items) return;

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

const queue = new Queue({
  concurrent: 2,
  interval: 100
});

export default async function enrichAllEntriesWithLinks(entryRowArray) {
  for (let i=0; i < entryRowArray.length; i++) {
    for (let j=0; j < entryRowArray[i].length; j++) {
      const currentEntry = entryRowArray[i][j];
      async function enrichEntryWithLinks() {
        const links = await searchStreamingLinks(currentEntry.original_title);
        currentEntry.streamingLinks = links;
        return currentEntry;
      }
      queue.enqueue(enrichEntryWithLinks)
    }
  }
}
