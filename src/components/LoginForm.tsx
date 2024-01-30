'use client';

import constants from '@/constants/constants';
import { appContext } from '@/context/AppProvider';
import getShowsRequest from '@/requests/getShowsRequest';
import login from '@/requests/login';
import { HttpStatusCode } from 'axios';
import Image from 'next/image';
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react';
import loadingGif from '../../public/loading.gif';

interface props {
  setIsLogging: Dispatch<SetStateAction<boolean>>,
}

export default function LoginForm({ setIsLogging }: props) {
  const [userData, setUserData] = useState({ usernameEmail: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogged, setShowsOnSchedule, setUsername } = useContext(appContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMsg('');
    const response = await login(userData);

    if (response && response.status === HttpStatusCode.Ok) {
      localStorage.setItem(constants.userTokenStorageKey, response.data.token);
      const { data } = await getShowsRequest(response.data.token);
      data.status === HttpStatusCode.Ok && setShowsOnSchedule(data.data?.shows || []);
      data.status === HttpStatusCode.Ok && setUsername(data.data?.username || '');

      setUserData({ usernameEmail: '', password: '' });
      setResponseMsg('');
      setIsLogging(false);
      setIsLogged(true);
    } else {
      response ? setResponseMsg(response.data.message || '') : setResponseMsg('Something went wrong!');
      setIsLoading(false);
    }
  };

  return (
    <form
      className="absolute right-0 top-20 z-50 flex flex-col w-56 h-52 p-5 gap-4 bg-black border-zinc-800 border-b-[1px] border-l-[1px]"
      onSubmit={ (e) => handleSubmit(e) }
    >
      <label htmlFor="usernameEmail">
        <input
          type="text"
          id="usernameEmail"
          placeholder="username/email"
          value={ userData.usernameEmail }
          onChange={ ({ target }) =>  setUserData({ ...userData, usernameEmail: target.value }) }
          required
          className="w-full p-1 rounded-md outline-none bg-zinc-100 text-black italic font-medium"
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          id="password"
          placeholder="password"
          value={ userData.password }
          onChange={ ({ target }) =>  setUserData({ ...userData, password: target.value }) }
          required
          className="w-full p-1 rounded-md outline-none bg-zinc-100 text-black italic font-medium"
        />
      </label>

      <button title="Login" type="submit" className="p-1 rounded-md bg-zinc-100 text-black italic font-semibold hover:scale-105">
        Login
      </button>

      { isLoading && <Image src={ loadingGif } alt="Loading..." className="w-20 h-20 self-center mt-2" />  }

      { responseMsg.length > 0 && <span className="text-xs text-center font-semibold italic text-red-600">{responseMsg}</span> }
    </form>
  )
};
