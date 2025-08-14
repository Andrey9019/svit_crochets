import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/src/data/products.json");
        const products: Product[] = await response.json();
        const foundProduct = products.find((p) => p.id === Number(id));
        setProduct(foundProduct || null);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження продукту:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const nextImage = () => {
    if (product && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-muted">Сумку не знайдено</h2>
        <Link to="/catalog" className="btn btn-primary">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className="position-relative">
            <img
              src={product.images[currentImageIndex]}
              className="img-fluid rounded shadow"
              alt={product.name}
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />

            {/* Image Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2"
                  style={{ zIndex: 10 }}
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentImageIndex === product.images.length - 1}
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2"
                  style={{ zIndex: 10 }}
                >
                  ›
                </button>

                {/* Image Indicators */}
                <div className="d-flex justify-content-center mt-3">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`btn btn-sm mx-1 ${
                        index === currentImageIndex
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          <h1 className="h2 text-dark mb-3">{product.name}</h1>

          <div className="mb-3">
            <span className="badge bg-light text-dark border fs-6">
              {product.color}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-success fw-bold fs-2">
              {product.price} грн
            </span>
          </div>

          <div className="mb-4">
            <h5 className="text-dark mb-2">Опис:</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          <div className="mb-4">
            <h5 className="text-dark mb-2">Особливості:</h5>
            <ul className="text-muted">
              <li>100% ручна робота</li>
              <li>Натуральні матеріали</li>
              <li>Унікальний дизайн</li>
              <li>Зручні ручки</li>
            </ul>
          </div>

          <div className="d-grid gap-2">
            <Link to="/contacts" className="btn btn-primary btn-lg">
              Замовити
            </Link>
            <Link to="/catalog" className="btn btn-outline-secondary">
              Повернутися до каталогу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
