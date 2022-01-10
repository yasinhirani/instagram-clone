import React from 'react';

const Posts = ({username, caption, imageUrl, profileUrl}) => {
    return(
        <div className='bg-white py-5 w-full md:w-1/2 lg:w-1/2 xl:w-1/3 my-5 mx-auto rounded-md'>
            <header className='flex items-center px-5 border-b border-gray-200 pb-4'>
                <figure className='w-8 rounded-full overflow-hidden'>
                    <img src={profileUrl} alt="" />
                </figure>
                <p className='font-semibold pl-5 text-lg'>{username}</p>
            </header>
            <section className='pt-4'>
            <figure className='w-full'>
                    <img className='w-full h-auto' src={imageUrl} alt="" />
                </figure>
            </section>
            <section className='flex pt-4 px-5 border-t border-gray-200'>
                <p className='font-semibold text-base md:text-lg whitespace-nowrap'>{username}</p>
                <p className='pl-2 text-sm md:text-base'>{caption}</p>
            </section>
        </div>
    );
}
export default Posts;