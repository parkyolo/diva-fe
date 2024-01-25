import Login from '@/app/login/page';
import MainLogo from '/public/svgs/main_logo.svg';
import LoginButton from '@/components/login/LoginButton';

const Landing = () => {
  return (
    <main className="flex flex-col justify-around items-center">
      <span className="text-center text-white text-2xl">
        어느 날 디바가 내 폰 안으로 들어왔다
      </span>
      <MainLogo />
      {/* <Login /> */}
      <LoginButton />
    </main>
  );
};

export default Landing;
