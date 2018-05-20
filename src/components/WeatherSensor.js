import React from 'react';

class WeatherSensor extends React.Component {
    handleStateChange = ({ key, value }) => {
        console.log('WeatherSensor/action', key, value);
        const {
            onHumidityChange,
            onTemperatureChange,
        } = this.props;

        if (key === 'relativeHumidity' && onHumidityChange) {
            onHumidityChange(value);
        }

        if (key === 'temperature' && onTemperatureChange) {
            onTemperatureChange(value);
        }
    }

    render() {
        const { address, token } = this.props;
        console.log('this.props', this.props);

        return (
            <device
                address={address}
                type="temperature"
                token={token}
                onStateChange={this.handleStateChange}
            />
        );
    }
}

export default WeatherSensor;
