import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import Icon from './IndentIncrease.svg'

export default function({ editor, state }) {
  function action() {
    const { index, length } = state.selection;
    editor.formatLine(index, length, 'indent', '+1');
  }

  return {
    Module: view(props => (
      <Button onClick={action} {...props}>
        <SvgIcon icon={Icon} size={20} />
      </Button>
    ))
  }
}
