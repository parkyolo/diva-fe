import Header from '@/components/Header';
import Login from '@/app/login/page';
import Image from 'next/image';
import Logo from '@/../public/images/logo.png'
const Landing = () => {
  return (
    <div>
      <Header />
      <main className="border-2 border-black flex-col items-center gap-[50px] self-stretch">
        <span className="text-center text-white text-[24px]">
          어느날 디바가 내 폰안으로 들어왓다
        </span>
        <Image src={Logo} width={300} height={348} alt="디바" />
        <Login />
      </main>
    </div>
  );
};

export default Landing;


// .b {
//   border: black solid 1px;
//   display: flex;
//   padding: 80px 51px;
//   flex-direction: column;
//   align-items: center;
//   gap: 50px;
//   flex: 1 0 0;
//   align-self: stretch;
// }
