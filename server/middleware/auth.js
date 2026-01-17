import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ message: "Access Denied. No token provided." });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); 
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user && user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};