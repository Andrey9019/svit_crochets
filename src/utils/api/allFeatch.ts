import { db } from "../../firebase";
import type { Product } from "../../types";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const query = await getDocs(collection(db, "products"));
    const productsData: Product[] = query.docs.map(
      (doc) =>
        ({
          id: Number(doc.id), // Конвертуємо string у number
          ...doc.data(),
        } as Product)
    );
    console.log("Дані з Firestore:", productsData);
    return productsData;
  } catch (error) {
    console.error("Помилка завантаження продуктів:", error);
    return [];
  }
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const docSnap = await getDoc(doc(db, "products", id));
    if (docSnap.exists()) {
      const productData = {
        id: Number(docSnap.id),
        ...docSnap.data(),
      } as Product;
      console.log("Дані продукту з Firestore:", productData);
      return productData;
    }
    console.log("Продукт не знайдено для id:", id);
    return null;
  } catch (error) {
    console.error("Помилка завантаження продукту:", error);
    return null;
  }
};
