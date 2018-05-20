import React, { Component, Fragment } from 'react';
import ReactSmartDOM from '../renderer/render';
import RGBLamp from '../components/RGBLamp';
import SingleButton from '../components/SingleButton';

import config from './config';

const { gateway: gatewayConfig, yeelight, yeelight2 } = config;

export default class App extends Component {
    state = {
        color: 'yellow',
    }

    handleClick = () => {
        this.setState({
            color: this.state.color === 'red' ? 'blue' : 'red',
        });
    }

    handleDoubleClick = () => {
        this.setState({
            color: 'green',
        });
    }

    render() {
        const { color } = this.state;

        return (
            <Fragment>
                <SingleButton
                    address={gatewayConfig.address}
                    token={gatewayConfig.token}
                    onDoubleClick={this.handleDoubleClick}
                    onClick={this.handleClick}
                />
                <RGBLamp
                    address={yeelight.address}
                    token={yeelight.token}
                    color={color}
                />
                {/* <RGBLamp
                    address={yeelight2.address}
                    token={yeelight2.token}
                    color={color}
                /> */}
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
