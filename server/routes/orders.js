import express from "express";
import { createOrder, getUserOrders } from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);

router.get("/:userId", verifyToken, getUserOrders);

export default router;