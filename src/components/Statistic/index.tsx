import React, { useState, useEffect } from "react";
import { Button, Col, Row, Statistic } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

interface Product {
  id: string;
  name: string;
  price: number; // Ensure price is declared as a number
  category: string;
  description: string;
  images: string[];
  color: string;
  gender: string;
}

const ProductStatistic: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList: Product[] = productsSnapshot.docs.map((doc) => {
        const data = doc.data();
        // Ensure price is parsed as a number
        return {
          id: doc.id,
          name: data.name,
          price: Number(data.price), // Parse price as a number
          category: data.category,
          description: data.description,
          images: data.images,
          color: data.color,
          gender: data.gender,
        };
      });
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Calculate total price of all products
  const totalProductsPrice = products.reduce(
    (acc, product) => acc + product.price,
    0
  );

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Products Total" value={products.length} />
      </Col>
      <Col span={12}>
        <Statistic
          title="Products Price"
          value={`${totalProductsPrice} $`}
          precision={2}
        />
        <Button style={{ marginTop: 16 }} type="primary">
          Recharge
        </Button>
      </Col>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} loading />
      </Col>
    </Row>
  );
};

export default ProductStatistic;
