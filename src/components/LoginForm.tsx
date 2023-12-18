'use client';

import constants from '@/constants/constants';
import login from '@/requests/login';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

interface props {
  setIsLogging: Dispatch<SetStateAction<boolean>>,
}

export default function LoginForm({ setIsLogging }: props) {
  const [userData, setUserData] = useState({ usernameEmail: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(userData);

    if (response.token) {
      localStorage.setItem(constants.userTokenStorageKey, response.token);
      setUserData({ usernameEmail: '', password: '' });
      setResponseMsg('');
      setIsLogging(false);
    } else {
      setResponseMsg(response.message || '');
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

      { responseMsg.length > 0 && <span className="text-xs text-center font-semibold italic text-red-600">{responseMsg}</span> }
    </form>
  )
};
