import Image from 'next/image';
import Link from 'next/link';
import LogoSrc from '/public/svgs/logo.svg';

const Logo = () => {
  return (
    <Link href="/">
      <Image src={LogoSrc} alt={'logo'}></Image>
    </Link>
  );
};

export default Logo;
