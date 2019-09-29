import React, { Component, Fragment } from 'react';
import ReactMagic from '../src/renderer/render';

import config from '../erc/config';

const { yeelight: lampConfig } = config;

function SimpleApp() {
    const color = 'blue';
    const brightness = 30;

    return (
        <device
            address={lampConfig.address}
            token={lampConfig.token}
            color={color}
            brightness={brightness}
            power
        />
    );
}

ReactMagic.render(
    <SimpleApp />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />');
    },
);
