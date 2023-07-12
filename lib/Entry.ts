export interface Provider {
    provider: string;
    
    url : string;
}

export interface Entry {

    id : string;

    title : string;

    originalTitle : string;

    url : string;

    imageUrl : string;

    description : string;

    streamingLinks : {
        providers : Provider[]
    }

}

