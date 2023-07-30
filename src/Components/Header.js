import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./component.module.css";
// const useStyle = makeStyles({
//   root: {
//     "&:hover": {
//       backgroundColor: "transparent",
//     },
//   },
// });
const Header = () => {
  return (
    <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" className={styles.title}>
                Crypto Tracker
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Link>
    </div>
  );
};

export default Header;
