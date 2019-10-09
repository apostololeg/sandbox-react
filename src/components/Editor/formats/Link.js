import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

const Link = ({ editor, state: { selection }, ...props }) => {
  const onClick = () => {
    const { index, length } = selection;
    const text = editor.getText(index, length);
    const href = prompt(`Link for "${text}"`); // eslint-disable-line
    // TODO: upgrade popup and ask more props for component

    editor.deleteText(index, length);
    editor.insertEmbed(index, 'component', {
      component: 'Link',
      isClearPadding: true,
      text,
      href
    });
  };

  return (
    <Button onClick={onClick} {...props} disabled={selection.length === 0}>
      Link
    </Button>
  );
}

export default view(Link);
