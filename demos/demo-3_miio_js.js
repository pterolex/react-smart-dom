const miio = require('miio');

const { yeelight: lampConfig } = require('../etc/config');

const connect = async function connect() {
    const lamp = await miio.device({
        address: lampConfig.address,
        token: lampConfig.token,
    });

    await lamp.setPower(false);
    await lamp.setBrightness(10);
    await lamp.setColor('red');

    await lamp.destroy();
};

connect();

