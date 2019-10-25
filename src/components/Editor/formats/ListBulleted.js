import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import bulletedSvg from './icons/list_bulleted.svg'

const List = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    const val = format.list === 'bullet' ? false : 'bullet';

    editor.formatLine(selection.index, selection.length, 'list', val);
    format.list = val;
  };

  return (
    <Button onClick={onClick} {...props}>
      <SvgIcon icon={bulletedSvg} size={20} />
    </Button>
  );
}

export default view(List);
