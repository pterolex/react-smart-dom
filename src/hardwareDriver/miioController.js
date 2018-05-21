const chalk = require('chalk');
const miio = require('miio');

const COMMAND_MAPPING = {
    brightness: 'setBrightness',
    cct: 'setColor',
    color: 'setColor',
    power: 'setPower',
};

const connections = {};

const getChildZigbeeDevice = async (id, gatewayDevice, type) => {
    const children = gatewayDevice.children();

    for (const child of children) {
        const capabilityString = `cap:${type}`;
        // console.log('child', child);
        if (id && child.id === `miio:${id}`) {
            // console.log(chalk.yellow.underline('getChildZigbeeDevice/by ID'), id, type);
            return child;
        }

        if (child.matches(capabilityString) && !id) {
            // console.log(chalk.yellow.underline('getChildZigbeeDevice/ by capibility'), id, type);
            return child;
        }
    }
};

const createConnection = async ({
    id, address, token, type,
}) => {
    const key = `${address}_${token}_${type}`;
    // console.log('createConnection', id, address, token, type);
    if (connections[key]) {
        // console.log('got it', connections[key]);
        return connections[key];
    }

    const device = await miio.device({
        address,
        token,
    });
    // console.log('createConnection', device);

    const isGateway = device.matches('type:miio:gateway') && type !== 'gateway';

    connections[key] = isGateway
        ? await getChildZigbeeDevice(id, device, type)
        : device;

    return connections[key];
};

const sendRequest = async ({
    id, address, token, param, value, type,
}) => {
    console.log(chalk.blue.underline.bold(`\n${new Date().toLocaleTimeString()} sendRequest `), id, address, type, token, param, value);

    const device = await createConnection({
        id, address, token, type,
    });

    const method = COMMAND_MAPPING[param];

    if (device[method]) {
        try {
            await device[method](value);
        } catch (e) {
            console.error(chalk.red.bold('Request failed!', e));
        }
    } else {
        console.error(chalk.red.underline.bold(`${param} is not a function`));
    }
};

const callbacks = {};

const assignCallback = async (id, address, token, type, propName, callback) => {
    const device = await createConnection({
        id, address, token, type,
    });

    // console.log(chalk.green('AssignCallback/Connected to'), type, device);

    const capabilityString = `cap:${type}`;

    if (device.matches(capabilityString) && !callbacks[capabilityString] && propName === 'onStateChange') {
        callbacks[capabilityString] = true;

        device.on('stateChanged', (change) => {
            console.log('ID', device.id, ': key', change.key, 'changed to', change.value);
            callback(change);
        });
    }

    if (device.matches('type:button') && !callbacks['type:button'] && propName === 'onPress') {
        callbacks['type:button'] = true;
        device.on('action', callback);
    }
};

const restrictedProps = ['id', 'address', 'token', 'type', 'children'];

const updateStatus = (params) => {
    // console.log(chalk.yellow('updateStatus'), params);
    const {
        id, address, token, type,
    } = params;

    Object.keys(params).forEach((propName, i) => {
        const propValue = params[propName];
        const isFunction = typeof propValue === 'function';

        if (!restrictedProps.includes(propName) && !isFunction) {
            const data = {
                id,
                address,
                token,
                type,
                param: propName,
                value: propValue,
            };

            setTimeout(() => sendRequest(data), i * 20);
        }

        if (isFunction) {
            assignCallback(id, address, token, type, propName, propValue);
        }
    });
};

module.exports = {
    updateStatus,
};
