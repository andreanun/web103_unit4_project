import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCars, deleteCar } from "../services/CarsAPI";
import "../css/ViewCars.css";

const ViewCars = ({ title }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = title || "BOLT BUCKET";
    loadCars();
  }, [title]);

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await getAllCars();
      setCars(data);
      setError(null);
    } catch (err) {
      setError("Failed to load cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this car? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteCar(id);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (err) {
      setError("Failed to delete car. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="view-cars">
        <p>Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="view-cars">
      <h1>Custom Cars</h1>

      {error && <p className="error-message">{error}</p>}

      {cars.length === 0 ? (
        <p>No cars yet. Go customize one!</p>
      ) : (
        <div className="car-list">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <Link to={`/customcars/${car.id}`}>
                <h2>{car.name}</h2>
              </Link>
              <p>Exterior: {car.exterior}</p>
              <p>Roof: {car.roof}</p>
              <p>Wheels: {car.wheels}</p>
              <p>Interior: {car.interior}</p>
              <p>Convertible: {car.convertible ? "Yes" : "No"}</p>
              <p className="car-price">${car.price.toLocaleString()}</p>

              <div className="car-card-actions">
                <Link to={`/edit/${car.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCars;
