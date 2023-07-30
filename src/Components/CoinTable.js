import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import Styles from "./component.module.css";
import { CoinState } from "./Context";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import "./GlobalCssPagination.css";
const CoinTable = () => {
  const navigate = useNavigate();
  const { coin, setcoin, loading, setloading, searchinput, setsearch } =
    CoinState();
  const [currentpage, Setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(10);
  const indexoflastpost = currentpage * postperpage;
  const indexoffirstpost = indexoflastpost - postperpage;
  const currentPost = coin.slice(indexoffirstpost, indexoflastpost);
  const handlesearch = () => {
    return coin.filter((c) =>
      c.name.toLowerCase().match(searchinput.toLowerCase())
    );
  };
  handlesearch();
  console.log(loading)
  return (
    <div>
      <Container>
        {/* <div className={Styles.coincontainer}>
          <p>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p>Volume</p>
          <p>Mkt Cap</p>
        </div> */}

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            // <Link to="/" style={{ textDecoration: "none", width: "100vw" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#ffd700" }}>
                  <TableCell>Coin</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">24h Change</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">Market Cap</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {handlesearch()
                  .slice(indexoffirstpost, indexoflastpost)
                  .map((coin) => (
                    <TableRow
                      style={{ backgroundColor: "black", cursor: "pointer" }}
                      onClick={() => navigate(`/coin/${coin.id}`)}
                    >
                      <TableCell align="left" style={{ color: "white" }}>
                        <div className={Styles.coincontainer}>
                          <img
                            src={coin.image}
                            alt={coin.name}
                            style={{ height: 40 }}
                          ></img>
                          {coin.name}
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{ color: "white" }}>
                        $ {coin.current_price.toLocaleString("en-us")}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color:
                            coin.price_change_percentage_24h > 0
                              ? "rgb(14, 203, 129)"
                              : "red",
                        }}
                      >
                        {coin.price_change_percentage_24h > 0
                          ? `+ ${coin.price_change_percentage_24h}`
                          : coin.price_change_percentage_24h}
                      </TableCell>
                      <TableCell align="right" style={{ color: "white" }}>
                        $ {coin.total_volume.toLocaleString("en-us")}
                      </TableCell>
                      <TableCell align="right" style={{ color: "white" }}>
                        $ {coin.market_cap.toLocaleString("en-us")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            // </Link>
          )}
        </TableContainer>
        <Pagination
          count={(coin?.length / 10).toFixed(0)}
          onChange={(_, value) => Setcurrentpage(value)}
          variant="outlined"
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Container>
    </div>
  );
};

export default CoinTable;
