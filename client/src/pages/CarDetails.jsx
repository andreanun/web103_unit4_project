import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCar, deleteCar } from "../services/CarsAPI";
import { exteriorOptions } from "../data/options";
import "../css/CarDetails.css";

const CarDetails = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = title || "BOLT BUCKET";
    loadCar();
  }, [id, title]);

  const loadCar = async () => {
    try {
      setLoading(true);
      const data = await getCar(id);
      setCar(data);
      setError(null);
    } catch (err) {
      setError("Could not find that car.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this car? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteCar(id);
      navigate("/customcars");
    } catch (err) {
      setError("Failed to delete car. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="car-details">
        <p>Loading car...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="car-details">
        <p className="error-message">{error || "Car not found."}</p>
        <Link to="/customcars">
          <button>Back to all cars</button>
        </Link>
      </div>
    );
  }

  const exteriorHex =
    exteriorOptions.find((o) => o.name === car.exterior)?.hex || "#1a1a1a";

  return (
    <div className="car-details">
      <Link to="/customcars" className="back-link">
        &larr; Back to all cars
      </Link>

      <div className="car-details-layout">
        <div className="car-preview">
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="160" width="400" height="6" fill="#333" />
            <path
              d="M40 150
                               L55 100
                               Q75 70 120 65
                               L260 65
                               Q300 70 330 100
                               L360 150
                               Z"
              fill={exteriorHex}
              stroke="#000"
              strokeWidth="2"
            />
            <path
              d="M120 110 L140 75 L240 75 L260 110 Z"
              fill="#cfe8f7"
              opacity="0.6"
            />
            <circle
              cx="100"
              cy="150"
              r="26"
              fill="#222"
              stroke="#555"
              strokeWidth="4"
            />
            <circle
              cx="300"
              cy="150"
              r="26"
              fill="#222"
              stroke="#555"
              strokeWidth="4"
            />
          </svg>
        </div>

        <div className="car-details-info">
          <h1>{car.name}</h1>
          <div className="price-badge">${car.price.toLocaleString()}</div>

          <dl className="spec-list">
            <dt>Exterior</dt>
            <dd>{car.exterior}</dd>

            <dt>Roof</dt>
            <dd>{car.roof}</dd>

            <dt>Wheels</dt>
            <dd>{car.wheels}</dd>

            <dt>Interior</dt>
            <dd>{car.interior}</dd>

            <dt>Convertible</dt>
            <dd>{car.convertible ? "Yes" : "No"}</dd>
          </dl>

          {error && <p className="error-message">{error}</p>}

          <div className="car-details-actions">
            <Link to={`/edit/${car.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
