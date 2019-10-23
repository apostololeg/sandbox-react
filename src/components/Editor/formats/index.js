import Header from 'quill/formats/header'
import Bold from 'quill/formats/bold'
import Italic from 'quill/formats/italic'
import { IndentClass } from 'quill/formats/indent'
import List, { ListItem } from 'quill/formats/list'
import Component from './component.quill'

export default {
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header,
  'formats/list': List,
  'formats/list-item': ListItem,
  'formats/indent': IndentClass,
  'formats/component': Component
};
