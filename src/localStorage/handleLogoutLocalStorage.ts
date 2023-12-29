import constants from '@/constants/constants';
import Show from '@/interfaces/Show';
import { Dispatch, SetStateAction } from 'react';

export default function handleLogoutLocalStorage(setShowsOnSchedule: Dispatch<SetStateAction<[] | Show[]>>,) {
  localStorage.removeItem(constants.userTokenStorageKey);
  const shows = localStorage.getItem(constants.showScheduleStorageKey);
  shows ? setShowsOnSchedule(JSON.parse(shows)) : setShowsOnSchedule([]);
};
