import { readdir } from 'fs/promises';

export default async function getDirectoryEntries(directoryPath, basePath) {

  const files = await readdir(directoryPath);
    
  let results = files
    .map(f => ({ 
      id : f, 
      title : null, 
      url : null,
      imageUrl : `${basePath}/${f}`,
      description : ''
    }))
  
  return results;
}

