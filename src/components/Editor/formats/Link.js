import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

import IconLink from './icons/link.svg'

const Link = ({ editor, state: { selection }, ...props }) => {
  const onClick = () => {
    const { index, length } = selection;
    const children = editor.getText(index, length);
    const href = prompt(`Link for "${children}"`); // eslint-disable-line
    // TODO: upgrade popup and ask more props for component

    editor.deleteText(index, length);
    editor.insertEmbed(index, 'component', {
      component: 'Link',
      isClearPadding: true,
      children,
      href
    });
  };

  return (
    <Button onClick={onClick} {...props} disabled={selection.length === 0}>
      <IconLink height="20px" />
    </Button>
  );
}

export default view(Link);
