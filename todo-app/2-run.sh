#!/bin/bash

# Run the infra to run the application


ensure_command_exists() {
  local cmd="$1"
  if ! command -v "$cmd" &> /dev/null; then
    echo "Error: Required command $cmd could not be found"
    exit 1
  fi
}

run_dev_app() {
  ensure_command_exists npm
  echo "✔ NPM cmd exists"
  npm run dev
  echo "✔ Running dev service"
}

run() {
  echo "Running application"
  echo

  run_dev_app

  echo "Running applications"
}

run "$@"
