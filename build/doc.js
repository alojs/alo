'use strict';

const docdown = require('docdown');
const fs = require('fs-extra');
const path = require('path');

const basePath = path.join(__dirname, '..');
const docPath = path.join(basePath, 'doc');
const readmePath = path.join(docPath, 'README.md');

const pkg = require('../package.json');
const version = pkg.version;

const config = {
  'base': {
    'path': path.join(basePath, 'src', 'main.js'),
    'title': `<a href="https://lufrai.github.io/alo/">alo</a> <span>v${ version }</span>`,
    'toc': 'categories',
    'url': `https://github.com/lufrai/alo/blob/${ version }/alo.js`,
    'style': 'github',
    'sublinks': [npmLink('&#x24C3;', 'See the npm package')]
  }
};

/**
 * Composes a npm link from `text` and optional `title`.
 *
 * @private
 * @param {string} text The link text.
 * @param {string} [title] The link title.
 * @returns {string} Returns the composed npm link.
 */
function npmLink(text, title) {
  return (
    '<% if (name == "templateSettings" || !/^(?:methods|properties|seq)$/i.test(category)) {' +
      'print(' +
        '"[' + text + '](https://www.npmjs.com/package/alo." + name.toLowerCase() + ' +
        '"' + (title == null ? '' : ' \\"' + title + '\\"') + ')"' +
      ');' +
    '} %>'
  );
}

/**
 * Post-process `markdown` to make adjustments.
 *
 * @private
 * @param {string} markdown The markdown to process.
 * @returns {string} Returns the processed markdown.
 */
function postprocess(markdown) {
  // Wrap symbol property identifiers in brackets.
  return markdown.replace(/\.(Symbol\.(?:[a-z]+[A-Z]?)+)/g, '[$1]');
}

/*----------------------------------------------------------------------------*/

/**
 * Creates the documentation markdown formatted for 'github' or 'site'.
 *
 * @private
 * @param {string} type The format type.
 */
function build(type) {
  const markdown = docdown(config.base);

  fs.writeFile(readmePath, postprocess(markdown));
}

build();
