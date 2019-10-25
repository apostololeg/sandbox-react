import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import decreaseSvg from './icons/indent_decrease.svg'

const IndentPlus = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    editor.formatLine(selection.index, selection.length, 'indent', '-1');
  };

  return (
    <Button onClick={onClick} {...props}>
      <SvgIcon icon={decreaseSvg} size={20} />
    </Button>
  );
}

export default view(IndentPlus);
