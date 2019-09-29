import React, { Component, Fragment } from 'react';
import ReactMagic from '../src/renderer/render';
import RGBLamp from '../src/components/RGBLamp';
import SingleButton from '../src/components/SingleButton';

import config from '../etc/config';

const { yeelight, yeelight2, gateway: gatewayConfig } = config;

const colorsList = [
    'aquamarine',
    'ivory',
    'coral',
    'lime',
    'navy',
];

class DiscoApp extends Component {
    state = {
        color: 'aquamarine',
        isOn: true
    }

    componentDidMount() {
        this.handleClick();
    }

    setLampColor = () => {
        const colorNumber = Math.floor((Math.random() * 10)) % colorsList.length;

        this.setState(() => ({
            color: colorsList[colorNumber],
        }));
    }

    handleClick = () => {
        this.interval = setInterval(this.setLampColor, 500);
    }

    handleDoubleClick = () => {
        clearInterval(this.interval);
    }
    
    render() {
        const { color, isOn } = this.state;

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
}

ReactMagic.render(
    <DiscoApp />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />', DiscoApp.name);
    },
);
