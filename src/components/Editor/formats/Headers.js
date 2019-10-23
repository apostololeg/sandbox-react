import { h } from 'preact';
import { view } from 'preact-easy-state';

import Select from 'components/UI/Select';

const OPTIONS = [
  { text: 'Header 1', val: 'h1' },
  { text: 'Header 2', val: 'h2' },
  { text: 'Header 3', val: 'h3' },
];

const Headers = ({ editor, state: { format, selection }, ...props }) => {
  const getValue = () => Object(OPTIONS[format.header - 1]).val;
  const onChange = val => {
    const newVal = val === getValue() ? false : val;

    editor.removeFormat(selection);
    editor.formatLine(selection, 'header', newVal);
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
