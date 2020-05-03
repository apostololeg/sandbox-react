import Button from 'components/UI/Button';
import SvgIcon from 'components/UI/SvgIcon';

import Icon from './Bold.svg';

export default {
  hotkey: 'b',
  action({ editor, state }) {
    const { format, selection } = state;
    const { index, length } = selection;

    editor.formatText(index, length, 'bold', !format.bold);
  },
  Module({ state, action }) {
    return (
      <Button onClick={action} checked={state.format.bold}>
        <SvgIcon icon={Icon} size={20} />
      </Button>
    );
  },
};
