import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

import IconNumbered from './icons/list_numbered.svg'

const List = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    const val = format.list === 'ordered' ? false : 'ordered';

    editor.formatLine(selection.index, selection.length, 'list', val);
    format.list = val;
  };

  return (
    <Button onClick={onClick} {...props}>
      <IconNumbered height="20px" />
    </Button>
  );
}

export default view(List);
