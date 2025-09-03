import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="mt-4 ">
      <Link
        className="card border-0 text-decoration-none mb-3 position-relative"
        to={`/product/${product.id}`}
      >
        <img
          src={product.images[0]}
          className="card-img-top rounded-5"
          alt={product.name}
          style={{ objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column position-absolute p-2 bottom-0 p-0 px-4 bg-black text-white rounded-custom ">
          <p className="card-text text-success fw-bold fs-5 ">
            {product.price} ₴
          </p>
        </div>
      </Link>
      <div className="mt-auto">
        <div className="btn btn-outline-primary fw-bold w-100">
          {product.name}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
