import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import Icon from './Bold.svg'

export default function({ editor, state }) {
  function action() {
    const { index, length } = state.selection;
    editor.formatText(index, length, 'bold', !state.format.bold);
  }

  return {
    action,
    hotkey: 'b',
    Module: view(props => (
      <Button onClick={action} checked={state.format.bold} {...props}>
        <SvgIcon icon={Icon} size={20} />
      </Button>
    ))
  }
}
