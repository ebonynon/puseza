import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components //papapap
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function MainPage(props) {
  const classes = useStyles();
  const part = props.part;

  function createData(_id, title, isbn, author, description, published_date, publisher, updated_date) {
    return { _id, title, isbn, author, description, published_date, publisher, updated_date };
  }

  const rows = [
    createData(
      `${part._id}`,
      `${part.title}`,
      `${part.isbn}`,
      `${part.author}`,
      `${part.description}`,
      `${part.published_date}`,
      `${part.publisher}`,
      `${part.updated_date}`
    ),
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
                    <TableCell align="left">{row._id}</TableCell>
                    <TableCell align="left">{row.updated_date}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.isbn}</TableCell>
                    <TableCell align="left">{row.author}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="leftt">{row.published_date}</TableCell>
                    <TableCell align="left">{row.publisher}</TableCell>
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

export default function App(props) {
  const [ResData, setResData] = useState([]);

  useEffect(() => {
    function fetchPart() {
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
    fetchPart();
  }, []);

  console.log("XX :: ", ResData);

  var CardSectionList;

  if (!ResData) {
    CardSectionList = "Part is not availabe";
  } else {
    CardSectionList = ResData.map((book) => (
      <MainPage part={book} key={book._id} />
    ));
  }

  return <div> {CardSectionList} </div>;
}
