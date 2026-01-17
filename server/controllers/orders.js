import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, firstName, lastName, location, products, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      firstName,
      lastName,
      location,
      products,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); 
    
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};