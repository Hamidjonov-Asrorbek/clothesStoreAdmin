import React, { Dispatch, useState } from "react";
import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
import UploadImage from "./UploadImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import TextArea from "antd/es/input/TextArea";
import { addDoc, collection } from "firebase/firestore";

const ProductModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const onFinish = async (values: object) => {
    try {
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, "products/" + file.name);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);

      const docRef = await addDoc(collection(db, "products"), {
        ...values,
        images: urls,
      });
      console.log("Document written with ID: ", docRef.id);

      setIsModalOpen(false);
      setUrls([]);
      message.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product: ", error);
      message.error("Failed to add product");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Product"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form size="large" className="flex flex-col gap-3" onFinish={onFinish}>
          <Form.Item label="Product Name" className="mb-0" name="name">
            <Input required placeholder="Product Name" />
          </Form.Item>
          <Form.Item label="Product Price" className="mb-0" name="price">
            <Input required min={1} type="number" placeholder="Product Price" />
          </Form.Item>
          <Form.Item label="Product Color" className="mb-0" name="color">
            <Input
              required
              type="color"
              defaultValue={"#000000"}
              placeholder="Product Color"
            />
          </Form.Item>
          <Form.Item label="Category" className="mb-0" name="category">
            <Select
              placeholder="Category"
              className=""
              style={{ width: "100%" }}
            >
              <Select.Option value="man">Man</Select.Option>
              <Select.Option value="woman">Woman</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Description"
            className="mb-0"
            name="description"
          >
            <TextArea required placeholder="Product Description" />
          </Form.Item>
          <UploadImage setFiles={setFiles} />
          <Form.Item label="Gender" className="mb-0" name="gender">
            <Radio.Group>
              <Radio value={"man"}>Man</Radio>
              <Radio value={"woman"}>Woman</Radio>
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ProductModal;
