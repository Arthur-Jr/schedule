'use client';

import constants from '@/constants/constants';
import { appContext } from '@/context/AppProvider';
import { useContext, useState } from 'react';
import LoginForm from './LoginForm';

export default function UserNavBar() {
  const [isLogging, setIsLogging] = useState(false);
  const { isLogged, setIsLogged, setShowsOnSchedule } = useContext(appContext);

  const handleRegister = () => {
    const page = process.env.REGISTER_PAGE_URL || '';
    window.open(page , 'register', 'toolbar=0,status=0,width=800,height=800');
  };

  const handleLogout = async () => {
    localStorage.removeItem(constants.userTokenStorageKey);
    const shows = localStorage.getItem(constants.showScheduleStorageKey);
    shows ? setShowsOnSchedule(JSON.parse(shows)) : setShowsOnSchedule([]);
    setIsLogged(false);
  }

  return (
    <>
      <nav className="absolute right-1 w-20 h-full">
        <div className="h-full flex flex-col justify-center items-start gap-2">
          { !isLogged && 
            <button
              type="button"
              onClick={ () => setIsLogging(!isLogging) }
              className="italic hover:underline underline-offset-2"
            >
              { isLogging ? 'Cancel' : 'Login' }
            </button>
          }

          { isLogged &&
            <button
              type="button"
              onClick={ () => handleLogout() }
              className="italic hover:underline underline-offset-2"
              title='If server is down it will take 3-4 minutes to logout!'
            >
              Logout
            </button>
          }

          <button
            type="button"
            onClick={ () => handleRegister() }
            className="italic hover:underline underline-offset-2"
          >
            { isLogged ? 'Account' : 'Register' }
          </button>
        </div>
      </nav>
  
      { isLogging && <LoginForm setIsLogging={ setIsLogging } /> }
    </>
  );
}
