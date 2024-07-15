import React from "react";
import { Table, Image, Button, Popconfirm, message } from "antd";
import type { TableColumnsType } from "antd";
import { db } from "../../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  color: string;
  gender: string;
}
interface DataType {
  key: React.Key;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  color: string;
  gender: string;
  id: string;
}

const ProductTable: React.FC<any> = ({
  filterData,
  setEditProduct,
  setIsModalOpen,
  setData,
}) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      // Filter out the deleted product from filterData
      const updatedData = filterData.filter(
        (product: any) => product.id !== id
      );
      setData(updatedData);
      message.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  const handleEdit = (product: DataType) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      width: 70,
      fixed: "left",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 70,
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 70,
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
      width: 70,
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
      width: 50,
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
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Ensure filterData contains unique products based on id
  const uniqueFilterData = Array.from(
    new Set(filterData.map((product: Product) => product.id))
  ).map((id) => {
    return filterData.find((product: Product) => product.id === id);
  });

  return (
    <Table
      columns={columns}
      dataSource={uniqueFilterData}
      scroll={{ x: 1500, y: 300 }}
      rowKey={(record) => record.id}
    />
  );
};

export default ProductTable;
