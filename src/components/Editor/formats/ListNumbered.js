import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import numberedSvg from './icons/list_numbered.svg'

const List = ({ editor, state, ...props }) => {
  const { format, selection } = state;

  const onClick = () => {
    const val = format.list === 'ordered' ? false : 'ordered';
    const { index, length } = selection.default

    editor.formatLine(index, length, 'list', val);
    format.list = val;
  };

  return (
    <Button onClick={onClick} {...props}>
      <SvgIcon icon={numberedSvg} size={20} />
    </Button>
  );
}

export default view(List);
