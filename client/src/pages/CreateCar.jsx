import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  exteriorOptions,
  roofOptions,
  wheelOptions,
  interiorOptions,
} from "../data/options";
import { calculatePrice } from "../utilities/calcPrice";
import { isImpossibleCombo } from "../utilities/validation";
import { createCar } from "../services/CarsAPI";
import "../css/CreateCar.css";

const CATEGORIES = [
  { key: "exterior", label: "Exterior", options: exteriorOptions },
  { key: "roof", label: "Roof", options: roofOptions },
  { key: "wheels", label: "Wheels", options: wheelOptions },
  { key: "interior", label: "Interior", options: interiorOptions },
];

const CreateCar = ({ title }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [exterior, setExterior] = useState(exteriorOptions[0].name);
  const [roof, setRoof] = useState(roofOptions[0].name);
  const [wheels, setWheels] = useState(wheelOptions[0].name);
  const [interior, setInterior] = useState(interiorOptions[0].name);
  const [convertible, setConvertible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("exterior");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const selections = { exterior, roof, wheels, interior, convertible };
  const price = calculatePrice(selections);
  const exteriorHex =
    exteriorOptions.find((o) => o.name === exterior)?.hex || "#1a1a1a";

  const selectedFor = (key) => {
    if (key === "exterior") return exterior;
    if (key === "roof") return roof;
    if (key === "wheels") return wheels;
    if (key === "interior") return interior;
    return null;
  };

  const handleSelect = (key, value) => {
    if (key === "exterior") setExterior(value);
    if (key === "roof") setRoof(value);
    if (key === "wheels") setWheels(value);
    if (key === "interior") setInterior(value);
    setError(null);
  };

  const handleConvertibleToggle = () => {
    setConvertible((prev) => !prev);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please give your car a name.");
      return;
    }

    if (isImpossibleCombo(selections)) {
      setError(
        `A convertible can't have a ${roof} roof. Choose Soft Top, or uncheck Convertible.`,
      );
      return;
    }

    try {
      setSubmitting(true);
      const newCar = await createCar({
        name: name.trim(),
        exterior,
        roof,
        wheels,
        interior,
        convertible,
        price,
      });
      navigate(`/customcars/${newCar.id}`);
    } catch (err) {
      setError("Something went wrong saving your car. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-car">
      <div className="create-car-header">
        <h1>Customize your car</h1>
        <div className="price-badge">${price.toLocaleString()}</div>
      </div>

      <div className="create-car-layout">
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

        <form className="create-car-form" onSubmit={handleSubmit}>
          <label className="convertible-toggle">
            <input
              type="checkbox"
              checked={convertible}
              onChange={handleConvertibleToggle}
            />
            Convertible
          </label>

          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.key}
                className={activeCategory === cat.key ? "active" : ""}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="swatch-row">
            {CATEGORIES.find((c) => c.key === activeCategory).options.map(
              (opt) => (
                <button
                  type="button"
                  key={opt.name}
                  className={
                    selectedFor(activeCategory) === opt.name
                      ? "swatch active"
                      : "swatch"
                  }
                  onClick={() => handleSelect(activeCategory, opt.name)}
                >
                  {opt.name}
                  {opt.price !== 0 && (
                    <span className="swatch-price">
                      {opt.price > 0 ? "+" : ""}${opt.price.toLocaleString()}
                    </span>
                  )}
                </button>
              ),
            )}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="submit-row">
            <input
              type="text"
              placeholder="My New Car"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;
