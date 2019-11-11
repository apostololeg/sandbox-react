import { h } from 'preact';
import { view } from 'preact-easy-state';

import Select from 'components/UI/Select';

const OPTIONS = [
  { text: 'Header 1', val: 'h1' },
  { text: 'Header 2', val: 'h2' },
  { text: 'Header 3', val: 'h3' },
];

const Headers = ({ editor, state, ...props }) => {
  const { format, selection } = state;
  const getValue = () => Object(OPTIONS[format.header - 1]).val;
  const onChange = val => {
    const newVal = val === getValue() ? false : val;

    editor.removeFormat(selection.default);
    editor.formatLine(selection.default, 'header', newVal);
  };

  return (
    <Select
      options={OPTIONS}
      popupProps={{ horizontal: 'left' }}
      menuProps={{ highlighted: true, padded: true }}
      value={getValue()}
      onChange={onChange}
      {...props}
    />
  );
}

export default view(Headers);
