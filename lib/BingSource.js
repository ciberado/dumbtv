
/*
from https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10&mkt=es-ES

const data = 
{
    "images": [
      {
        "startdate": "20230702",
        "fullstartdate": "202307022200",
        "enddate": "20230703",
        "url": "/th?id=OHR.CoyoteBanff_ES-ES5413226119_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "urlbase": "/th?id=OHR.CoyoteBanff_ES-ES5413226119",
        "copyright": "Un coyote en Banff, Canadá (© Harry Collins/Getty Images)",
        "copyrightlink": "https://www.bing.com/search?q=coyote&form=hpcapt&filters=HpDate%3a%2220230702_2200%22",
        "title": "¿Cuál es este astuto canino?",
        "quiz": "/search?q=Bing+homepage+quiz&filters=WQOskey:%22HPQuiz_20230702_CoyoteBanff%22&FORM=HPQUIZ",
        "wp": true,
        "hsh": "d0cd60e66438cceaa50f06e833f24647",
        "drk": 1,
        "top": 1,
        "bot": 1,
        "hs": []
      }
  };
*/

  
export default async function getBingEntries() {
  let fetchRequests = await Promise.all(
    [0, 1].map(n=>n*7).map(n => fetch(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${n}&n=8&mkt=es-ES`)));
  let jsons = await Promise.all(fetchRequests.map(r => r.json()));
  
  
  let results = jsons
    .map(b => b.images)
    .flat()
    .map(d => ({ 
      id : d.fullstartdate, 
      title : d.title, 
      url : null,
      imageUrl : `https://www.bing.com/${d.url}`,
      description : d.copyright
    }))
    .filter((e1, index, self) =>
      index === self.findIndex((e2) => (
        e2.id === e1.id
      ))
    );  
  console.log(results.map(e=>e.title));
  
  return results;
}

