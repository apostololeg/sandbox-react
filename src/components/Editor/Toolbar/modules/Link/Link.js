import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import Icon from './Link.svg'

export default function({ editor, state }) {
  function action() {
    const { index, length } = state.selection;
    const children = editor.getText(index, length);

    if (!children) return;

    // TODO: upgrade popup and ask more props for component
    const href = prompt(`Link for "${children}"`); // eslint-disable-line

    if (!href) return;

    editor.deleteText(index, length);
    editor.insertEmbed(index, 'component', {
      component: 'Link',
      isClearPadding: true,
      children,
      href
    });
  }

  return {
    action,
    hotkey: 'k',
    Module: view(props => (
      <Button
        onClick={action}
        {...props}
        disabled={state.selection.length === 0}
      >
        <SvgIcon icon={Icon} size={20} />
      </Button>
    ))
  }
}
