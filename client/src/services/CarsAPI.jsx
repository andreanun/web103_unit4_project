const BASE_URL = "/api/cars";

// GET all cars
const getAllCars = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

// GET a single car by id
const getCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch car ${id}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching car ${id}:`, error);
    throw error;
  }
};

// POST a new car
const createCar = async (car) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Failed to create car: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
};

// PUT (update) an existing car by id
const updateCar = async (id, car) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || `Failed to update car ${id}: ${response.status}`,
      );
    }
    return data;
  } catch (error) {
    console.error(`Error updating car ${id}:`, error);
    throw error;
  }
};

// DELETE a car by id
const deleteCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || `Failed to delete car ${id}: ${response.status}`,
      );
    }
    return data;
  } catch (error) {
    console.error(`Error deleting car ${id}:`, error);
    throw error;
  }
};

export { getAllCars, getCar, createCar, updateCar, deleteCar };
