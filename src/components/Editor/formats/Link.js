import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

const Link = ({ editor, state: { selection }, ...props }) => {
  const onClick = () => {
    const { index, length } = selection;
    const text = editor.getText(index, length);
    const link = prompt(`Link for "${text}"`); // eslint-disable-line

    editor.format('link', link);
  };

  return (
    <Button onClick={onClick} {...props} disabled={selection.length === 0}>
      Link
    </Button>
  );
}

export default view(Link);
