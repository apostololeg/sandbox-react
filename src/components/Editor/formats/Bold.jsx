import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

const Bold = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    const val = !format.bold;

    editor.formatText(selection, 'bold', val);
    format.bold = val;
  };

  return (
    <Button onClick={onClick} {...props} disabled={selection.length === 0}>
      Bold
    </Button>
  );
}

export default view(Bold);
