import React from 'react';

class SingleButton extends React.Component {
    handlePress = ({ action }) => {
        // console.log('SingleButton/action', action);
        const {
            onLongClickPress,
            onLongClickRelease,
            onDoubleClick,
            onClick,
        } = this.props;

        if (action === 'long_click_press' && onLongClickPress) {
            onLongClickPress();
        }

        if (action === 'long_click_release' && onLongClickRelease) {
            onLongClickRelease();
        }

        if (action === 'double_click' && onDoubleClick) {
            onDoubleClick();
        }

        if (action === 'click' && onClick) {
            onClick();
        }
    }

    render() {
        const { address, token } = this.props;

        return (
            <device
                address={address}
                type="actions"
                token={token}
                onPress={this.handlePress}
            />
        );
    }
}

export default SingleButton;
