 const md = require('./utils/markdown.js')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("assets");
  // responsive images below does not work pls fix
  // eleventyConfig.setLibrary('md', md)
};