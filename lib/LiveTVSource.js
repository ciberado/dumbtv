const data = [
    { 
        id : "tvc-tv3", 
        title : "TV3 directe", 
        url : "https://www.hlsplayer.org/play?url=https://directes-tv-cat.ccma.cat/live-origin/tv3-hls/master.m3u8",
        imageUrl : "/channels/tv3.jpg",
        description : "Canal generalista"
      },
      { 
        id : "tvc-324", 
        title : "324 directe", 
        url : "https://www.hlsplayer.org/play?url=https://directes-tv-int.ccma.cat/live-origin/canal324-hls/master.m3u8",
        imageUrl : "/channels/324.jpg",
        description : "Canal notícies"
      },
      { 
        id : "tvc-esports3", 
        title : "Esports3 directe", 
        url : "https://www.hlsplayer.org/play?url=https://directes-tv-cat.ccma.cat/live-origin/esport3-hls/master.m3u8",
        imageUrl : "/channels/esport3.png",
        description : "Canal esportiu"
      },
      { 
        id : "bbc-news", 
        title : "BBC News Audio", 
        url : "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
        imageUrl : "/channels/bbc-news.png",
        description : "Canal esportiu"
      }

      
];



export default async function getLifeTVEntries() {
    return data;
}