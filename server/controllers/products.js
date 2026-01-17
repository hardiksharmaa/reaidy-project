import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }; 
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock, image } = req.body;
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      countInStock,
      image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}