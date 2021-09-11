import React, { useState, useEffect } from "react";
import axios from "axios";

import Items from "./Items";

const ShopView = () => {

  const [shop, setShop] = useState([]);

  useEffect(() => {
      let mounted = true;
      if (mounted) {
          axios.get("http://fakestoreapi.com/products/").then((res) => {
              let data = res.data;
              setShop(data);
          });
      }
      return () => (mounted = false);
  }, []);


  let showItem = shop.length > 0 ? (
    <div className="flex flex-row flex-wrap justify-around">
        {shop.map((item) => {
            const {id} = item;
            return <Items key={id} item = {item}/>;
        })}
    </div>
  ) : (
      <div className="text-center">...Loading</div>
  );


  return (
      <div className="shop-container">
          <div className="text-center ">Item List</div>
          {showItem}
      </div>
  )
};

export default ShopView;
