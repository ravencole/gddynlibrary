import React from 'react'
import ServerConfig from '../../.././config/config.server';

const LoadImage = (props) => {
    const { hostname, port } = ServerConfig.local,
          { cover } = props;

    if (cover) {
        const img = `${hostname}${port}/images/${cover}`;
        return <img src={img} height="50px"/>;
    }
    return <div></div>;
}

export default LoadImage;