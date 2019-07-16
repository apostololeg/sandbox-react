import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { bind } from 'decko'

import FullPage from 'components/UI/FullPage'

import Quill from './Quill'
import Toolbar from './Toolbar'
import tools from './tools'

import s from './Editor.styl'

const ON_CHANGE_DELAY = 1000;

class Editor extends Component {
  state = { showToolbar: false };

  componentDidMount() {
    const { onChangeDelay, onApi } = this.props;

    this.editor = new Quill('#editor');
    this.tools = tools(this.editor, Quill);
    this.editor.on(
      'editor-change',
      debounce(this.onChange, onChangeDelay || ON_CHANGE_DELAY)
    );

    this.setState({ showToolbar: true }); // eslint-disable-line

    if (onApi) {
      onApi({
        getValue: this.getValue,
        setValue: this.setValue
      });
    }
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
    const { onChange } = this.props;

    onChange(this.getValue());
  }

  render() {
    const { showToolbar } = this.state;

    return (
      <FullPage className={s.root}>
        {showToolbar && <Toolbar editor={this.editor} tools={this.tools} />}
        <FullPage scroll id="editor" className={s.editor} />
      </FullPage>
    );
  }
}

export default Editor;
