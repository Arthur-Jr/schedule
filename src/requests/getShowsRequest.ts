import ResponseData from '@/interfaces/ResponseData';
import ShowOnDb from '@/interfaces/ShowOnDb';
import axios, { AxiosError, AxiosResponse } from 'axios';

export default async function getShowsRequest(): Promise<AxiosResponse<ResponseData>> {
  try {
    const response: AxiosResponse<ResponseData> = await axios.get('/api/show', {
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
