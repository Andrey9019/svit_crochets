import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home: React.FC = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getDocs(collection(db, "products"));
        const productsData: Product[] = response.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Product)
        );
        setTopProducts(productsData.slice(0, 4)); // Відображаємо лише перші 4 продукти
        // setFilteredProducts(productsData);
        // setLoading(false);
        console.log("Дані з Firestore:", productsData); // Виводимо дані в консоль
      } catch (error) {
        console.error("Помилка завантаження продуктів:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
      <div
        className="hero-section text-center mb-5 py-5 position-relative overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(245, 230, 232, 0.9), rgba(217, 228, 221, 0.1)), url("https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&h=600&fit=crop") center/cover',
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="hero-content">
          <h1 className="display-3 fw-bold text-dark mb-4">
            В'язані сумки ручної роботи
          </h1>
          <p className="lead text-dark mb-4 fs-5">
            Унікальні та стильні сумки, створені з любов'ю та увагою до деталей
          </p>
          <Link to="/catalog" className="btn btn-primary btn-lg px-5 py-3 fs-5">
            Переглянути каталог
          </Link>
        </div>
      </div>

      {/* Top Products Section */}
      <div className="mb-5 container">
        <h2 className="h3 text-dark mb-4 text-center">
          {/* Наші найпопулярніші сумки */}
        </h2>
        <div className="row g-4">
          {topProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="row g-4 mt-5 container mx-auto">
        <div className="col-md-4 text-center">
          <div className="p-4">
            <div className="fs-1 mb-3">🧶</div>
            <h4 className="h5 text-dark">Ручна робота</h4>
            <p className="text-muted">
              Кожна сумка створена вручну з увагою до кожної петлі
            </p>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="p-4">
            <div className="fs-1 mb-3">🌿</div>
            <h4 className="h5 text-dark">Натуральні матеріали</h4>
            <p className="text-muted">
              Використовуємо тільки якісну пряжу з натуральних волокон
            </p>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="p-4">
            <div className="fs-1 mb-3">✨</div>
            <h4 className="h5 text-dark">Унікальний дизайн</h4>
            <p className="text-muted">
              Кожна сумка має свій неповторний характер та стиль
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
