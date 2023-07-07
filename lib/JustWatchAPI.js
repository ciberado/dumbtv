import JustWatch from "justwatch-api";

const client = new JustWatch({ locale : 'es_ES'});

const providerNames = ['netflix', 'amazonprimevideo', 'disneyplus', 'rtve'];
const providers = {};

(await client.getProviders())
  .filter(p => providerNames.includes(p.technical_name))
  .forEach((p, idx) => providers[p.id] = p);


export default searchStreamingLinks(title) {
    const items = (await client.search({query : title})).items.filter(i => i.offers);
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
