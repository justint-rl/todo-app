#!/bin/bash

# Teardown script
# Steps to teardown
# 1) Run tilt down to spin down containers
# 2) stops Tilt process running on port 10350

ensure_command_exists() {
  local cmd="$1"
  if ! command -v "$cmd" &> /dev/null; then
    echo "Error: Required command $cmd could not be found"
    exit 1
  fi
}

stop_process() {
  pid=$1
  echo "Stopping process (PID: $pid)"

  # Try graceful shutdown first
  kill $pid

  # Wait a few seconds to see if it stops
  sleep 2

  # Check if still running
  if ps -p $pid > /dev/null 2>&1; then
    echo "Process still running, forcing shutdown..."
    kill -9 $pid
  fi
}

find_process_by_command() {
  local command_pattern="$1"

  # Use pgrep to find processes matching the command pattern
  # -f flag searches the full command line
  local pids=$(pgrep -f "$command_pattern" 2>/dev/null)

  # Return the PIDs (could be multiple, one per line)
  echo "$pids"
}

teardown_tilt() {
  ensure_command_exists "tilt"
  # Run tilt down
  tilt down
  local port=10350

  # Find all processes using port 10350
  local pids=$(lsof -ti :$port 2>/dev/null)

  if [ -z "$pids" ]; then
    echo "No process found running on port $port"
    return 0
  fi

  # Loop through each PID
  while IFS= read -r pid; do
    [ -z "$pid" ] && continue

    # Get process name to verify it's tilt
    local process_name=$(ps -p $pid -o comm= 2>/dev/null)

    if [ -z "$process_name" ]; then
      echo "Warning: Could not identify process with PID $pid"
      continue
    fi

    # Check if it's tilt
    if [[ "$process_name" == *"tilt"* ]]; then
      echo "Found Tilt process (PID: $pid) on port $port"
      stop_process $pid

      echo "✔ Tilt stopped successfully"
      return
    else
      echo "Warning: Process on port $port is '$process_name' (PID: $pid), not Tilt"
      echo "Skipping..."
    fi
  done <<< "$pids"
}

teardown_dev() {
  echo "Looking for npm dev server..."

  # Find npm run dev processes
  local pids=$(find_process_by_command "npm run dev")

  if [ -z "$pids" ]; then
    echo "No npm dev server found"
    return 0
  fi

  # Loop through each PID and stop it
  while IFS= read -r pid; do
    [ -z "$pid" ] && continue

    echo "Found npm dev server (PID: $pid)"
    stop_process $pid
    echo "✔ Dev server stopped"
  done <<< "$pids"
}

teardown() {
  echo "Tearing down infrastructure..."
  echo

  teardown_tilt
  teardown_dev

  echo
  echo "Teardown complete"
}

teardown "$@"
