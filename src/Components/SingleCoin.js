import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Styles from "./component.module.css";
import { CoinState } from "./Context";
import ReactHtmlParser from "html-react-parser";
import { LinearProgress } from "@mui/material";
import HistoricalChart from "./HistoricalChart";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";
const parse = require("html-react-parser");
const SingleCoin = () => {
  const [currency, setcurrency] = useState([]);
  
  let { id } = useParams();
  const {  loading, setloading,  } =
  CoinState();
  useEffect(() => {
    fetchdata();
    
  }, [id]);
  const fetchdata =async()=>{
    setloading(true)
    let res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    res = await res.data;
    setcurrency(res)
    setloading(false)
  }
 
  return (
    <>
    {loading && <LinearProgress style={{ backgroundColor: "gold" }} />}
    <div className={Styles.singleCoin}>
      <div className={Styles.content}>
        <h1>{currency.name}</h1>
      </div>
      <div className={Styles.content}>
        <div className={Styles.content1}>
          <div className={Styles.rank}>
            <h3>Rank #{currency.market_cap_rank}</h3>
            {currency.image ? (
              <img src={currency.image.small} alt="currency"></img>
            ) : null}
          </div>
          <div className={Styles.marketcap}>
            <h2> Market Cap</h2>

            {currency.market_data ? (
              <h3>
                ${" "}
                {currency.market_data.market_cap_change_24h.toLocaleString(
                  "en-us"
                )}
              </h3>
            ) : null}
          </div>
        </div>
      </div>
      <div className={Styles.content1}>
        <table>
          <tr>
            <th>24h</th>
            <th>7d</th>
            <th>14d</th>
            <th>30d</th>
            <th>1y</th>
          </tr>
          <tr>
            {currency.market_data ? (
              <td>{currency.market_data.price_change_percentage_24h}%</td>
            ) : null}
            {currency.market_data ? (
              <td>{currency.market_data.price_change_percentage_7d}%</td>
            ) : null}
            {currency.market_data ? (
              <td>{currency.market_data.price_change_percentage_14d}%</td>
            ) : null}
            {currency.market_data ? (
              <td>{currency.market_data.price_change_percentage_30d}%</td>
            ) : null}
            {currency.market_data ? (
              <td>{currency.market_data.price_change_percentage_1y}%</td>
            ) : null}
          </tr>
        </table>
      </div>
      <div>
        <HistoricalChart/>
      </div>
      <div className={Styles.description}>
        <h1>About</h1>
        {/* <p>{currency.description}</p> */}
        {currency.description ? (
          <p
            style={{
              textAlign: "left",
              justifyContent: "center",
              fontSize: 22,
              lineHeight: 1.5,
            
            }}
          >
            {ReactHtmlParser(currency?.description.en.split(".")[0])}.
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  
  
  </>
  )
};

export default SingleCoin;
