import { pool } from "../config/database.js";

const getCars = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cars ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cars WHERE id = $1", [
      req.params.id,
    ]);
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCar = async (req, res) => {
  try {
    const { name, exterior, roof, wheels, interior, convertible, price } =
      req.body;
    const results = await pool.query(
      `INSERT INTO cars (name, exterior, roof, wheels, interior, convertible, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
      [name, exterior, roof, wheels, interior, convertible, price],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { name, exterior, roof, wheels, interior, convertible, price } =
      req.body;
    const results = await pool.query(
      `UPDATE cars
             SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, convertible = $6, price = $7
             WHERE id = $8
             RETURNING *`,
      [
        name,
        exterior,
        roof,
        wheels,
        interior,
        convertible,
        price,
        req.params.id,
      ],
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const results = await pool.query(
      "DELETE FROM cars WHERE id = $1 RETURNING *",
      [req.params.id],
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res
      .status(200)
      .json({ message: "Car deleted successfully", car: results.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
