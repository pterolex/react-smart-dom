import React from 'react';

class PowerSocket extends React.Component {
    handleStateChange = (data) => {
        const {
            onStateChange,
        } = this.props;

        if (onStateChange) {
            onStateChange(data);
        }
    }

    render() {
        const { address, token, isOn } = this.props;
        console.log('this.props', this.props);

        return (
            <device
                address={address}
                type="power-load"
                power={isOn}
                token={token}
                onStateChange={this.handleStateChange}
            />
        );
    }
}

export default PowerSocket;
