'use client';

import { appContext } from '@/context/AppProvider';
import Show from '@/interfaces/Show';
import handleLocalStorageRemove from '@/localStorage/handleRemoveLocalStorage';
import show from '@/models/shows';
import removeShowRequest from '@/requests/removeShowRequest';
import Image from 'next/image';
import { useContext, useState } from 'react';

export default function ScheduleMainContent() {
  const today = new Date().toLocaleTimeString('en-us', { weekday: 'long' }).split(' ')[0];
  const { setShowsOnSchedule, showsOnSchedule, isLogged } = useContext(appContext);
  const [selectedDay, setSelectedDay] = useState(today);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleRemoveShow = async (show: Show) => {
    const newShowsList = showsOnSchedule.filter(({ name }) => name !== show.name);
    await removeShowRequest(show);
    setShowsOnSchedule(newShowsList);
    !isLogged && handleLocalStorageRemove(newShowsList);
  };

  const displayShows = (show: Show) => {
    if (!show.schedule.days.includes(selectedDay)) {
      return;
    }

    return (
      <div key={ show.name } className="group flex flex-col items-center p-5 pb-3 w-48 h-[360px] rounded-lg bg-zinc-700/20 hover:bg-zinc-700/40">
        <Image
          src={ show.image.original }
          alt={`${show.name} cover`}
          width={150}
          height={150}
          className="flex min-h-[220px] rounded-md shadow-lg bg-cover shadow-black/70"
        />
        
        <div className="flex flex-col justify-between items-center w-full h-full gap-5 pt-3 text-center">
          <span className="font-semibold italic">{show.name}</span>

          <button
            type="button"
            onClick={ () => handleRemoveShow(show) }
            title="Remove Show"
            className="font-semibold italic w-20 bg-red-600 rounded-lg p-1 hover:scale-105"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-start gap-5 w-full h-full">
      <label htmlFor="days" className="font-semibold">
        <select
          name="days"
          id="days"
          value={ selectedDay }
          onChange={ ({ target }) => setSelectedDay(target.value) }
          className="rounded-sm p-2 outline-none after:p-5 capitalize text-black"
        >
          { days.map((day) => (
            <option key={day} value={day} className="font-bold text-base">
              { day }
            </option>
          )) }
        </select>
      </label>

      <section className="w-full flex flex-col items-center gap-5 p-5 min-[525px]:flex-wrap min-[525px]:flex-row md:gap-10">
        {showsOnSchedule.map((show) => displayShows(show) )}
      </section>
    </main>
  );
};
