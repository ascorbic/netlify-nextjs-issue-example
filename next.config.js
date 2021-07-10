module.exports = {
  reactStrictMode: true,
  target: "serverless",
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return cfg;
  },
  future: {
    webpack5: true,
  },
};
