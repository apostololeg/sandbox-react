import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import icons from './icons'

export default function({ editor, state }) {
  function getValue() {
    const { format } = state;

    if (format.list === 'bullet') return 'ordered';
    if (format.list === 'ordered') return false;
    return 'bullet';
  }

  function getIcon() {
    return icons[state.format.list] || icons.bullet;
  }

  function action() {
    const { index, length } = state.selection;
    return editor.formatLine(index, length, 'list', getValue());
  }

  return {
    action,
    hotkey: 'l',
    Module: view(props => (
      <Button onClick={action} checked={state.format.list} {...props}>
        <SvgIcon icon={getIcon()} size={20} />
      </Button>
    ))
  }
}
