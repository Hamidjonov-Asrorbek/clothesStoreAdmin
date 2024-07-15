import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { Button, Form, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductModal from "../../components/ProductModal";
import ProductTable from "../../components/ProductTable";

export default function Products() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [editProduct, setEditProduct] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res: any[] = [];
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });

      setData(res);
      setFilteredData(res);

      const uniqueCategories = Array.from(
        new Set(res.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, data]);

  return (
    <section>
      <div className="">
        <div className="border-b-2 py-4 border-black w-full flex items-center justify-between">
          <Form
            className="flex items-center justify-between gap-5"
            layout="horizontal"
            size="large"
          >
            <Form.Item className="mb-0">
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Select
                placeholder="Category"
                style={{ width: 200 }}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
              >
                <Select.Option value="">All</Select.Option>
                {categories.map((category) => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button>Submit</Button>
          </Form>

          <Button
            size="large"
            type="primary"
            onClick={() => {
              setEditProduct(null);
              setIsModalOpen(true);
            }}
          >
            Create
          </Button>
        </div>
        <ProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editProduct={editProduct}
          setData={setData} // Pass setData to ProductModal
        />
      </div>

      <div>
        <ProductTable
          filterData={filteredData}
          setEditProduct={setEditProduct}
          setIsModalOpen={setIsModalOpen}
          setData={setData} // Pass setData to ProductTable
        />
      </div>
    </section>
  );
}
