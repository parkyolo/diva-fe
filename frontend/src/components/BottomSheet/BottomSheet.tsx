import { ReactNode } from 'react';
import Button from './Button/Button';

interface Props {
  children: ReactNode;
  close: () => void;
}

const BottomSheet = ({ children, close }: Props) => {
  return (
    <div className="absolute z-50 h-full flex flex-col left-0 right-0 bottom-0">
      <div className="bg-bg-black basis-full opacity-55" onClick={close}></div>
      <article className="animate-slideup bg-gradient-conic flex flex-col gap-[20px] px-[30px] py-[26px] rounded-t-[30px]">
        <div className="w-[50px] h-[6px] bg-gray opacity-10 m-auto"></div>
        <div className="flex flex-col gap-[10px] text-xl">{children}</div>
      </article>
    </div>
  );
};

BottomSheet.Button = Button;

export default BottomSheet;
