import { h, render, Component } from 'preact'
import { bind, debounce } from 'decko'

import Flex from 'components/UI/Flex'
import { Link } from 'components/Router'
import Quill from './Quill'
import Toolbar from './Toolbar'
import tools from './tools'

import s from './Editor.styl'

const ON_CHANGE_DELAY = 1000;
const COMPONENTS_TO_HYDRATE = {
  Link
};

class Editor extends Component {
  state = { showToolbar: false };

  componentDidMount() {
    const { onChangeDelay } = this.props;

    this.editor = new Quill('#editor');
    this.tools = tools(this.editor, Quill);
    this.editor.on(
      'editor-change',
      debounce(this.onChange, onChangeDelay || ON_CHANGE_DELAY)
    );

    this.setState({ showToolbar: true }); // eslint-disable-line
  }

  shouldComponentUpdate({ value }, { showToolbar }) {
    if (this.getValue() !== value) {
      this.setValue(value);
    }

    return this.state.showToolbar !== showToolbar;
  }

  @bind
  setValue(value) {
    this.editor.root.innerHTML = value;
    this.hydrateComponents();
  }

  @bind
  getValue() {
    const { innerHTML } = this.editor.root;

    return innerHTML.replace(/data-inited/g, '');
  }

  @bind
  onChange() {
    const { value, onChange } = this.props;
    const newVal = this.getValue();

    if (value === newVal) {
      return;
    }

    onChange(newVal);
    this.hydrateComponents();
  }

  @bind
  hydrateComponents() {
    const nodes = this.editor.root.querySelectorAll(
      '[data-props]:not([data-inited])'
    );

    nodes.forEach(node => {
      const { component, ...props } = JSON.parse(node.dataset.props);
      const C = COMPONENTS_TO_HYDRATE[component];

      if (C) {
        const { textContent = '' } = node;

        node.innerHTML = '';
        render(<C {...props}>{textContent}</C>, node);
        node.setAttribute('data-inited', '');
      }
    });
  }

  render() {
    const { showToolbar } = this.state;

    return (
      <Flex className={s.root}>
        {showToolbar && <Toolbar editor={this.editor} tools={this.tools} />}
        <Flex scrolled id="editor" className={s.editor} />
      </Flex>
    );
  }
}

export default Editor;
