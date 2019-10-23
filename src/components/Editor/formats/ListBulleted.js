import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

import IconBulleted from './icons/list_bulleted.svg'

const List = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    const val = format.list === 'bullet' ? false : 'bullet';

    editor.formatLine(selection.index, selection.length, 'list', val);
    format.list = val;
  };

  return (
    <Button onClick={onClick} {...props}>
      <IconBulleted height="20px" />
    </Button>
  );
}

export default view(List);
