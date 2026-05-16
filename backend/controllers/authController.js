const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('admin', 10) // Pre-hashed password
  }
];

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(user => user.username === username);
  
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user.username);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
};