import { h } from 'preact'
import { view } from 'preact-easy-state'

import Select from 'components/UI/Select'
import SvgIcon from 'components/UI/SvgIcon'

import icons from './icons'

const OPTIONS = [
  { text: 'H1', val: 'h1' },
  { text: 'H2', val: 'h2' },
  { text: 'H3', val: 'h3' },
];

export default function({ editor, state }) {
  function action() {
    const { index, length } = state.selection;
    editor.formatText(index, length, 'bold', !state.format.bold);
  }

  return {
    action,
    Module: view(props => {
      const getValue = () => {
        if (!state.format.header) return null
        return OPTIONS[state.format.header - 1].val
      };
      const onChange = val => {
        const { index, length } = state.selection;
        const newVal = val === getValue() ? false : val;

        editor.removeFormat(index, length);
        editor.formatLine(index, length, 'header', newVal);
      };

      const val = getValue();
      const icon = icons[val] || icons.h1;

      return (
        <Select
         options={OPTIONS}
         popupProps={{ horizontal: 'left' }}
         menuProps={{ highlighted: true, padded: true }}
         value={val}
         onChange={onChange}
         renderLabel={() => <SvgIcon icon={icon} size={20} />}
         {...props}
       />
      );
    })
  }
}
