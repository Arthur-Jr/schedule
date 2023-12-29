import UserLogin from '@/interfaces/UserLogin';
import axios, { AxiosError, AxiosResponse } from 'axios';

const BACKEND_URL = process.env.LOGIN_BACKEND_URL || 'http://localhost:8080';

function checkLoginOption(userData: UserLogin) {
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  if (EMAIL_REGEX.test(userData.usernameEmail)) {
    return { email: userData.usernameEmail, password: userData.password };
  } else {
    return { username: userData.usernameEmail, password: userData.password };
  }
}

export default async function login(userData: UserLogin): Promise<AxiosResponse<{ token: string, message?: string }>> {
  try {
    const userLogin = checkLoginOption(userData);

    const response: AxiosResponse<{ token: string }> = await axios.post(`${BACKEND_URL}/user/login-token`, userLogin, {
      withCredentials: true,
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });
    console.log(response);

    return response;
  } catch(err: unknown) {
    if (err instanceof AxiosError) {
      if (err.code === 'ECONNABORTED') {
        return { data: { message: 'Server is offline, it take atleast 3 minutes to start server!' }, status: 500 } as AxiosResponse;
      }

      return err.response as AxiosResponse;
    }
    
    return { data: { message: 'Internal Server Error' }, status: 500 } as AxiosResponse;
  }
}
