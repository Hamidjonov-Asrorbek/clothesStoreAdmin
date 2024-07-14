import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import type { TableColumnsType } from "antd";
import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  color: string;
  gender: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Product name",
    dataIndex: "name",
    key: "name",
    width: 100,
    fixed: "left",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 100,
    fixed: "left",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    width: 150,
    render: (color: string) => (
      <div
        className="w-10 h-10 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 150,
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    width: 200,
    render: (images: string[] = []) => (
      <div className="flex flex-wrap gap-2">
        {images.map((src, index) => (
          <Image key={index} width={50} height={50} src={src} />
        ))}
      </div>
    ),
  },
];

const ProductTable: React.FC<any> = ({ filterData }) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products: DataType[] = [];

        querySnapshot.forEach((doc) => {
          const { name, price, category, description, images, color, gender } =
            doc.data();
          products.push({
            key: doc.id,
            name,
            price,
            category,
            description,
            images: images || [],
            color,
            gender,
          });
        });

        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error state or display a message to the user
      }
    };

    fetchData();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={filterData || data}
      scroll={{ x: 1500, y: 300 }}
    />
  );
};

export default ProductTable;
