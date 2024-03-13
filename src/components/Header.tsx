'use client';

interface Props {
  LeftComponent: React.ReactNode;
  RightComponent?: React.ReactNode | null;
}
const Header = ({ LeftComponent, RightComponent }: Props) => {
  return (
    <header className="flex items-center w-100vw h-10 bg-transparent mx-5 my-3.5 justify-between">
      {LeftComponent}
      {!RightComponent ? <></> : RightComponent}
    </header>
  );
};

export default Header;
