import UserLogin from '@/interfaces/UserLogin';
import axios, { AxiosError } from 'axios';

const BACKEND_URL = process.env.LOGIN_BACKEND_URL || 'http://localhost:8080';

function checkLoginOption(userData: UserLogin) {
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  if (EMAIL_REGEX.test(userData.usernameEmail)) {
    return { email: userData.usernameEmail, password: userData.password };
  } else {
    return { username: userData.usernameEmail, password: userData.password };
  }
}

export default async function login(userData: UserLogin): Promise<{ token?: string, message?: string } > {
  try {
    const userLogin = checkLoginOption(userData);

    const response = await axios.post(`${BACKEND_URL}/user/login`, userLogin, {
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });

    console.log(response.data);

    return response.data;
  } catch(err: unknown) {
    if (err instanceof AxiosError) {
      if (err.code === 'ECONNABORTED') {
        return { message: 'Server is offline, it take atleast 3 minutes to start server!' };
      }

      console.log(err.response?.data);
      return err.response?.data;
    }
    
    return { message: 'Internal Server Error' };
  }
}
