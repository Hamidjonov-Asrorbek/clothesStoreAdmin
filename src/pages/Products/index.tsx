import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
export default function Products() {
  const [data, setData] = useState<any[]>([]);
  console.log(data);

  useEffect(() => {
    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));
      const res: any[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        res.push({ id: doc.id, ...doc.data() });
      });

      setData(res);
    }
    getProducts();
  }, []);
  return <div>Products</div>;
}
