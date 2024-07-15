import React, { Dispatch, useState, useEffect } from "react";
import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
import UploadImage from "./UploadImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import TextArea from "antd/es/input/TextArea";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";

const ProductModal = ({
  isModalOpen,
  setIsModalOpen,
  editProduct,
  setData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  editProduct: any;
  setData: Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (editProduct) {
      form.setFieldsValue(editProduct);
      setUrls(editProduct.images || []);
    } else {
      form.resetFields();
      setUrls([]);
    }
  }, [editProduct]);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, "products/" + file.name);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);

      if (editProduct) {
        await updateDoc(doc(db, "products", editProduct.id), {
          ...values,
          images: [...urls, ...urls],
        });
        setData((prev) =>
          prev.map((product) =>
            product.id === editProduct.id
              ? { ...product, ...values, images: [...urls, ...urls] }
              : product
          )
        );
        message.success("Product updated successfully");
      } else {
        const docRef = await addDoc(collection(db, "products"), {
          ...values,
          images: urls,
        });
        const newProduct = { id: docRef.id, ...values, images: urls };
        setData((prev) => [...prev, newProduct]);
        message.success("Product added successfully");
      }
      setIsModalOpen(false);
      form.resetFields();
      setUrls([]);
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("Failed to save product");
    }
  };

  return (
    <Modal
      title={editProduct ? "Edit Product" : "Add Product"}
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={editProduct || {}}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select>
            <Select.Option value="man">Man</Select.Option>
            <Select.Option value="woman">Woman</Select.Option>
            <Select.Option value="kid">Kid</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          rules={[{ required: true, message: "Please input the color!" }]}
        >
          <Input type="color" />
        </Form.Item>
        {/* rating */}
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please input the rating!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select the gender!" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Images">
          <UploadImage setFiles={setFiles} urls={urls} setUrls={setUrls} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editProduct ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
