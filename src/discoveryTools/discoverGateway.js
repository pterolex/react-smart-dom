const miio = require('miio');

const { gateway: gatewayConfig } = require('../demos/config');

const logHandler = ({ action }, device) => console.log('Action', action, 'performed on', device);

const connect = async function connect() {
    const gateway = await miio.device({
        address: gatewayConfig.address,
        token: gatewayConfig.token,
    });

    const children = gateway.children();

    for (const child of children) {
        if (child.matches('cap:contact')) {
            console.log('child', child.id);
            child.on('action', logHandler);
        }
    }
};

connect();

