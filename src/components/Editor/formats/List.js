import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

const List = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    const val = format.list ? false : 'bullet';

    editor.formatLine(selection.index, selection.length, 'list', val);
    format.list = val;
  };

  return (
    <Button onClick={onClick} {...props}>
      List
    </Button>
  );
}

export default view(List);
