import jwt from 'jsonwebtoken';

export const createSession = async (userId) => {  
  const JWT_SECRET = process.env.JWT_SECRET;     
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); 
  return token;
};

export const verifySession = async (token) => {    
  const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    return decoded.userId;
  
};
