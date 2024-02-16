const Loader: React.FC = () => {
  return (
    <div className="h-[100px] flex gap-[12px] justify-center items-center">
      <div className="w-[16px] h-[16px] bg-white rounded-[100px] animate-[loading1_1s_infinite_100ms]"></div>
      <div className="w-[16px] h-[16px] bg-white rounded-[100px] animate-[loading2_1s_infinite_100ms]"></div>
      <div className="w-[16px] h-[16px] bg-white rounded-[100px] animate-[loading3_1s_infinite_100ms]"></div>
    </div>
  );
};

export default Loader;
