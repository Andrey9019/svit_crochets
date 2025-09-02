import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("Всі");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/src/data/products.json");
        const productsData: Product[] = await response.json();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження продуктів:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedColor === "Всі") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.color === selectedColor
      );
      setFilteredProducts(filtered);
    }
  }, [selectedColor, products]);

  const colors = ["Всі", ...Array.from(new Set(products.map((p) => p.color)))];

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="h2 text-dark text-center mb-4">
            Каталог в'язаних сумок
          </h1>

          {/* Filters */}
          {/* <div className="mb-4">
            <h5 className="text-dark mb-3">Фільтр за кольором:</h5>
            <div className="d-flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`btn ${
                    selectedColor === color
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div> */}

          {/* Results count */}
          {/* <p className="text-muted mb-4">
            Знайдено {filteredProducts.length} сумок
          </p> */}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6">
                  <ProductCard product={product} showDetails={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">Сумки не знайдено</h4>
              <p className="text-muted">
                Спробуйте змінити фільтр або перегляньте весь каталог
              </p>
              <button
                onClick={() => setSelectedColor("Всі")}
                className="btn btn-primary"
              >
                Показати всі
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
