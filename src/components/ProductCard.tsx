import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card border-0 text-decoration-none">
      <Link className="" to={`/product/${product.id}`}>
        <div className="position-relative overflow-hidden mb-3">
          <img
            src={product.images[0]}
            className="card-img-top rounded-5 "
            alt={product.name}
            style={{ objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column position-absolute p-2 bottom-0 p-0 px-4 bg-black text-white rounded-custom">
            <p className="card-text text-success fw-bold fs-5 ">
              {product.price} ₴
            </p>
          </div>
        </div>
        <div className="">
          <div className="btn btn-outline-primary fw-bold w-100">
            {product.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
