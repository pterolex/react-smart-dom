import React from 'react';

class MotionSensor extends React.Component {
    handleStateChange = (data) => {
        console.log('MotionSensor/action', data);
        const {
            onStateChange,
        } = this.props;

        if (onStateChange) {
            onStateChange(data);
        }
    }

    render() {
        const { address, token } = this.props;

        return (
            <device
                address={address}
                type="motion"
                token={token}
                onStateChange={this.handleStateChange}
            />
        );
    }
}

export default MotionSensor;
