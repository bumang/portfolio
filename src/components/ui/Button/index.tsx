import { forwardRef } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'outline' | 'solid' | 'ghost' | 'unstyled';

interface ButtonOptions {
  type?: 'button' | 'submit' | 'reset';
  /**
   * Button display variants
   * @default "solid"
   * @type ButtonVariant
   */
  variant?: ButtonVariant;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outline':
      return 'btn-outline';
    case 'ghost':
      return 'btn-ghost';
    case 'unstyled':
      return 'btn-unstyled';
    default:
      return undefined;
  }
};

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { variant = 'solid', className, children, datatype, ...rest } = props;
  const merged = clsx('btn', getVariant(variant), className);

  return (
    <button ref={ref} datatype={datatype} className={merged} type="button" {...rest}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
