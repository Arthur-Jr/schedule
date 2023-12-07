import Serie from '@/interfaces/Serie';
import axios from 'axios';

const URL = process.env.SERIES_API_URL || 'http://localhost:8080';

export default async function searchSeries(query: string): Promise<Serie[] | []> {
  try {
    const response = await axios.get<Serie[]>(`${URL}?q=${query}`);
    return response.data.filter(({ show }) => show.status === 'Running');
  } catch(err) {
    return [];
  }
};
