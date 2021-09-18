#!/bin/sh

docker run \
    --rm \
    -d \
    -p 127.0.0.1:6543:5432 \
    -e POSTGRES_DB="postgres" \
    -e POSTGRES_USER="postgres" \
    -e POSTGRES_PASSWORD="postgres" \
    --name postgres \
    postgres