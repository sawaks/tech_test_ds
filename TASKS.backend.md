# Backend Implementation

Implement the backend according to the specifications below. The candidate should complete this test in the programming language where they can perform at their best and demonstrate the strongest solution.

Supported language options for this test:

- Node.js
- Golang

It is up to the candidate to decide how to solve this test; the guidelines below highlight the key points required for a successful submission.

The implementation can use external packages, but it is preferred to keep dependencies to a minimum. Packages related to HTTP, WebSocket, and Redis are expected where needed.

## What we are evaluating

This test is not only about delivering a working implementation. We also want to see how the candidate thinks as an engineer.

In particular, we are interested in:

- how the problem is approached and broken down;
- how the solution is structured and designed;
- how technical decisions and trade-offs are made;
- whether potential edge cases, risks, or operational issues are anticipated;
- whether the solution is designed in a way that allows future changes and improvements.

The strongest submissions will not only work correctly, but will also demonstrate clear reasoning, good judgement, and an architecture that can evolve over time.

## About this test

The backend is expected to provide the following services:

- `drone_subscriber` that handles communication between websocket subscribers and `drone_publisher`, updating the drone `flight path` and receiving drone location updates.
- `drone_publisher` that simulates a drone flight path and streams the current drone coordinates to the subscriber.

Inter-process communication between `drone_subscriber` and `drone_publisher` must be achieved using `redis`.


Comments are required. Ensure that your code is well commented and clear, but avoid commenting on each individual line. Instead, provide comments explaining the rationale behind your implementation choices.

It is also helpful if you include a short README describing your approach, key design decisions, assumptions, and any improvements you would make with more time.

## About the extra credit

When implementing the extra credit tasks below, please consider:

- **design first**: we are more interested in how you structure and design the solution than in completing every extra feature.
- **reasoning**: we value candidates who demonstrate clear thinking, anticipate potential issues or edge cases, and design their solution in a way that supports future changes and extensions.
- **testing**: well-written tests are a strong plus, but they are secondary to demonstrating sound architectural thinking.

It is perfectly acceptable to leave parts unimplemented if you clearly explain how they would be implemented or extended.

## drone_subscriber

The `drone_subscriber` service exposes a websocket server and coordinates communication with the `drone_publisher`. Communication between processes is coordinated using `redis`.

### Must

- Accept websocket connections from clients (UI).
- Receive `flight_path` change requests from the frontend.
- Update the `drone_publisher` process with new flight path requests via `redis`.
- Stream `location` updates to connected clients.

### Expectations

- `drone_subscriber` should be able to handle multiple clients connected to the websocket.
- All clients connected to `drone_subscriber` receive the same coordinates.
- Any client connected to `drone_subscriber` can change the drone flight path.

### Extra Credit

Implementing the features below is optional.

- Any client connected to `drone_subscriber` has a different flight path.
- All clients connected to `drone_subscriber` receive coordinates according to their flight path.
- In addition to `flight_path`, the `origin` location of the drone is configurable.

## drone_publisher

The `drone_publisher` service is responsible for simulating drone flight paths. It publishes the drone location via `redis` for `drone_subscriber`, receives `flight_path` change requests, and handles such requests by streaming the new coordinates with each subsequent update.

### Must

- Receive `flight_path` changes via `redis`.
- Stream the current drone `location` via `redis`.

### Expectations

- `drone_publisher` streams the location of a single drone.
- After a `flight_path` update, the drone path is updated, causing the drone location to abruptly change.
- Coordinates for the drone are generated dynamically. They may be calculated on start, but they cannot be hardcoded.
- Coordinates are generated only when at least one client is connected to `drone_subscriber`.

### Extra Credit

Implementing the features below is optional.

- Multiple drones (one per requested flight path) are handled by the software.
- Stream coordinates for each requested `flight_path`.
- In addition to `flight_path`, the `origin` location of a drone is configurable.
- Support a `stop` command to stop coordinate generation for a drone.