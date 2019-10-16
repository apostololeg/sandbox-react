import Header from 'quill/formats/header';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Indent from 'quill/formats/indent';
import List, { ListItem } from 'quill/formats/list';
import Component from './component.quill';

console.log(Indent);

export default {
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header,
  'formats/list': List,
  'formats/list-item': ListItem,
  // 'formats/indent': Indent,
  'formats/component': Component
};
