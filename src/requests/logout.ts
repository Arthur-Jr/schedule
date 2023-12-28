import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

const LOGOUT_BACKEND_URL = process.env.LOGIN_BACKEND_URL || 'http://localhost:8080';


export default async function logout(): Promise<AxiosResponse> {
  try {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 60000,
    });

    const response = await axios.post(`${LOGOUT_BACKEND_URL}/user/logout`, {}, {
      withCredentials: true,
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });

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
