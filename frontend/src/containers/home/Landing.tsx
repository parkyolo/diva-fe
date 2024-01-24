import Login from '@/app/login/page';
import MainLogo from '/public/svgs/main_logo.svg';
const Landing = () => {
  return (
    <div
      className="py-10 px-[23px] flex flex-col justify-around h-full"
      style={
        {
          // gap:  '2rem',
        }
      }
    >
      <span className="text-center text-white landing text-2xl">
        어느날 디바가 내 폰안으로 들어왔다
      </span>
      <MainLogo />
      <Login />
    </div>
  );
};

export default Landing;
