interface MainComponentProps {
  children?: React.ReactNode;
  className?: string;
}

const Main = ({ children, className }: MainComponentProps) => {
  return (
    <main className={`flex flex-col justify-around items-center ${className}`}>
      {children}
    </main>
  );
};

export default Main;
