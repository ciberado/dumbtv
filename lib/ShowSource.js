import enrichAllEntriesWithLinks from "./JustWatchAPI";

async function getShowEntries(path) {
  const data = await fetch(`https://api.themoviedb.org/3${path}`);
  const entries = (await data.json()).results;
  return entries;
}

export default async function getShowsEntries() {

  const apiKey = process.env.API_KEY;

  const [
    trending,
    action,
    netflix,
    topRated,
    comedy,
    documentary,
  ] = await Promise.all([
    getShowEntries(`/trending/all/week?api_key=${apiKey}&language=es-ES`),
    getShowEntries(`/discover/movie?api_key=${apiKey}&with_genres=28&language=es-ES`),
    getShowEntries(`/discover/tv?api_key=${apiKey}&witg_network=213&language=es-ES`),
    getShowEntries(`/movie/top_rated?api_key=${apiKey}&language=es-ES`),
    getShowEntries(`/discover/movie?api_key=${apiKey}&with_genres=35&language=es-ES`),
    getShowEntries(`/discover/movie?api_key=${apiKey}&with_genres=99&language=es-ES`)
  ]);

  await enrichAllEntriesWithLinks([
    trending,
    action,
    netflix,
    topRated,
    comedy,
    documentary
  ]); 

  return {
    trending,
    action,
    netflix,
    topRated,
    comedy,
    documentary
  };

}