module.exports = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },  
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "cdn.worldvectorlogo.com",
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
      "www.w3schools.com",
      "www.bing.com"
    ],
  },
};
