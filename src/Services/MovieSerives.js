const key='4a0f67b5aa5e88373e303e556f8cff59';
const base_url="https://api.themoviedb.org/3/"

const database={
   popular:`${base_url}/movie/popular?language=en-US&page=1&api_key=${key}`,
   toprated:`${base_url}/movie/top_rated?api_key=${key}`,
   trending:`${base_url}/movie/popular?language=en-in&page=3&api_key=${key}`,
   comedy:`${base_url}/search/movie?api_key=${key}&query=comedy&page=1`,
   upcoming:`${base_url}/movie/upcoming?page=1&api_key=${key}`
}

export function createimage(size,file){
   return `https://image.tmdb.org/t/p/${size}/${file}`
}

export default database


// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=API_KEY

// 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1