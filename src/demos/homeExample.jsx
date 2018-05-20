import React, { Component, Fragment } from 'react';
import ReactSmartDOM from '../renderer/ReactSmartDOM';
import Socket from '../components/Socket';
import ContactSensor from '../components/ContactSensor';

import config from './config';

const { gateway: gatewayConfig } = config;

class App extends Component {
    state = {
        isOn: false,
    }

    handleDoorOpen = () => {
        this.setState(() => ({
            isOn: true,
        }));
    }

    handleDoorClose = () => {
        this.setState(() => ({
            isOn: false,
        }));
    }

    render() {
        const { isOn } = this.state;

        return (
            <Fragment>
                <ContactSensor
                    address={gatewayConfig.address}
                    token={gatewayConfig.token}
                    onOpen={this.handleDoorOpen}
                    onClose={this.handleDoorClose}
                />
                <Socket
                    address={gatewayConfig.address}
                    token={gatewayConfig.token}
                    isOn={isOn}
                />
            </Fragment>
        );
    }
}

ReactSmartDOM.render(
    <App />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />', App.name);
    },
);
