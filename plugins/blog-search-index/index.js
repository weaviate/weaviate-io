const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const CopyPlugin = require('copy-webpack-plugin');

const POST_FILE = /(?:^|\/)(?:index|[^/]+)\.mdx?$/i;
const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function postSlug(filePath, blogDirectory, frontMatter) {
  if (frontMatter.slug) return String(frontMatter.slug).replace(/^\/+|\/+$/g, '');

  const relativePath = path.relative(blogDirectory, filePath).replace(/\\/g, '/');
  const fileSlug = relativePath.replace(/\/(?:index)\.mdx?$/i, '').replace(/\.mdx?$/i, '');
  return fileSlug
    .split('/')
    .map((part) => part.replace(DATE_PREFIX, ''))
    .join('/');
}

function plainDescription(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>|[#>*_`\[\]()!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 220);
}

function relativeImage(filePath, slug, frontMatter) {
  if (typeof frontMatter.image !== 'string' || !frontMatter.image) return null;
  if (frontMatter.image.startsWith('/')) {
    return {publicPath: frontMatter.image};
  }

  const sourcePath = path.resolve(path.dirname(filePath), frontMatter.image);
  if (!fs.existsSync(sourcePath)) return null;
  const extension = path.extname(sourcePath).toLowerCase() || '.png';
  return {
    sourcePath,
    publicPath: `/blog-index-images/${slug}${extension}`,
    outputPath: `blog-index-images/${slug}${extension}`,
  };
}

function readPosts(blogDirectory) {
  return walk(blogDirectory)
    .filter((filePath) => POST_FILE.test(filePath) && !path.basename(filePath).startsWith('_'))
    .map((filePath) => {
      const {data, content} = matter(fs.readFileSync(filePath, 'utf8'));
      const slug = postSlug(filePath, blogDirectory, data);
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
      const image = relativeImage(filePath, slug, data);
      const wordCount = content
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/<[^>]+>|[#>*_`\[\]()!]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

      return {
        title: data.title || slug,
        description: data.description || plainDescription(content),
        permalink: `/blog/${slug}`,
        date: data.date ? new Date(data.date).toISOString() : '',
        readingTime: Math.max(1, Math.ceil(wordCount / 220)),
        tags,
        image: image?.publicPath || '',
        imageSource: image?.sourcePath || '',
        imageOutput: image?.outputPath || '',
        primaryTag: data.primaryTag || tags[0] || '',
        series: data.series || '',
        seriesOrder: Number.isFinite(Number(data.seriesOrder)) ? Number(data.seriesOrder) : null,
        related: Array.isArray(data.related) ? data.related : [],
        draft: Boolean(data.draft),
        unlisted: Boolean(data.unlisted),
      };
    })
    .filter((post) => !post.draft && !post.unlisted)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = function blogSearchIndexPlugin(context) {
  const blogDirectory = path.join(context.siteDir, 'blog');

  return {
    name: 'blog-search-index',
    configureWebpack() {
      const patterns = readPosts(blogDirectory)
        .filter((post) => post.imageSource && post.imageOutput)
        .map((post) => ({from: post.imageSource, to: post.imageOutput}));

      return patterns.length ? {plugins: [new CopyPlugin({patterns})]} : {};
    },
    getPathsToWatch() {
      return [`${blogDirectory}/**/*.{md,mdx}`];
    },
    async loadContent() {
      return readPosts(blogDirectory).map(({imageSource, imageOutput, ...post}) => post);
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData({posts: content});
    },
  };
};
