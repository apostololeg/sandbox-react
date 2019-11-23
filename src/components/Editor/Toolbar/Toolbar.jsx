import { h, Component } from 'preact'
import { store, view } from 'preact-easy-state'
import { bind, debounce } from 'decko'

import { DEFAULT_SELECTION } from '../tools'

import getModules from './modules'

import s from './Toolbar.styl'

class Toolbar extends Component {
  hasUserSelection = false;

  constructor(props) {
    super(props);

    const { editor, tools } = props;

    this.store = store({
      format: {},
      selection: DEFAULT_SELECTION,
    });

    const { modules, actions } = getModules({
      tools,
      editor,
      state: this.store,
    });

    this.modules = modules;
    this.actions = actions;
  }

  componentDidMount() {
    const { editor } = this.props;

    document.addEventListener('keydown', this.onKeyDown, true);
    editor.on('selection-change', this.onSelectionChange);
    editor.on('editor-change', this.updateState);
  }

  componentWillUnmount() {
    const { editor } = this.props;

    document.removeEventListener('keydown', this.onKeyDown, true);
    editor.off('selection-change', this.onSelectionChange);
    editor.off('editor-change', this.updateState);
  }

  @bind
  onKeyDown(e) {
    const isMeta = e.ctrlKey || e.metaKey;
    const action = this.actions[e.key];

    const { editor } = this.props;
    const { selection } = this.store;
    const { index, length } = selection;

    if (!isMeta || !action) return;

    e.preventDefault();
    e.stopPropagation();

    if (!this.hasUserSelection && length > 0) {
      editor.setSelection(index, length);
    }

    action();
  }

  @bind
  @debounce(200)
  onSelectionChange() {
    this.updateState();
  }

  @bind
  updateState() {
    this.updateSelection();
    this.updateFormat();
  }

  @bind
  updateSelection() {
    const { editor, tools } = this.props;
    const userSelection = editor.getSelection();

    this.hasUserSelection = userSelection?.length > 0;
    this.store.selection = this.hasUserSelection
      ? userSelection
      : tools.getWordSelection();
  }

  @bind
  updateFormat() {
    const { editor } = this.props;
    const { index, length } = this.store.selection;
    const newFormat = editor.getFormat(index, length);

    this.store.format = newFormat;
  }

  render() {
    return (
      <div className={s.toolbar}>
        {this.modules.map(Module => <Module className={s.item} />)}
      </div>
    );
  }
};

export default view(Toolbar);
