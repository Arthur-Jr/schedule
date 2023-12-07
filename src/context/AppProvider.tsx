'use client';

import Show from '@/interfaces/Show';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface Context {
  showsOnSchedule: [] | Show[],
  setShowsOnSchedule: Dispatch<SetStateAction<[] | Show[]>>,
}

export const appContext = createContext<Context>({} as Context);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [showsOnSchedule, setShowsOnSchedule] = useState<Show[] | []>([]);

  return (
    <appContext.Provider value={{ showsOnSchedule, setShowsOnSchedule }}>
      {children}
    </appContext.Provider>
  );
}

export default AppProvider;
