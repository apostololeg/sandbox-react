import React, { Component } from 'react'
import { bind, debounce } from 'decko'

import Flex from 'components/UI/Flex'

import Quill from './Quill'
import Toolbar from './Toolbar'
import tools from './tools'

import s from './Editor.styl'

const ON_CHANGE_DELAY = 1000;

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
  }

  @bind
  getValue() {
    return this.editor.root.innerHTML;
  }

  @bind
  onChange() {
    const { value, onChange } = this.props;
    const newVal = this.getValue();

    if (value === newVal) {
      return;
    }

    onChange(newVal);
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
