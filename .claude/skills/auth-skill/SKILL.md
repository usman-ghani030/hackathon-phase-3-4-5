---
name: auth-implementation
description: Implement secure authentication flows including signup, signin, password hashing, and JWT management. Integration with Better Auth.
---

# Authentication & Authorization Skill

## Instructions

1. **Secure Registration (Signup)**
   * Validate user input (email format, password strength).
   * **Never** store plain-text passwords. 
   * Check for existing users before creating a new record to prevent account duplication.

2. **Password Hashing**
   * Use a robust hashing algorithm like **Argon2id** or **bcrypt**.
   * Ensure a unique salt is generated for every user.
   


3. **Session Management (JWT)**
   * Generate a **JSON Web Token (JWT)** upon successful login.
   * Include essential claims (e.g., `userId`, `role`) but avoid sensitive data like passwords.
   * Sign the token using a strong secret key stored in environment variables.



4. **Better Auth Integration**
   * Initialize the Better Auth client/server instance.
   * Configure desired providers (Email/Password, Google, GitHub).
   * Utilize built-in session hooks to manage user state across the frontend.

5. **Security Middleware**
   * Create a protective layer for private routes.
   * Verify the JWT/Session cookie before allowing access to API resources.
   * Implement token expiration and refresh logic.

## Best Practices
* **HttpOnly Cookies:** Store JWTs in `HttpOnly` and `Secure` cookies to mitigate XSS attacks.
* **Environment Variables:** Never commit secrets (like `JWT_SECRET`) to version control.
* **Rate Limiting:** Apply rate limits to `/auth/signin` and `/auth/signup` to prevent brute-force attacks.
* **Generic Errors:** Use "Invalid credentials" rather than "User not found" to prevent account enumeration.

## Example Structure (TypeScript)

```typescript
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

// 1. Hashing a password during signup
const hashedPassword = await hash(password, 12);

// 2. Generating a JWT on signin
const token = jwt.sign(
  { sub: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '1h' }
);

// 3. Better Auth Basic Config
/*
export const auth = createAuth({
    database: prisma,
    emailPassword: {
        enabled: true
    },
    // Better Auth handles hashing and JWTs internally
});
*/
