import React from 'react';
import chalk from 'chalk';

class ContactSensor extends React.Component {
    handleStateChange = ({ key, value }) => {
        const {
            onOpen,
            onClose,
        } = this.props;

        if (key === 'contact' && !value && onOpen) {
            console.log(chalk.white.bgBlue('ContactSensor/action'), key, value);
            onOpen(key, value);
        }

        if (key === 'contact' && value && onClose) {
            console.log(chalk.white.bgBlue('ContactSensor/action'), key, value);
            onClose(key, value);
        }
    }

    render() {
        const { id, address, token } = this.props;

        return (
            <device
                id={id}
                address={address}
                token={token}
                type="contact"
                onStateChange={this.handleStateChange}
            />
        );
    }
}

export default ContactSensor;
