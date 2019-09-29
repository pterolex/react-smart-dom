import React, { Fragment, useState } from 'react';
import ReactSmartDOM from '../src/renderer/render';
import RGBLamp from '../src/components/RGBLamp';
import SingleButton from '../src/components/SingleButton';

import config from '../etc/config';

const { gateway: gatewayConfig, yeelight, yeelight2 } = config;


function BedroomApp() {
    const [ color, setColor ] = useState('red');

    function handleClick() {
        const newColor = color === 'red' ? 'blue' : 'red';

        setColor(newColor);
    }

    function handleDoubleClick() {
        setColor('green');
    }

    return (
        <Fragment>
            <SingleButton
                address={gatewayConfig.address}
                token={gatewayConfig.token}
                onDoubleClick={handleDoubleClick}
                onClick={handleClick}
            />
            <RGBLamp
                address={yeelight.address}
                token={yeelight.token}
                color={color}
            />
            <RGBLamp
                address={yeelight2.address}
                token={yeelight2.token}
                color={color}
            />
        </Fragment>
    );
}


ReactSmartDOM.render(
    <BedroomApp />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />', DiscoApp.name);
    },
);
