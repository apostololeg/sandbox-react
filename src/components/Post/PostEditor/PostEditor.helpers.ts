import pick from 'lodash.pick';

import { clone } from 'tools/object'

const FORM_FIELDS = ['slug', 'slugLock', 'content', 'published'];

export function pickFormData(data) {
  return pick(clone(data), FORM_FIELDS);
}

export function connectAuthor(email) {
  return { connect: { email } };
}

export function titleToSlug(str) {
  const explicitSymbols = ['&nbsp;'];

  if (!str) {
    return '';
  }

  return str
    .replace(new RegExp(`(${explicitSymbols.join('|')})`), '')
    .match(/[\w\d_.-]+/g)
    .join('_')
    .toLowerCase();
}

export function parseTitleFromContent(content) {
  const h1 = content.replace(/(<br>|&nbsp;)/g, '').match('<h1.*?>(.*?)</h1>');
  return h1?.[1] || '';
}
