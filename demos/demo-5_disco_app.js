import React, { Fragment, useState, useEffect } from 'react';
import ReactMagic from '../src/renderer/render';
import RGBLamp from '../src/components/RGBLamp';

import config from '../etc/config';

const { yeelight, yeelight2 } = config;

function SimpleApp() {
    const brightness = 30;
    const isOn = true;

    const [ color, setColor ] = useState('red');

    useEffect(() => {
        const interval = setInterval(() => {
            setColor((prevColor) =>  prevColor === 'red' ? 'blue' : 'red');
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <Fragment>
            <RGBLamp
                address={yeelight.address}
                token={yeelight.token}
                color={color}
                isOn={isOn}
            />
            <RGBLamp
                address={yeelight2.address}
                token={yeelight2.token}
                color={color}
                isOn={isOn}
            />
        </Fragment>
    );
}

ReactMagic.render(
    <SimpleApp />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />');
    },
);
