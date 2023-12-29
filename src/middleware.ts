import { HttpStatusCode } from 'axios';
import * as jwt from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import constants from './constants/constants';

interface jwtCustomPayload extends jwt.JWTVerifyResult<jwt.JWTPayload> {
  payload: {
    data: { username: string },
  }
}

export async function middleware(req: NextRequest): Promise<NextResponse | undefined> {
  try {
    const token = req.headers.get('Authorization');
    const secret = new TextEncoder().encode(process.env.JWT_KEY || '');
    
    if (!token) {
      return NextResponse.json({ status: HttpStatusCode.Unauthorized, message: 'Invalid Token!' });
    }

    const data = await jwt.jwtVerify(token, secret) as jwtCustomPayload;
    const newHeaders = new Headers(req.headers);
    newHeaders.set('username', data.payload.data.username);

    return NextResponse.next({
      request: {
        headers: newHeaders,
      }
    });
  } catch(err) {
    return NextResponse.json({ status: HttpStatusCode.Unauthorized, message: 'Invalid Token!' });
  }
}

export const config = {
  matcher: '/api/:show*',
}
