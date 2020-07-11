import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
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

  function createData(prop, val) {
    return { prop, val };
  }

  const rows = [
    createData("title", `${part.title}`),
    createData("isbn", `${part.isbn}`),
    createData("author", `${part.author}`),
    createData("description", `${part.description}`),
    createData("published_date", `${part.published_date}`),
    createData("publisher", `${part.publisher}`),
    createData("updated_date", `${part.updated_date}`),
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

  return (<div> {CardSectionList} </div>);
}
