import MainLogo from '/public/svgs/main_logo.svg';
import Main from '@/components/Main';
import KaKaoLoginButton from './KakaoLoginButton';

const Landing = () => {
  return (
    <Main className="py-[4rem]">
      <p className="text-center text-[1.3rem] font-bold landing">
        어느 날 디바가 내 폰 안으로 들어왔다
      </p>
      <div>
        <MainLogo />
      </div>
      <KaKaoLoginButton />
    </Main>
  );
};

export default Landing;
