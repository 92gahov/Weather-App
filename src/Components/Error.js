import React from 'react';

const Error = ({ errmsg }) => {
    return (
        <div className='error'>
            <p>{errmsg}</p>
        </div>
    )
};

export default Error;