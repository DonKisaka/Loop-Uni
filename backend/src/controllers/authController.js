import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '30d'
    }
  );
};

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, studentId, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    if (studentId) {
      const studentIdExists = await User.findOne({ studentId });
      if (studentIdExists) {
        return res.status(400).json({ error: 'Student ID already registered' });
      }
    }

    const userData = {
      email,
      password,
    };
    
    if (firstName) userData.firstName = firstName;
    if (lastName) userData.lastName = lastName;
    if (studentId) userData.studentId = studentId;
    if (phoneNumber) userData.phoneNumber = phoneNumber;
    
    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        token: generateToken(user),
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          studentId: user.studentId,
          phoneNumber: user.phoneNumber,
          isVerified: user.isVerified
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      if (field === 'email') {
        return res.status(400).json({ error: 'User already exists with this email' });
      } else if (field === 'studentId') {
        if (error.keyValue && error.keyValue.studentId === null) {
          return res.status(400).json({ 
            error: 'Database configuration issue. Please contact support or run the database fix script.' 
          });
        }
        return res.status(400).json({ error: 'Student ID already registered' });
      }
      return res.status(400).json({ error: `${field} already exists` });
    }
    
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        token: generateToken(user),
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          studentId: user.studentId,
          phoneNumber: user.phoneNumber,
          isVerified: user.isVerified
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, getMe };

