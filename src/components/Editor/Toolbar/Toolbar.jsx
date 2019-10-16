import { h, Component } from 'preact';
import { store, view } from 'preact-easy-state';
import { bind, debounce } from 'decko';

import Headers from '../formats/Headers';
import Bold from '../formats/Bold';
import Italic from '../formats/Italic';
import Link from '../formats/Link';
import List from '../formats/List';
import IndentPlus from '../formats/IndentPlus';
import IndentMinus from '../formats/IndentMinus';
import Image from '../embeds/Image';

import s from './Toolbar.styl';

const state = store({
  selection: false,
  format: {},
});

class Toolbar extends Component {
  componentDidMount() {
    const { editor } = this.props;

    editor.on('selection-change', this.onSelectionChange);
    editor.on('editor-change', this.updateState);
  }

  componentWillUnmount() {
    const { editor } = this.props;

    editor.off('selection-change', this.onSelectionChange);
    editor.off('editor-change', this.updateState);
  }

  @bind
  @debounce(200)
  onSelectionChange() {
    this.updateState();
  }

  @bind
  updateState() {
    const { editor } = this.props;

    state.selection = editor.getSelection() || [];
    state.format = editor.getFormat(state.selection);
  }

  render() {
    const { editor, tools } = this.props;
    const itemProps = {
      className: s.item,
      editor,
      tools,
      state,
    };

    return (
      <div className={s.toolbar}>
        <Headers key="headers" {...itemProps} />
        <Bold key="bold" {...itemProps} />
        <Italic key="italic" {...itemProps} />
        <Link key="link" {...itemProps} />
        <Image key="image" {...itemProps} />
        <List key="list" {...itemProps} />
      </div>
    );
  }
};

export default view(Toolbar);
