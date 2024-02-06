import { MouseEventHandler, ReactNode } from 'react';

type btnColor = 'bg-btn-black' | 'bg-blue';

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnColor: btnColor;
}

const Button = ({ children, onClick, btnColor }: Props) => {
  const btnStyle = `${btnColor} py-[20px] rounded-[15px]`;
  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
