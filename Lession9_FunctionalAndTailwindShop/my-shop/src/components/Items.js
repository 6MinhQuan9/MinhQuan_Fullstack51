import React from 'react';

const Item = (props) => {
    const {category,description, image, price, title} = props.item;

    return (
        <React.Fragment>
            <div className='w-4/12 min-h-400 rounded-2x1 border border-gray-200 m-8'>
                <div className='flex justify-center w-full m-8'>
                    <img className ="w-80 h-80" src={image} alt='Product List Item'/>
                </div>
                <div className='mx-px my-0'>
                    <div className='text-center'>{title}</div>
                    <div className='text-sm text-center'>{category}</div>
                    <div className='max-h-28 overflow-y-scroll max-w-md m-4'>{description}</div>
                    <div className='text-right'>${price}</div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Item;