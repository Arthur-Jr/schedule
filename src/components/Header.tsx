import { Kaushan_Script } from 'next/font/google';
import UserNavBar from './UserNavBar';

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

export default function Header() {
  return (
    <header className="flex items-center w-full h-20 py-5 justify-center relative border-b-zinc-800 border-b-[1px]">
      <h1 className={`${kaushan.className} text-4xl italic cursor-default self`}>Schedule</h1>

      <UserNavBar />
    </header>
  );
};
