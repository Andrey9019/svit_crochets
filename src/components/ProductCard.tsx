import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDetails = false,
}) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.images[0]}
        className="card-img-top"
        alt={product.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark mb-2">{product.name}</h5>
        <p className="card-text text-muted mb-2">
          <span className="badge bg-light text-dark border">
            {product.color}
          </span>
        </p>
        <p className="card-text text-success fw-bold fs-5 mb-3">
          {product.price} грн
        </p>
        {showDetails && (
          <p className="card-text text-muted mb-3 flex-grow-1">
            {product.description}
          </p>
        )}
        <div className="mt-auto">
          {showDetails ? (
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-primary w-100"
            >
              Детальніше
            </Link>
          ) : (
            <Link
              to={`/product/${product.id}`}
              className="btn btn-primary w-100"
            >
              Детальніше
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
