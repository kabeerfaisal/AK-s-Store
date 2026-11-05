import jwt from 'jsonwebtoken';

const generateToken = (id, purpose = 'login', expiry = '30d') => {
  return jwt.sign(
    { id, purpose },
    process.env.JWT_SECRET,
    {expiresIn: expiry}
  );
};

export default generateToken;