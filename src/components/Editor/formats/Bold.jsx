import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import boldSvg from './icons/bold.svg'

const Bold = ({ editor, state, ...props }) => {
  const { format, selection } = state;

  const onClick = () => {
    const val = !format.bold;

    editor.formatText(selection.default, 'bold', val);
    format.bold = val;
    selection.update();
  };

  return (
    <Button onClick={onClick} {...props} checked={format.bold}>
      <SvgIcon icon={boldSvg} size={20} />
    </Button>
  );
}

export default view(Bold);
