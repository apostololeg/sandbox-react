import { h, Component } from 'preact'
import { store, view } from 'preact-easy-state'
import { bind, debounce } from 'decko'

import Headers from '../formats/Headers'
import Bold from '../formats/Bold'
import Italic from '../formats/Italic'
import Link from '../formats/Link'
import ListBulleted from '../formats/ListBulleted'
import ListNumbered from '../formats/ListNumbered'
import IndentPlus from '../formats/IndentPlus'
import IndentMinus from '../formats/IndentMinus'
import Image from '../embeds/Image'

import s from './Toolbar.styl'

@view
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.store = store({
      selection: false,
      format: {},
    });
  }

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
    const editorSelection = editor.getSelection();
    const blotSelection = this.getBlotSelection(Object(editorSelection).index);
    const selection = editorSelection || blotSelection;

    Object.assign(this.store, {
      selection,
      blotSelection,
      hasUserSelection: selection.length > 0,
      format: editor.getFormat(selection)
    });
  }

  getBlotSelection(index = 0) {
    const { editor } = this.props;
    const blot = editor.scroll.path(index).slice(-1)[0][0];

    return {
      index: blot.offset(editor.scroll),
      length: blot.length()
    };
  }

  render() {
    const { editor, tools } = this.props;
    const itemProps = {
      className: s.item,
      editor,
      tools,
      state: this.store,
    };

    return (
      <div className={s.toolbar}>
        <Headers key="headers" {...itemProps} />
        <Bold key="bold" {...itemProps} />
        <Italic key="italic" {...itemProps} />
        <Link key="link" {...itemProps} />
        <ListBulleted key="list-bulleted" {...itemProps} />
        <ListNumbered key="list-numbered" {...itemProps} />
        <IndentMinus key="intent-minus" {...itemProps} />
        <IndentPlus key="intent-plus" {...itemProps} />
        <Image key="image" {...itemProps} />
      </div>
    );
  }
};

export default Toolbar;
