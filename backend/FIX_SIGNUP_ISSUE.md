# Fix Sign-Up Issue with studentId Index

## Problem
The sign-up is failing with "Student ID already registered" error because MongoDB has a unique index on `studentId` that treats multiple `null` values as duplicates.

## Solution

You need to drop the existing `studentId` index in MongoDB. Here are two ways to fix it:

### Option 1: Using MongoDB Shell (Recommended)

1. Open MongoDB Compass or connect to your MongoDB database
2. Run this command in the MongoDB shell:

```javascript
use daystar-marketplace
db.users.dropIndex("studentId_1")
```

### Option 2: Using the Fix Script

1. Make sure your backend server is stopped
2. Run the fix script:

```bash
cd backend
node fix-studentid-index.js
```

3. Restart your backend server

## After Fixing

Once the index is dropped, the sign-up should work correctly. The code has been updated to:
- Only check for studentId uniqueness when it's actually provided
- Not include studentId in the user document if it's not provided
- Handle MongoDB duplicate key errors more gracefully

## Note

If you want studentId to be unique when provided (but allow multiple null values), you can create a sparse unique index:

```javascript
db.users.createIndex({ studentId: 1 }, { unique: true, sparse: true })
```

But for now, the unique constraint has been removed from the model since studentId is optional.

