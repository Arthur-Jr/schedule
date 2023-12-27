import Show from '@/interfaces/Show';
import { getShows } from '@/services/show.service';
import { NextRequest, NextResponse } from 'next/server';
 
type ResponseData = {
  message: string,
  status: number,
  data?: { username: string, shows: Show[] },
}
 
export async function GET(req: NextRequest): Promise<NextResponse<ResponseData>> {
  try {
    const username = req.headers.get('username');
    const data = await getShows(username as string);
  
    return NextResponse.json({ status: 200, message: 'OK', data });
  } catch(err) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
};
