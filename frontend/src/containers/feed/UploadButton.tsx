import Link from 'next/link';

const UploadButton = () => {
  return (
    <Link href="/mypage">
      <button className="absolute z-30 left-[50%] translate-x-[-50%] bottom-[6.5rem] px-5 rounded-[2rem] text-5xl font-bold bg-blue shadow-[inset_10px_-10px_52px_0px_rgba(12,53,135,0.81),inset_4px_-4px_22px_0px_rgba(191,191,191,0.20),_4px_4px_23px_0px_rgba(29,67,141,0.80)]">
        +
      </button>
    </Link>
  );
};

export default UploadButton;
