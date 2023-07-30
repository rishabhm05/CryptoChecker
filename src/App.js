import React ,{ lazy,Suspense } from "react";
import { makeStyles } from "@mui/material";
import "./App.css";
import Header from "./Components/Header";

import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { LinearProgress } from "@mui/material";
const Search = lazy(()=>import("./Components/Search"))
const CoinTable = lazy(()=>import("./Components/CoinTable"))
const Banner =lazy(()=>import("./Components/Banner"))
const SingleCoin = lazy(()=>import("./Components/SingleCoin"))

function App() {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={ <LinearProgress style={{ backgroundColor: "gold" }} />}>
      <Routes>
       
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Search />
              <CoinTable />
            </>
          }
        />

        <Route path="/coin/:id" element={<SingleCoin />}></Route>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
