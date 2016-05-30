import React from 'react';
import ServerConfig from '../../.././config/config.server';

const BookCover = (props) => {
    const { cover } = props,
          { hostname, port } = ServerConfig.local;

    if (cover) {
        return <img height="400px" src={`${hostname}${port}/images/${cover}`} />;
    }

    return <div className="image--standin"></div>;
}

export default BookCover;