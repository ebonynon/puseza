import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//#import TextField from "@material-ui/core/TextField";
//import Button from "@material-ui/core/Button";
//import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
//import Lightbox from "react-image-lightbox";
// @material-ui/icons
//import ShareIcon from "@material-ui/icons/Share";
// core components

//import "react-image-lightbox/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function App(props) {
  const classes = useStyles();
  const [ResData, setResData] = useState([]);
  const [Image, setImage] = React.useState({ isOpen: false });
  const { isOpen } = Image;

  useEffect(() => {
    function fetchPart(props) {
      axios
        .get("https://mern-01.now.sh/api/books")
        .then((res) => {
          console.log("Print-ShowPartSection-API-response: " + res.data);
          setResData(res.data);
        })
        .catch((err) => {
          console.log("Error from ShowPartSection");
        });
    }
    fetchPart(props);
  }, []);

  function createData(prop, val) {
    return { prop, val };
  }

  const rows = [
    createData("title", `${ResData.title}`),
    createData("isbn", `${ResData.isbn}`),
    createData("author", `${ResData.author}`),
    createData("description", `${ResData.description}`),
    createData("published_date", `${ResData.published_date}`),
    createData("publisher", `${ResData.publisher}`),
    createData("updated_date", `${ResData.updated_date}`),
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="part table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="left">{row.prop}</TableCell>
                    <TableCell align="right">{row.val}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
