'use client';

import React from 'react';

interface ClayButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const ClayButton = ({ label, onClick }: ClayButtonProps) => {
  return (
    <div>
      <button
        className="flex w-[260px] h-[78px] p-[26px] justify-center
        items-center rounded-[36px] bg-[#043DAE] shadow-[inset_10px_-10px_52px_0px_rgba(12,53,135,0.81),inset_4px_-4px_22px_0px_rgba(191,191,191,0.20),_4px_4px_23px_0px_rgba(29,67,141,0.80)] 
        font-samlip text-2xl"
        onClick={onClick}
      >
        <span className="text-white">{label}</span>
      </button>
    </div>
  );
};

export default ClayButton;
