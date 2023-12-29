'use client';

import constants from '@/constants/constants';
import { appContext } from '@/context/AppProvider';
import Serie from '@/interfaces/Serie';
import handleLocalStorageSave from '@/localStorage/handleSaveLocalStorage';
import addNewShow from '@/requests/addNewShow';
import searchSeries from '@/requests/search';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import noImg from '../../public/no-img.png';

export default function SearchBar() {
  const [textValue, setTextValue] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [serieList, setSerieList] = useState<Serie[]>([]);
  const { showsOnSchedule, setShowsOnSchedule } = useContext(appContext);

  const handleBackSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && serieList.length > 0) {
      setSerieList([]);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const seriesArray = await searchSeries(textValue.toLowerCase());
    
    if (seriesArray.length === 0) {
      setResponseMsg('There is no ongoing series with this name!');
    } else {
      setSerieList(seriesArray);
      setResponseMsg('');
    }
  }

  const handleAddSerie = async ({ show }: Serie) => {
    if (!showsOnSchedule.find(({ name }) => show.name === name)) {
      const token = localStorage.getItem(constants.userTokenStorageKey);
      token ? await addNewShow(show, token) : handleLocalStorageSave(showsOnSchedule, show);
      setShowsOnSchedule([...showsOnSchedule, show]);
      setTextValue('');
    } else {
      setResponseMsg('Show already on schedule');
    }

    setSerieList([]);
  }

  const handleSearchList = ({ show } : Serie) => {
    return (
      <div className="flex items-center p-2 gap-3 text-black hover:bg-zinc-200" key={show.name}>
        <Image 
          src={ show.image && show.image.medium ? show.image.medium : noImg }
          alt={`${show.name} banner`}
          width={50}
          height={50} 
        />
        
        <span className="text-sm sm:text-lg font-semibold italic">{show.name}</span>

        <button type="button" onClick={ () => handleAddSerie({ show }) } className="ml-auto rounded-full bg-zinc-950 hover:scale-110 sm:mr-5">
          <Plus size={40} className="text-green-600" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={ (e) => handleSubmit(e) } className="flex flex-col items-center w-full gap-3 h-36">
      <span className="text-lg italic">Press Enter to Search!</span>

      <label className="w-full md:w-[80%] lg:w-[60%] relative" htmlFor="search-bar">
        <input 
          id="search-bar"
          type="text" 
          name="search-bar"
          placeholder="Find Your Favorite Ongoing Shows"
          value={ textValue }
          onChange={ ({ target }) => setTextValue(target.value) }
          onKeyDown={ (e) => handleBackSpace(e) }
          autoComplete="off"
          className="w-full p-3 outline-none bg-zinc-100 text-black italic"
        />

        <div className="w-full absolute z-10 max-h-64 bg-zinc-100 border-2 border-t-zinc-300 overflow-y-auto">
          { serieList.map((serie) => handleSearchList(serie)) }
        </div>
      </label>

      { responseMsg && <span className="text-base italic text-center">{responseMsg}</span> }
    </form>
  );
};
