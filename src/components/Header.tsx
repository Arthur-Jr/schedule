'use client';

import { Kaushan_Script } from 'next/font/google';

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

export default function Header() {
  const handleAccClick = () => {
    window.open('' , 'login', 'toolbar=0,status=0,width=800,height=800');
  };

  return (
    <header className="flex items-center w-full h-20 py-5 justify-center">
      <h1 className={`${kaushan.className} text-4xl italic cursor-default self`}>Schedule</h1>
    </header>
  );
};
