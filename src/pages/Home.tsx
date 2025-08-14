import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

const Home: React.FC = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/src/data/products.json");
        const products: Product[] = await response.json();
        // Показуємо перші 4 сумки як топ
        setTopProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Помилка завантаження продуктів:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark mb-4">
          В'язані сумки ручної роботи
        </h1>
        <p className="lead text-muted mb-4">
          Унікальні та стильні сумки, створені з любов'ю та увагою до деталей
        </p>
        <Link to="/catalog" className="btn btn-primary btn-lg px-4">
          Переглянути каталог
        </Link>
      </div>

      {/* Top Products Section */}
      <div className="mb-5">
        <h2 className="h3 text-dark mb-4 text-center">
          Наші найпопулярніші сумки
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
      <div className="row g-4 mt-5">
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
