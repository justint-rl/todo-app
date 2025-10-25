# todo-app
Simple to-do app that has integration with different frontends (web, mobile, etc.)

# Requirements
- Tilt

# Local Dev

## Running with Tilt

Tilt automates the local development workflow by managing infrastructure and application containers.

### Prerequisites
- [Tilt](https://docs.tilt.dev/install.html) installed
- Docker or compatible container runtime

### Steps

1. **Start Tilt**
   ```bash
   tilt up
   ```
   This command will:
   - Spin up all required infrastructure (databases, etc.)
   - Build and run the application
   - Watch for file changes and auto-reload

2. **Apply database schema migration**
   ```bash
   npm run db:push
   ```

3. **Access the application**
   - Open your browser to the URL shown in the Tilt UI (typically http://localhost:3000)
   - View logs and resource status in the Tilt web UI at http://localhost:10350

4. **Stop Tilt**
   ```bash
   tilt down
   ```
   This will tear down all containers and resources
