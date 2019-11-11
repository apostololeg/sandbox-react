import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import linkSvg from './icons/link.svg'

const Link = ({ editor, state, ...props }) => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, []);

  const onKeyDown = e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      formatLink();
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const formatLink = () => {
    const { index, length } = state.selection.default;
    const children = editor.getText(index, length);
    const href = prompt(`Link for "${children}"`); // eslint-disable-line
    // TODO: upgrade popup and ask more props for component

    if (!href) {
      return;
    }

    editor.deleteText(index, length);
    editor.insertEmbed(index, 'component', {
      component: 'Link',
      isClearPadding: true,
      children,
      href
    });
  };

  const isDisabled = state.selection.default.length === 0;

  return (
    <Button onClick={formatLink} {...props} disabled={isDisabled}>
      <SvgIcon icon={linkSvg} size={20} />
    </Button>
  );
}

export default view(Link);
