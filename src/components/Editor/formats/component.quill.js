import BaseBlock from 'quill/blots/embed'

class ComponentBlot extends BaseBlock {
  static create({ text, ...props }) {
    const node = super.create(props);

    node.innerText = text;
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('data-props', JSON.stringify(props));

    return node;
  }
}

ComponentBlot.blotName = 'component';
ComponentBlot.tagName = 'span';

export default ComponentBlot;
