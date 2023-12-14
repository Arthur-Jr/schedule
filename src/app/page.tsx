import { ScheduleMainContent, SearchBar } from '@/components';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen gap-5 p-10 bg-zinc-900/50">
      <SearchBar />
      <ScheduleMainContent />
    </main>
  );
};
