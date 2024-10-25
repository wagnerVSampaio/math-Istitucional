declare module 'react-input-mask' {
  import * as React from 'react';

  interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string | Array<string | RegExp>;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode; 
  }

  export default class InputMask extends React.Component<InputMaskProps> {}
}
