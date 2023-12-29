'use client';

import constants from '@/constants/constants';
import Show from '@/interfaces/Show';
import getShowsRequest from '@/requests/getShowsRequest';
import { HttpStatusCode } from 'axios';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface Context {
  showsOnSchedule: [] | Show[],
  setShowsOnSchedule: Dispatch<SetStateAction<[] | Show[]>>,
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  username: string,
  setUsername: Dispatch<SetStateAction<string>>,
}

export const appContext = createContext<Context>({} as Context);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [showsOnSchedule, setShowsOnSchedule] = useState<Show[] | []>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getShow = async () => {
      const token = localStorage.getItem(constants.userTokenStorageKey);
      if (!token) {
        const shows = localStorage.getItem(constants.showScheduleStorageKey);
        shows && setShowsOnSchedule(JSON.parse(shows));
        return;
      }

      const { data } = await getShowsRequest(token);
      if (data.status === HttpStatusCode.Ok) {
        setIsLogged(true);
        setShowsOnSchedule(data.data?.shows || []);
        setUsername(data.data?.username || '');
      } else {
        localStorage.removeItem(constants.userTokenStorageKey);
        const shows = localStorage.getItem(constants.showScheduleStorageKey);
        shows && setShowsOnSchedule(JSON.parse(shows));
      }
    };

    getShow();
  }, []);

  return (
    <appContext.Provider value={{ showsOnSchedule, setShowsOnSchedule, isLogged, setIsLogged, username, setUsername }}>
      {children}
    </appContext.Provider>
  );
}

export default AppProvider;
