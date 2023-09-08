"use client";
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/lib/cookie';

const logout = () => {
    const router = useRouter();
    // handle logout
    const handleLogout = async() => {
        const config = {method:'DELETE'};
        const deleteCookie=await fetch('api/login',config); 
        // Redirect to the login page after logout
        router.replace('/login');
    };
    return (
        <div>
            <button className='bg-yellow-600 text-white rounded p-3' onClick={handleLogout}>logout</button>
        </div>
    );
};

export default logout;