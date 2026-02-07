---
name: backend-core-logic
description: Develop robust backend systems by defining routes, managing request-response lifecycles, and implementing database connectivity.
---

# Backend Development Skill

## Instructions

1. **Route Generation**
   - Define clear, RESTful API endpoints (e.g., `GET /api/users`, `POST /api/tasks`).
   - Group related routes using mini-routers or controllers for scalability.
   - Implement dynamic parameters (e.g., `/:id`) for resource-specific actions.

2. **Request & Response Handling**
   - **Parsing:** Extract data from headers, query strings, and the request body (`req.body`).
   - **Validation:** Sanitize input before processing to prevent injection or invalid data.
   - **Status Codes:** Return appropriate HTTP status codes (200 for success, 201 for created, 404 for not found, 500 for server error).



3. **Database Connectivity**
   - **Connection Pooling:** Establish a persistent connection or pool to the database (SQL or NoSQL).
   - **Models/Schemas:** Define data structures to interact with the DB consistently.
   - **Async Operations:** Use `async/await` to handle database I/O without blocking the main thread.



4. **Middleware Implementation**
   - Integrate logic between the request and the final route handler.
   - Use middleware for logging, authentication checks, and error handling.

## Best Practices
- **Consistency:** Always return a structured JSON response (e.g., `{ success: true, data: [] }`).
- **Error Boundaries:** Use try-catch blocks or global error handlers to prevent server crashes.
- **Environment Safety:** Store database URIs and port numbers in `.env` files.
- **Dry Principle:** Abstract repetitive database queries into separate service or repository layers.

## Example Structure (Express.js)

```javascript
import express from 'express';
const router = express.Router();

// 1. Route Definition
router.get('/items/:id', async (req, res) => {
    try {
        // 2. Request Handling
        const { id } = req.params;
        
        // 3. Database Interaction
        const item = await db.collection('items').findOne({ _id: id });
        
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // 4. Response Handling
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});