## Overview

This project implements a simple long-lived HTTP server in Node.js. The server listens on port 9000 and supports two main functionalities:

- POST /input: Accepts a plain text key in the request body and stores it in memory.
- GET /query: Accepts a query string parameter key, checks if the key has been submitted before, and returns the count of how many times it has been seen.

The goal of this project is to demonstrate handling concurrent HTTP requests efficiently without over-engineering, while keeping the code simple, clear, and functional.

### Project Structure

I kept the project minimal with no unnecessary layers of abstraction (like route controllers or services) because it doesn't use any external services like databases or message queues. The logic resides within the route handlers, keeping it straightforward. For the sake of simplicity, I’ve chosen to use an in-memory Map object to store the submitted keys.

In addition to handling the core functionality, I have implemented the following:

- Custom Errors: I've added custom error handling to ensure that invalid requests or unexpected scenarios are handled gracefully. This helps in providing meaningful error responses to the client while avoiding application crashes.

- Input Validation using express-validator: To ensure the integrity of data submitted to the server, I used express-validator to validate inputs (e.g., ensuring that the /input endpoint receives a non-empty string). This approach guarantees that the server only processes valid data.

- Logging with winston: I used the winston logging library for structured logging. This ensures that important events (such as incoming requests and errors) are logged properly, aiding in debugging and monitoring the system in production.

> [!CAUTION]
> This approach is ideal for the purpose of the assignment, but for a production-level application, there are several optimizations that could be implemented, which I will detail later.

#### Endpoints

**POST /input**
• Description: Accepts a plain text string as the key in the request body and stores it in memory.
• Body: Plain text (key).
• Response: 200 OK.
**GET /query**
• Description: Accepts a query parameter key and checks how many times it has been submitted through the /input endpoint.
• Query Parameter: key (required).
• Response: Returns the count as number. If the key has never been submitted, returns 0.

### Why I Chose This Approach

1. **In-memory Storage:** I chose an in-memory Map object to store the submitted keys for simplicity. The Map provides fast insertion and lookup times, which is sufficient for small-scale testing.
2. **Minimalistic Design:** Since the focus is on simple HTTP interactions, I avoided adding unnecessary layers of abstraction. I decided against using route controllers or services because the logic does not interact with any external services, databases, or complex business rules.

### Future Considerations for a Production-Ready Service

While the current implementation is suitable for this assignment, a production-level application should be designed to handle larger workloads,and scaling. Below are some thoughts on how the service could be enhanced:

1. Persistent Storage:
   Currently, the keys are stored in memory, which means they are lost when the server restarts. For a production environment, a more reliable storage solution is necessary. For production, I would store the keys and their counts in a Redis database. Redis is ideal for high-performance key-value storage and can scale horizontally. Using Redis' sorted sets would allow for efficient counting of keys.

2. Clustering:
   Node.js runs on a single-threaded event loop, which can be a bottleneck on multi-core machines. To take full advantage of multi-core CPUs, I would implement clustering. This allows the service to handle a much larger volume of concurrent connections.

3. Request Rate Limiting:
   To protect the service from being overwhelmed by too many requests, I would implement rate limiting. Libraries such as express-rate-limit can be used to limit the number of requests from a single client within a specific time frame.

4. API Versioning:
   As the service evolves, future changes may require backward compatibility. Implementing API versioning would help in maintaining older versions of the service while introducing new features.

## Conclusion

This project showcases a simple, scalable HTTP service in Node.js. While the current version is suited for demonstration purposes, it can be scaled up for production by introducing persistent storage (Redis), clustering, rate limiting, and load balancing.
