import { h } from 'preact';

import Popup from 'components/UI/Popup';
import Button from 'components/UI/Button';
import Menu, { MenuItem } from 'components/UI/Menu';

const Select = ({
  placeholder = 'Select item',
  options,
  value,
  onChange,
  disabled,
  popupProps,
  menuProps = {},
  menuItemProps = {},
  ...props
}) => {
  const propsPopup = {
    closeOnClick: true,
    ...popupProps,
    ...props,
    disabled,
  };
  const renderText = () => {
    if (value === undefined) {
      return placeholder;
    }

    return options.find(({ val }) => val === value).text;
  }

  return (
    <Popup horizontal="left" {...propsPopup}>
      <Button disabled={disabled}>
        {renderText()}
      </Button>
      <Menu {...menuProps}>
        {options.map(item => (
          <MenuItem
            key={item.val}
            selected={item.val === value}
            onClick={() => onChange(item.val)}
            {...menuItemProps}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Popup>
  );
}

export default Select;
