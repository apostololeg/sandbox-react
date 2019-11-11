import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import italicSvg from './icons/italic.svg'

const Italic = ({ editor, state, ...props }) => {
  const { format, selection } = state;

  const onClick = () => {
    const val = !format.italic;

    editor.formatText(selection.default, 'italic', val);
    format.italic = val;
    selection.update();
  };

  return (
    <Button onClick={onClick} {...props} checked={format.italic}>
      <SvgIcon icon={italicSvg} size={20} />
    </Button>
  );
}

export default view(Italic);
