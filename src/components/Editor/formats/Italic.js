import React from 'react'
import { view } from 'react-easy-state'

import Button from 'components/UI/Button'

const Italic = ({ editor, state: { format, selection }, ...props }) => {
  const onClick = () => {
    const val = !format.italic;

    editor.formatText(selection, 'italic', val);
    format.italic = val;
  };

  return (
    <Button onClick={onClick} {...props} disabled={selection.length === 0}>
      Italic
    </Button>
  );
}

export default view(Italic);
