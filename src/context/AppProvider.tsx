'use client';

import constants from '@/constants/constants';
import Show from '@/interfaces/Show';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface Context {
  showsOnSchedule: [] | Show[],
  setShowsOnSchedule: Dispatch<SetStateAction<[] | Show[]>>,
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
}

export const appContext = createContext<Context>({} as Context);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [showsOnSchedule, setShowsOnSchedule] = useState<Show[] | []>([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem(constants.userTokenStorageKey);
    if (userToken) {
      setIsLogged(true);
    }

    const shows = localStorage.getItem(constants.showScheduleStorageKey);
    if (shows) {
      setShowsOnSchedule(JSON.parse(shows));
    }
  }, []);

  return (
    <appContext.Provider value={{ showsOnSchedule, setShowsOnSchedule, isLogged, setIsLogged }}>
      {children}
    </appContext.Provider>
  );
}

export default AppProvider;
