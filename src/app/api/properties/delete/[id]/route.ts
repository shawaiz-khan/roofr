import connectDB from '@/lib/db';
import { Delete_Property } from '@/controllers/property.controller';

connectDB();

export async function POST(req: Request, { params }: { params: { id: string | number } }) {
    const id = await params?.id;
    return await Delete_Property(id);
}