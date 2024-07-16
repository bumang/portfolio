import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

import { Loader } from '../Loader';

const buttonVariants = cva(['inline-flex justify-center items-center rounded-[100px]'], {
  variants: {
    // button colors
    variant: {
      primary:
        'bg-primary-blue hover:bg-secondary-blue-hover text-white active:bg-primary-dark-blue disabled:bg-secondary-light-gray min-w-[145px]',
      icon: 'bg-background-white/80  bg-blend-color-dodge shadow-sm hover:shadow-lg max-h-[44px]  max-w-[44px] h-[44px] hover:bg-blend-color-lighten  w-[44px] rounded-full p-s10',
      'icon-small':
        'bg-background-white/80  bg-blend-color-dodge shadow-sm hover:shadow-lg max-h-[32px]  max-w-[32px] h-[32px] hover:bg-blend-color-lighten  w-[32px] rounded-full p-s4',

      unstyled: 'hover:bg-transparent rounded-none',
      'outline-white':
        'px-[32px] min-w-[113px] border-2 border-solid border-white hover:bg-white hover:bg-opacity-20 text-white active:bg-white active:border-2 active:border-solid active:border-primary-dark-blue active:text-primary-dark-blue',
      'outline-black':
        'px-[32px] min-w-[113px] border-2 border-solid border-primary-dark-blue text-primary-dark-blue hover:bg-secondary-light-gray hover:bg-opacity-30 active:bg-gradients-grey disabled:bg-white disabled:border-secondary-light-gray disabled:text-secondary-light-gray',
      'outline-grey':
        'px-[32px] min-w-[113px] border-2 border-solid border-secondary-light-gray text-primary-dark-gray hover:bg-secondary-light-gray hover:bg-opacity-30 active:bg-secondary-light-gray disabled:bg-white disabled:border-secondary-light-gray disabled:text-secondary-light-gray',
      'outline-blue':
        'px-[32px] fill-primary-blue stroke-primary-blue gap-[8px] min-w-[113px] border-2 border-solid border-primary-blue text-primary-blue hover:bg-secondary-light-blue hover:border-secondary-blue-hover hover:text-secondary-blue-hover hover:stroke-secondary-blue-hover active:bg-secondary-blue active:text-primary-blue active:stroke-primary-blue disabled:bg-white disabled:border-secondary-light-gray disabled:text-secondary-light-gray disabled:stroke-secondary-light-gray',
      'filled-grey':
        'px-[32px] min-w-[113px] gap-[12px] stroke-primary-dark-blue bg-primary-dark-blue bg-opacity-7 text-primary-dark-blue hover:bg-secondary-light-gray active:bg-primary-dark-blue active:text-white active:stroke-white active:fill-white disabled:bg-primary-dark-blue disabled:bg-opacity-7 disabled:text-primary-light-gray disabled:stroke-primary-light-gray disabled:fill-primary-light-gray',
      'filled-white':
        'px-[24px] py-[4px] md:py-0 lg:py-0 sm:py-s4 min-w-[113px] hover:shadow-lg bg-white text-black text-center  font-semibold  hover:bg-secondary-light-gray hover:bg-opacity-30 active:bg-secondary-light-gray',
      'filled-white-shadow':
        'px-[24px]  min-w-[113px] bg-white shadow-7 text-primary-blue hover:shadow-2 hover:text-secondary-blue-hover active:border active:border-solid active:secondary-light-gray',
      'filled-blue':
        'px-[24px] min-w-[91px] bg-white text-primary-blue hover:bg-secondary-light-blue active:bg-secondary-blue disabled:text-primary-light-gray disabled:bg-white',
      'additional-blue':
        'gap-[8px] text-primary-blue min-w-[42px] hover:text-secondary-blue-hover active:text-primary-dark-blue disabled:text-primary-light-gray',
    },
    size: {
      16: 'h-[16px] text-[14px] leading-normal',
      32: 'h-[32px] text-[14px] font-semibold leading-normal',
      40: 'h-[40px] text-[16px] leading-[19.2px]',
      48: 'h-[48px] text-[16px] leading-[19.2px]',
      52: 'h-[32px] w-full h-full md:h-[52px] lg:max-h-[52px] text-[16px] leading-[24px]',
      62: 'h-[62px] w-full h-full md:h-[62px] lg:max-h-[62px] text-[16px] leading-[24px]',
    },
  },
});

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isDisabled?: boolean;
  leadingIcon?: ReactNode;
  trailIcon?: ReactNode;
  isloading?: boolean;
  showLoadingText?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      size = 52,
      variant = 'primary',
      isDisabled,
      children,
      leadingIcon,
      trailIcon,
      onClick,
      isloading,
      type = 'button',
      showLoadingText,
      ...rest
    },
    ref
  ) => (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(buttonVariants({ className, size, variant }))}
      {...rest} // spread the rest of the props
    >
      {leadingIcon}
      {isloading ? <Loader showLoadingText={showLoadingText} /> : children}
      {trailIcon}
    </button>
  )
);

export default Button;
Button.displayName = 'Button';
