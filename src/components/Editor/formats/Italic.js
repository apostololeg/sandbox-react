import { h } from 'preact'
import { view } from 'preact-easy-state'

import Button from 'components/UI/Button'

import IconItalic from './icons/italic.svg'

const Italic = ({ editor, state, ...props }) => {
  const { format, hasUserSelection, selection, blotSelection } = state;
    const currSelection = hasUserSelection ? selection : blotSelection;

    const onClick = () => {
      const val = !format.italic;

      editor.formatText(currSelection, 'italic', val);
      format.italic = val;

      if (!val && !hasUserSelection) {
        editor.setSelection(blotSelection);
      }
    };

  return (
    <Button onClick={onClick} {...props} checked={format.italic}>
      <IconItalic height="20px" />
    </Button>
  );
}

export default view(Italic);
