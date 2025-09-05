import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

import { fetchProduct } from "../utils/api/allFeatch";
import { fetchProducts } from "../utils/api/allFeatch";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct(id).then((productData) => {
        setProduct(productData);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    fetchProducts().then((productsData) => {
      setTopProducts(productsData.slice(0, 4));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Заборона прокручування, коли модалка відкрита
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Очистка при закритті
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

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

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        <Link
          to="/catalog"
          className="btn btn-outline-primary btn-custom-gradient"
        >
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
              className="img-fluid rounded shadow rounded-custom"
              alt={product.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                cursor: "zoom-in",
              }}
              onClick={handleImageClick}
            />
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
                <div className="d-flex justify-content-center mt-3">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`btn btn-sm mx-1 btn-custom-gradient ${
                        index === currentImageIndex
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    />
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
            <h6 className="text-dark mb-2">Розміри:</h6>

            <span className="badge bg-light text-dark border fs-6">
              {product.size}
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
            </ul>
          </div>
          <div className="d-grid gap-2">
            <Link
              to="https://www.instagram.com/svit_crochets?igsh=MWo5bmxkN2czb2lueA=="
              className="btn btn-primary btn-lg btn-custom-gradient"
            >
              Для замовлення пиши мені в Instagram
            </Link>
            {/* <Link
              to="/contacts"
              className="btn btn-primary btn-lg btn-custom-gradient"
            >
              Замовити
            </Link> */}
            {/* <Link
              to="/catalog"
              className="btn btn-outline-primary btn-custom-gradient"
            >
              Повернутися до каталогу
            </Link> */}
          </div>
        </div>
      </div>
      {/* Top Products Section */}
      <div className="mb-5 mt-10 container">
        <h2 className="h3 text-dark mb-4 text-center">Також дивляться</h2>
        <div className="row g-4">
          {topProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      {/* Bootstrap Modal */}
      {/* {product && (
        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{product.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div
                  id="productModalCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="rounded-custom"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "600px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {product.images.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#productModalCarousel"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#productModalCarousel"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {product && showModal && (
        <div className="modal-custom" onClick={handleCloseModal}>
          <div className="modal-image-container">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="modal-image rounded-custom"
              onClick={(e) => e.stopPropagation()}
            />
            {product.images.length > 1 && (
              <>
                <button
                  className="modal-arrow modal-arrow-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  disabled={currentImageIndex === 0}
                >
                  ‹
                </button>
                <button
                  className="modal-arrow modal-arrow-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  disabled={currentImageIndex === product.images.length - 1}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
