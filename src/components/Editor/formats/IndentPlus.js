import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import increaseSvg from './icons/indent_increase.svg'

const IndentPlus = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    editor.formatLine(selection.index, selection.length, 'indent', '+1');
  };

  return (
    <Button onClick={onClick} {...props}>
      <SvgIcon icon={increaseSvg} size={20} />
    </Button>
  );
}

export default view(IndentPlus);
