import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Coin = createContext();
const Context = ({ children }) => {
  const [coin, setcoin] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchinput, setsearch] = useState("");
  useEffect(() => {
   fetchdata()
  }, []);
  const fetchdata =async()=>{
    setloading(true)
    let res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`)
    res = await res.data;
    setcoin(res)
    setloading(false)
  }

  return (
    <Coin.Provider
      value={{ coin, setcoin, loading, setloading, searchinput, setsearch }}
    >
      {children}
    </Coin.Provider>
  );
};

export default Context;
export const CoinState = () => {
  return useContext(Coin);
};
