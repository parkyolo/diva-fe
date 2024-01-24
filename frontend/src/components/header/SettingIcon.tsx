import Image from 'next/image';
import Link from 'next/link';
import SettingIconSrc from '/public/svgs/setting.svg';

const SettingIcon = () => {
  return (
    // 클릭시 세팅 모달 띄우기
    <Link href="/">
      <Image src={SettingIconSrc} alt={'setting'}></Image>
    </Link>
  );
};

export default SettingIcon;
