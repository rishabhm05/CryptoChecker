import React from "react";
import TextField from "@mui/material/TextField";
import Styles from "./component.module.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import "./GlobalCssPagination.css";
import { CoinState } from "./Context";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    multilineColor: {
      color: "#fff",
    },
    type: "dark",
  },
});
const Search = () => {
  const { coin, setcoin, loading, setloading, searchinput, setsearch } =
    CoinState();

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            placeholder="Search For a Crypto Currency.."
            focused
            inputProps={{ className: Styles.input }}
            onChange={(e) => setsearch(e.target.value)}
            style={{
              marginBottom: 40,
              width: "100%",
              marginTop: 50,
              color: "#fff",
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Search;
