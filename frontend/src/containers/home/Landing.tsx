import Header from '@/components/Header';
import Login from '@/app/login/page';
import Image from 'next/image';
import Logo from '/public/images/logo.png'
const Landing = () => {
  return (
    <div>
      <main className="flex flex-col items-center gap-[50px] flex-1 self-stretch py-[60px] px-[5px]">
        <span className="text-center text-white text-[24px] landing">
          어느날 디바가 내 폰안으로 들어왔다
        </span>
        <Image src={Logo} width={350} height={350} alt="디바" />
        <Login />
      </main>
    </div>
  );
};

export default Landing;
