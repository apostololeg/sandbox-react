import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import icons from './icons'

export default function({ editor, state }) {
  function getValue() {
    const { format } = state;

    if (!format.align) return 'center';
    if (format.align === 'center') return 'right';
    return false;
  }

  function getIcon() {
    const { format } = state;
    return icons[format.align] || icons.left;
  }

  function action() {
    const { index, length } = state.selection;
    editor.formatLine(index, length, 'align', getValue());
  }

  return {
    action,
    Module: view(props => (
      <Button onClick={action} {...props}>
        <SvgIcon icon={getIcon()} size={20} />
      </Button>
    ))
  }
}
