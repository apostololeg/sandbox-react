import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import increaseSvg from './icons/indent_increase.svg'

const IndentPlus = ({ editor, state, ...props }) => {
  const onClick = () => {
    console.log(state.selection);
    const { index, length } = state.selection.default;
    editor.formatLine(index, length, 'indent', '+1');
  };

  return (
    <Button onClick={onClick} {...props}>
      <SvgIcon icon={increaseSvg} size={20} />
    </Button>
  );
}

export default view(IndentPlus);
