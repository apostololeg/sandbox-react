// import Icon from 'components/UI/Icon/Icon';
// import { IconType } from 'components/UI/Icon/Icon.types';
import Button, {
  Props as ButtonProps,
  Variant as ButtonVariant,
} from 'components/UI/Button/Button';

import S from './SubmitButtons.styl';

export type ButtonConfig = ButtonProps & {
  key: string;
  // icon?: IconType;
  // children: React.ReactChild;
};

type Props = {
  className?: string;
  buttons: ButtonConfig[];
};

export type Variant = ButtonVariant;
export const SubmitButtons = ({ buttons, ...props }: Props) => (
  <div className={S.root} {...props}>
    {buttons.map(({ children, ...buttonProps }) => (
      <Button className={S.item} {...buttonProps}>
        {/*icon && <Icon type={icon} size={buttonProps.size} />*/}
        {children}
      </Button>
    ))}
  </div>
);
