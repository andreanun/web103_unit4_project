import "../dotenv.js";
import { pool } from "./database.js";
import { cars } from "../data/cars.js";

const createCarsTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS cars;
        CREATE TABLE IF NOT EXISTS cars (
            id          SERIAL PRIMARY KEY,
            name        VARCHAR(255) NOT NULL,
            exterior    VARCHAR(50) NOT NULL,
            roof        VARCHAR(50) NOT NULL,
            wheels      VARCHAR(50) NOT NULL,
            interior    VARCHAR(50) NOT NULL,
            convertible BOOLEAN DEFAULT false,
            price       INTEGER NOT NULL
        );
    `;
  try {
    await pool.query(createTableQuery);
    console.log("🎉 cars table created successfully");
  } catch (err) {
    console.log("⚠️ error creating cars table", err);
  }
};

const seedCarsTable = async () => {
  await createCarsTable();
  for (const car of cars) {
    try {
      await pool.query(
        `INSERT INTO cars (name, exterior, roof, wheels, interior, convertible, price) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          car.name,
          car.exterior,
          car.roof,
          car.wheels,
          car.interior,
          car.convertible,
          car.price,
        ],
      );
      console.log(`✅ ${car.name} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting car", err);
    }
  }
};

const seedAll = async () => {
  await seedCarsTable();
};

seedAll();
