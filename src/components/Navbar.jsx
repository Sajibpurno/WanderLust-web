'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { authClient } from '../lib/auth-client';
import { Avatar, Button } from '@heroui/react';

const Navbar = () => {
    const { 
        data: session,
    } = authClient.useSession() 

    const userData = session?.user;
    console.log(userData);
    
    return (
        <div className="bg-white py-5 sticky z-50 top-0">
        <nav className='flex items-center justify-between container mx-auto '>
            <ul className='flex gap-3'>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/destination'}>Destination</Link>
                </li>
                <li>
                    <Link href={'/my-bookings'}>My Bookings</Link>
                </li>
                <li>
                    <Link href={'/add-destination'}>Add Destination</Link>
                </li>
            </ul>
            {/*lo  */}
            <div className="">
                <Image src={'/assets/Wanderlast.png'} height={150} width={150} alt='logo' />    
            </div>
            <ul className='flex items-center gap-3'>
                <li>
                    <Link href={'/profile'}>Profile</Link>
                </li>
                
                {userData ? (
                    <div className="flex gap-2">
                        <li className='flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A1A1A]/[0.04] ring-1 ring-[#1A1A1A]/10'>
                            <Avatar>
        <Avatar.Image alt={userData.name} src={userData?.image} />
        <Avatar.Fallback>{userData.name.charAt(0)}</Avatar.Fallback>
      </Avatar>
      <p className="text-sm font-bold text-[#1A1A1A]/80">
                                    Welcome, <span className="text-[#1A1A1A]">{userData.name}</span>
                                    </p>
                        </li>
                        <li>
                    <Button
                                type="button"
                                onClick={async () => {
                                    await authClient.signOut();
                                }}
                                className="w-full py-3.5 text-center font-semibold text-[#FAF9F6] rounded-full bg-cyan-400 ring-1 ring-[#1A1A1A]/12 hover:bg-cyan-500 transition-colors"
                            >
                                Logout
                            </Button>
                </li>
                    </div>
                ) : (
                    <div className="flex gap-2">

                <li>
                    <Link href={'/login'}>Login</Link>
                </li>
                <li>
                    <Link href={'/signup'}>Sign up</Link>
                </li>
                    </div>
                )}

            </ul>
        </nav>

        </div>
    );
};

export default Navbar;