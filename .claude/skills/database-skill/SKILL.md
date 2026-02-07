---
name: database-management
description: Design relational schemas, manage table structures, and handle database migrations.
---

# Database Schema & Migration Design

## Instructions

1. **Schema Design**
   - Identify core entities and their properties.
   - Define primary keys (e.g., UUID or Auto-incrementing BigInt).
   - Establish relationships: One-to-One, One-to-Many, or Many-to-Many.



2. **Table Creation**
   - Select appropriate data types (e.g., `VARCHAR` for text, `TIMESTAMP` for dates, `JSONB` for unstructured data).
   - Apply constraints: `NOT NULL`, `UNIQUE`, and `DEFAULT` values.
   - Implement Foreign Key constraints to ensure referential integrity.

3. **Migrations Management**
   - Use version-controlled migration files (e.g., `001_create_users_table.sql`).
   - Include "Up" scripts (to apply changes) and "Down" scripts (to rollback changes).
   - Ensure migrations are idempotent and don't break existing data.



## Best Practices
- **Normalization:** Aim for 3rd Normal Form (3NF) to reduce data redundancy.
- **Indexing:** Add indexes on columns frequently used in `WHERE` clauses or `JOIN` operations.
- **Naming Conventions:** Use `snake_case` for table and column names.
- **Audit Logs:** Always include `created_at` and `updated_at` timestamps in every table.
- **Soft Deletes:** Consider an `is_deleted` or `deleted_at` flag instead of removing rows permanently.

## Example Structure (SQL & Prisma)

### SQL Migration
```sql
-- Up Migration
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE
);