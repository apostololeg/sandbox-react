import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

import IconIncrease from './icons/indent_increase.svg'

const IndentPlus = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    editor.formatLine(selection.index, selection.length, 'indent', '+1');
  };

  return (
    <Button onClick={onClick} {...props}>
      <IconIncrease height="20px" />
    </Button>
  );
}

export default view(IndentPlus);
