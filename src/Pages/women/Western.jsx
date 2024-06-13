import { NavLink, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../url";
import ProductLayout from "../../components/ProductLayout";

const Western = () => {
  const query = useLocation().pathname?.split("/");
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        url +
          `/product/get-product?category=${query[1]}&subcategory=${query[2]}`
      )
      .then((res) => setData(res.data.data));
  }, []);
  console.log(data[0].image[0]);
  const prodcuts = data?.map((pro) => (
    <NavLink key={pro._id} to={"./" + pro?._id}>
      <ProductCard
        key={pro.id}
        title={pro.name}
        price={pro.price}
        img={pro?.image[0]}
      />
    </NavLink>
  ));
  return <ProductLayout>{prodcuts}</ProductLayout>;
};

export default Western;
