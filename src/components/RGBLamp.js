import React from 'react';

const RGBLamp = ({
    address, type, token, isOn = true, color,
}) => (
    <device
        address={address}
        type={type}
        token={token}
        color={color}
        power={isOn}
    />
);

export default RGBLamp;
