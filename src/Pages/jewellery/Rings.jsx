import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { url } from "../../url";
import ProductCard from "../../components/ProductCard";
import ProductLayout from "../../components/ProductLayout";
const Rings = () => {
  const query = useLocation().pathname?.split("/");
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        url +
          `/product/get-product?category=${query[1]}&subcategory=${query[2]}&subsubcategory=${query[3]}`
      )
      .then((res) => setData(res.data.data));
  }, []);

  console.log(data);

  const prodcuts = data?.map((pro) => (
    <NavLink key={pro._id} to={"./" + pro?._id}>
      <ProductCard key={pro.id} title={pro.name} price={pro.price} />
    </NavLink>
  ));
  return <ProductLayout>{prodcuts}</ProductLayout>;
};

export default Rings;
