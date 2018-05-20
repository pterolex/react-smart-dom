import React, { Component, Fragment } from 'react';
import ReactSmartDOM from '../renderer/render';
import RGBLamp from '../components/RGBLamp';

import config from './config';

const { yeelight, yeelight2 } = config;

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
    }

    componentDidMount() {
        setInterval(this.setLampColor, 500);
    }

    setLampColor = () => {
        const colorNumber = Math.floor((Math.random() * 10)) % colorsList.length;

        this.setState(() => ({
            color: colorsList[colorNumber],
        }));
    }

    render() {
        const { color } = this.state;

        return (
            <Fragment>
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
}

ReactSmartDOM.render(
    <DiscoApp />,
    'CONTAINER',
    () => {
        console.log('Rendered <%s />', DiscoApp.name);
    },
);
