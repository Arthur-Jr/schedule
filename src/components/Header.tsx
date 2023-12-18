'use client';

import { Kaushan_Script } from 'next/font/google';
import { useState } from 'react';
import LoginForm from './LoginForm';

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

export default function Header() {
  const [isLogging, setIsLogging] = useState(false);

  const handleRegister = () => {
    const page = process.env.REGISTER_PAGE_URL || '';
    window.open(page , 'register', 'toolbar=0,status=0,width=800,height=800');
  };

  return (
    <header className="flex items-center w-full h-20 py-5 justify-center relative border-b-zinc-800 border-b-[1px]">
      <h1 className={`${kaushan.className} text-4xl italic cursor-default self`}>Schedule</h1>

      <div className="absolute right-1 w-20 h-full flex flex-col justify-center items-start gap-2">
        <button
          type="button"
          onClick={ () => setIsLogging(!isLogging) }
          className="italic hover:underline underline-offset-2"
        >
          { isLogging ? 'Cancel' : 'Login' }
        </button>

        <button
          type="button"
          onClick={ () => handleRegister() }
          className="italic hover:underline underline-offset-2"
        >
          Register
        </button>
      </div>

      { isLogging && <LoginForm setIsLogging={ setIsLogging } /> }
    </header>
  );
};
