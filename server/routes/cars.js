import express from "express";
import carsController from "../controllers/cars.js";

const router = express.Router();

// GET all cars
router.get("/", carsController.getCars);

// GET a single car by id
router.get("/:id", carsController.getCarById);

// POST a new car
router.post("/", carsController.createCar);

// Update an existing car by id
router.put("/:id", carsController.updateCar);

// DELETE a car by id
router.delete("/:id", carsController.deleteCar);

export default router;
