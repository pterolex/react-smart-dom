import React from 'react';

const SimpleLamp = ({
    address, type, token, isOn = true,
}) => (
    <device
        address={address}
        type={type}
        token={token}
        power={isOn}
    />
);

export default SimpleLamp;
