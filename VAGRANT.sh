#!/bin/bash

### init some used functions
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

### configuration
OS=linux
SERVER=${1:-nginx}

VAGRANT_FILE_PATH="tools/vagrant/${OS}/${SERVER}"
SETUP_DIR="$SCRIPT_DIR"

function checkout_submodule() {
    cd "$SCRIPT_DIR"
    git submodule init
    git submodule update
}

function setup_vagrant() {
    . "${SCRIPT_DIR}/tools/vagrant/linux/functions.sh"

    ${DIFF_TOOL} -Nr --exclude='*id_rsa*' "${SETUP_DIR}/puphpet/" "${SCRIPT_DIR}/${VAGRANT_FILE_PATH}/puphpet/"
    NEW=$?

    if [[ ${NEW} -gt 0 ]]; then
        log RSYNC "${SCRIPT_DIR}/${VAGRANT_FILE_PATH}/puphpet/ -> ${SETUP_DIR}/puphpet/"
        rsync -av --delete --exclude=files/dot/ssh/ "$SCRIPT_DIR/${VAGRANT_FILE_PATH}/puphpet/" "${SETUP_DIR}/puphpet/"
        log RSYNC-DONE "${SCRIPT_DIR}/${VAGRANT_FILE_PATH}/puphpet/ -> ${SETUP_DIR}/puphpet/"

        log RSYNC "${SCRIPT_DIR}/${VAGRANT_FILE_PATH}/puphpet/files/dot/ssh/ -> ${SETUP_DIR}/puphpet/files/dot/ssh/"
        rsync -av "${SCRIPT_DIR}/${VAGRANT_FILE_PATH}/puphpet/files/dot/ssh/" "${SETUP_DIR}/puphpet/files/dot/ssh/"
        log RSYNC-DONE "${SCRIPT_DIR}/${VAGRANT_FILE_PATH}/puphpet/ -> ${SETUP_DIR}/puphpet/"

        log COPY "$SCRIPT_DIR/${VAGRANT_FILE_PATH}/Vagrantfile -> $(pwd)"
        cp "$SCRIPT_DIR/${VAGRANT_FILE_PATH}/Vagrantfile" ./
        log COPY-DONE "$SCRIPT_DIR/${VAGRANT_FILE_PATH}/Vagrantfile -> $(pwd)"
    else
        log DONE "no changes detected -> nothing to do"
    fi

    log INFO "You should run now 'vagrant up' or 'vagrant provision' now... "
}

function set_file_permissions() {
	sudo chgrp 33 .
	sudo chgrp -R 33 ./*
}

if [[ ! -f tools/vagrant/README.md ]]; then
    checkout_submodule
fi

setup_vagrant
set_file_permissions
