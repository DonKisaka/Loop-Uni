// Script to fix the studentId index issue
// Run this once: node fix-studentid-index.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('users');

    // Drop the existing studentId index (causes issues with null values)
    try {
      await collection.dropIndex('studentId_1');
      console.log('✓ Dropped existing studentId index');
    } catch (err) {
      if (err.code === 27 || err.codeName === 'IndexNotFound') {
        console.log('Index does not exist, skipping drop');
      } else {
        console.error('Error dropping index:', err.message);
        throw err;
      }
    }

    // Optionally create a sparse unique index if you want studentId to be unique when provided
    // Uncomment the following if you need studentId uniqueness:
    /*
    await collection.createIndex(
      { studentId: 1 },
      { 
        unique: true, 
        sparse: true,
        name: 'studentId_1_sparse'
      }
    );
    console.log('Created sparse unique index on studentId');
    */
    console.log('Note: studentId is now optional and does not need to be unique');

    await mongoose.connection.close();
    console.log('Done! You can now restart your backend server.');
  } catch (error) {
    console.error('Error fixing index:', error);
    process.exit(1);
  }
};

fixIndex();

