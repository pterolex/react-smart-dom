#!/bin/bash

cd ../../php-miio

php miio-cli.php \
    --ip 192.168.8.101 \
    --token 7b563c68411ce9e1cbf72660bb8964c9 \
    --sendcmd '{"id":1,"method":"set_power","params":[ "off" ]}'