import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'
import SvgIcon from 'components/UI/SvgIcon'

import boldSvg from './icons/bold.svg'

const Bold = ({ editor, state, ...props }) => {
  const { format, hasUserSelection, selection, blotSelection } = state;
  const currSelection = hasUserSelection ? selection : blotSelection;

  const onClick = () => {
    const val = !format.bold;

    editor.formatText(currSelection, 'bold', val);
    format.bold = val;

    if (!val && !hasUserSelection) {
      editor.setSelection(blotSelection);
    }
  };

  return (
    <Button onClick={onClick} {...props} checked={format.bold}>
      <SvgIcon icon={boldSvg} size={20} />
    </Button>
  );
}

export default view(Bold);
