#!/bin/bash
SCRIPT_DIR=$(dirname "$0")
"$SCRIPT_DIR/VAGRANT.sh" \
 && sudo "$SCRIPT_DIR/tools/vagrant/linux/configure-vagrant-host.sh" \
 && echo "Successfully setup" || echo "Failure during setup"
