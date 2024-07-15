import ProductStatistic from "../../components/Statistic";
import { db } from "../../../firebase/config";

console.log(db);

export default function Dashboard() {
  return <ProductStatistic />;
}
