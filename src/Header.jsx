import React from 'react';
import Logo from './assets/instagram-logo.png';

const Header = ({signin, photoUrl, name}) => {
    return(
        <div className='bg-white px-5 py-2 flex justify-between'>
            <figure className='w-32'>
                <img className='max-w-full' src={Logo} alt="" />
            </figure>
            {
                name ? <div className='flex items-center'><figure className='w-10 rounded-full overflow-hidden'>
                    <img className='max-w-full' src={photoUrl} alt="" />
                </figure>
                <p className='pl-4'>{name}</p>
            </div> : <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={signin}>Sign in with google</button>
            }
        </div>
    );
}
export default Header;