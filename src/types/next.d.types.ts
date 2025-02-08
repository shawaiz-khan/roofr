/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from 'next';

declare module 'next' {
    interface NextApiRequest {
        user?: any;
    }
}