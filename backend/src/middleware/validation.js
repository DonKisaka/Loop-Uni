const validateRegistration = (req, res, next) => {
  const { email, password, firstName, lastName, studentId } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!email.endsWith('@daystar.ac.ke')) {
    errors.push('Email must be a valid Daystar University email');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Name validation
  if (!firstName || firstName.length < 2) {
    errors.push('First name must be at least 2 characters');
  }
  if (!lastName || lastName.length < 2) {
    errors.push('Last name must be at least 2 characters');
  }

  // Student ID validation
  if (!studentId) {
    errors.push('Student ID is required');
  } else if (!/^\d{6}$/.test(studentId)) {
    errors.push('Student ID must be 6 digits');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

export { validateRegistration, validateLogin };

