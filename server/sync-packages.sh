#!/bin/sh

# Sync packages between local pipenv virtual environment
# and Docker container with Pip
pipenv lock --pre -r > requirements.txt
docker exec -it chaticket_server_1 pip install -r requirements.txt