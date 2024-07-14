// import React, { Dispatch, useState, useEffect } from "react";
// import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
// import UploadImage from "./UploadImage";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { db, storage } from "../../../firebase/config";
// import TextArea from "antd/es/input/TextArea";
// import { updateDoc, doc } from "firebase/firestore";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   category: string;
//   description: string;
//   images: string[];
//   color: string;
//   gender: string;
// }

// const EditModal = ({
//   isModalOpen,
//   setIsModalOpen,
//   product,
// }: {
//   isModalOpen: boolean;
//   setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
//   product: Product;
// }) => {
//   const [files, setFiles] = useState<any[]>([]);
//   const [urls, setUrls] = useState<string[]>([]);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.setFieldsValue(product);
//     setFiles(product.images); // Assuming files are already uploaded for editing
//   }, [form, product]);

//   const onFinish = async (values: any) => {
//     try {
//       // Handle file uploads if any change
//       if (files.length > 0) {
//         const uploadPromises = files.map(async (file) => {
//           const storageRef = ref(storage, "products/" + file.name);
//           await uploadBytes(storageRef, file);
//           return getDownloadURL(storageRef);
//         });
//         const newUrls = await Promise.all(uploadPromises);
//         values.images = newUrls;
//       }

//       // Update product in Firestore
//       await updateDoc(doc(db, "products", product.id), values);

//       setIsModalOpen(false);
//       message.success("Product updated successfully");
//     } catch (error) {
//       console.error("Error updating product: ", error);
//       message.error("Failed to update product");
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Edit Product"
//         centered
//         visible={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           size="large"
//           className="flex flex-col gap-3"
//           onFinish={onFinish}
//         >
//           <Form.Item label="Product Name" className="mb-0" name="name">
//             <Input required placeholder="Product Name" />
//           </Form.Item>
//           <Form.Item label="Product Price" className="mb-0" name="price">
//             <Input required min={1} type="number" placeholder="Product Price" />
//           </Form.Item>
//           <Form.Item label="Product Color" className="mb-0" name="color">
//             <Input
//               required
//               type="color"
//               defaultValue={"#000000"}
//               placeholder="Product Color"
//             />
//           </Form.Item>
//           <Form.Item label="Category" className="mb-0" name="category">
//             <Select placeholder="Category" style={{ width: "100%" }}>
//               <Select.Option value="man">Man</Select.Option>
//               <Select.Option value="woman">Woman</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Product Description"
//             className="mb-0"
//             name="description"
//           >
//             <TextArea required placeholder="Product Description" />
//           </Form.Item>
//           <UploadImage setFiles={setFiles} />
//           <Form.Item label="Gender" className="mb-0" name="gender">
//             <Radio.Group>
//               <Radio value={"man"}>Man</Radio>
//               <Radio value={"woman"}>Woman</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             Update Product
//           </Button>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default EditModal;
