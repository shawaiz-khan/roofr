import React from 'react';
import RatingBlockProps from '@/types/ratingBlock';

const RatingBlock: React.FC<RatingBlockProps> = (props) => {
    const { count, text } = props;

    return (
        <div className='bg-black-secondary border border-black-tertiary px-3 py-5 md:px-7 flex flex-col justify-center items-center rounded-md gap-1 hover:-translate-y-2 duration-300 ease-in cursor-pointer'>
            <h1 className='font-semibold text-2xl'>{count}+</h1>
            <span className='text-gray-quaternary text-xs text-center'>{text}</span>
        </div>
    )
}

export default RatingBlock;