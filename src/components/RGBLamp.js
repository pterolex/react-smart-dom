import React from 'react';

const RGBLamp = ({
    address, type, token, isOn = true, brightness = 100, color,
}) => (
    <device
        address={address}
        type={type}
        token={token}
        color={color}
        brightness={brightness}
        power={isOn}
    />
);

export default RGBLamp;
