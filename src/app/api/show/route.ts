import Show from '@/interfaces/Show';
import { addShow, getShows, removeShow } from '@/services/show.service';
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
  
    return NextResponse.json({ status: 200, message: 'OK!', data });
  } catch(err) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error!' });
  }
};

export async function POST(req: NextRequest): Promise<NextResponse<ResponseData>> {
  try {
    const body: Show = await req.json();
    const username = req.headers.get('username');
    await addShow(username as string, body);
  
    return NextResponse.json({ status: 201, message: 'Show Added!' });
  } catch(err) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error!' });
  }
};

export async function PUT(req: NextRequest): Promise<NextResponse<ResponseData>> {
  try {
    const body: Show = await req.json();
    const username = req.headers.get('username');
    await removeShow(username as string, body);
  
    return NextResponse.json({ status: 200, message: 'Show Removed!' });
  } catch(err) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error!' });
  }
};
