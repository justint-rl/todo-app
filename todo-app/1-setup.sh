#!/bin/bash

# Setup the infra to run the application
# Start up the following:
# 1) DB Infra through tilt
# 2) Install dependencies through npm install

ensure_command_exists() {
  local cmd="$1"
  if ! command -v "$cmd" &> /dev/null; then
    echo "Error: Required command $cmd could not be found"
    exit 1
  fi
}

setup_infra() {
  ensure_command_exists tilt
  echo "✔ Tilt cmd exists"
  tilt up --stream < /dev/null > /dev/null 2>&1 &
  echo "✔ Running tilt service"
}

install_node_dependencies() {
  ensure_command_exists npm
  echo "✔ NPM cmd exists"
  echo "Install NPM dependencies"
  npm install
  echo "✔ Installed NPM dependencies"
}

setup() {
  echo "Setting up infra"
  echo

  setup_infra
  install_node_dependencies

  echo "Completed setting up infra"
}

setup "$@"
