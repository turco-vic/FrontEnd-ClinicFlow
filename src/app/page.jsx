import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
    const user = await currentUser();
    
    if (user) {
        redirect('/home');
    } else {
        redirect('/login');
    }
}