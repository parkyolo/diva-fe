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
        className="flex w-[260px] p-[26px] justify-center
        items-center rounded-[36px] bg-[#043DAE] shadow-[inset-10px_-10px_52px_0px_rgba(12,53,135,0.81)] 
        shadow-[inset_4px_-4px_22px_0px_rgba(191,191,191,0.20)] 
        shadow-[_4px_4px_23px_0px_rgba(29,67,141,0.80)]"
        onClick={onClick}
      >
        <p className="text-white">{label}</p>
      </button>
    </div>
  );
};

export default ClayButton;
