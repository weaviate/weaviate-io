const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POST_FILE = /(?:^|\/)(?:index|[^/]+)\.mdx?$/i;
const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function validDate(value) {
  if (value instanceof Date) return !Number.isNaN(value.getTime());
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
}

function postPath(filePath, blogDirectory, frontMatter) {
  if (frontMatter.slug) {
    return `/blog/${String(frontMatter.slug).replace(/^\/+|\/+$/g, '')}`;
  }

  const relativePath = path.relative(blogDirectory, filePath).replace(/\\/g, '/');
  const slug = relativePath
    .replace(/\/(?:index)\.mdx?$/i, '')
    .replace(/\.mdx?$/i, '')
    .split('/')
    .map((part) => part.replace(DATE_PREFIX, ''))
    .join('/');
  return `/blog/${slug}`;
}

function normalizeBlogPath(value) {
  return String(value).split(/[?#]/, 1)[0].replace(/\/$/, '');
}

function relatedPath(entry) {
  if (typeof entry === 'string') return entry;
  if (!entry || typeof entry !== 'object') return '';
  return entry.permalink || entry.href || entry.link || '';
}

function validatePost(filePath, blogDirectory, knownPostPaths) {
  const {data} = matter(fs.readFileSync(filePath, 'utf8'));
  const relativePath = path.relative(blogDirectory, filePath);
  const errors = [];

  if ('imageAlt' in data && (typeof data.imageAlt !== 'string' || !data.imageAlt.trim())) {
    errors.push('`imageAlt` must be a non-empty string');
  }

  if ('last_update' in data) {
    const updatedDate = data.last_update?.date;
    if (!validDate(updatedDate)) {
      errors.push('`last_update.date` must be a valid YYYY-MM-DD date');
    } else if (validDate(data.date) && new Date(updatedDate) < new Date(data.date)) {
      errors.push('`last_update.date` cannot be earlier than the publication date');
    }
  }

  if ('related' in data) {
    if (!Array.isArray(data.related)) {
      errors.push('`related` must be an array of blog paths');
    } else {
      const paths = data.related.map(relatedPath);
      paths.forEach((related, index) => {
        if (typeof related !== 'string' || !related.startsWith('/blog/')) {
          errors.push(`\`related[${index}]\` must begin with /blog/`);
        } else if (!knownPostPaths.has(normalizeBlogPath(related))) {
          errors.push(`\`related[${index}]\` does not match an existing blog post`);
        }
      });
      if (new Set(paths).size !== paths.length) {
        errors.push('`related` must not contain duplicate paths');
      }
    }
  }

  return errors.map((error) => `  ${relativePath}: ${error}`);
}

module.exports = function blogFrontmatterValidationPlugin(context) {
  const blogDirectory = path.join(context.siteDir, 'blog');

  return {
    name: 'blog-frontmatter-validation',
    getPathsToWatch() {
      return [`${blogDirectory}/**/*.{md,mdx}`];
    },
    async loadContent() {
      const postFiles = walk(blogDirectory)
        .filter((filePath) => POST_FILE.test(filePath) && !path.basename(filePath).startsWith('_'));
      const knownPostPaths = new Set(postFiles.map((filePath) => {
        const {data} = matter(fs.readFileSync(filePath, 'utf8'));
        return normalizeBlogPath(postPath(filePath, blogDirectory, data));
      }));
      const errors = postFiles
        .flatMap((filePath) => validatePost(filePath, blogDirectory, knownPostPaths));

      if (errors.length) {
        throw new Error(`Invalid blog frontmatter:\n${errors.join('\n')}`);
      }

      return null;
    },
  };
};
