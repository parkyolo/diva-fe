import { MainLogo } from '../../../public/svgs/index';
import Main from '@/components/Main';
import KaKaoLoginButton from './KakaoLoginButton';

const Landing = () => {
  return (
    <Main className="py-[4rem]">
      <div>
        <div className="w-full h-10 z-10 bg-gradient-to-b from-bg-black via-bg-black to-transparent relative"></div>
        <div className="text-center text-xl animate-movebottom">
          <span>어느 날 내 폰 안으로 디바가 들어왔다</span>
        </div>
      </div>
      <div>
        <MainLogo className="w-full h-auto" />
      </div>
      <KaKaoLoginButton />
    </Main>
  );
};

export default Landing;
