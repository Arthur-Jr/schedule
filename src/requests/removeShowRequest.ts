import Show from '@/interfaces/Show';
import axios, { AxiosError, AxiosResponse } from 'axios';


export default async function removeShowRequest(show: Show): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`/api/show`, show, {
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
