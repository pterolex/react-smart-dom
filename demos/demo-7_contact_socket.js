import React, { Fragment, useState } from 'react';
import ReactSmartDOM from '../src/renderer/render';
import ContactSensor from '../src/components/ContactSensor';
import Socket from '../src/components/Socket';

import config from '../etc/config';

const { gateway: gatewayConfig } = config;


function KitchenApp() {
    const [ isSocketOn, setIsSocketOn ] = useState(false);

    function handleOpen() {
        setIsSocketOn(true);
    }
    
    function handleClose() {
        setIsSocketOn(false);
    }

    return (
        <Fragment>
            <ContactSensor
                address={gatewayConfig.address}
                token={gatewayConfig.token}
                onOpen={handleOpen}
                onClose={handleClose}
            />
            <Socket
                address={gatewayConfig.address}
                token={gatewayConfig.token}
                isOn={isSocketOn}
            />
        </Fragment>
    );
}
ReactSmartDOM.render(
    <KitchenApp />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />', DiscoApp.name);
    },
);
