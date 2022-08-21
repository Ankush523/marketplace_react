import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Navbar = () => {
    return (
        <div className='flex flex-row w-[100vw] h-[fit-content] p-[20px] justify-between'>
            <label className='font-montserrat text-[50px] text-purple-900 font-light p-2 text-center text-2xl rounded-full' >
                MusicVerse
            </label>
            <ConnectButton/>
        </div>
    );
}
 
export default Navbar;