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
        .get("https://anjinz-api.vercel.app/api/parts/" + props.match.params.id)
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

  const share = async () => {
    try {
      await navigator.share({
        title: `${ResData.part_number}`,
        text: `${ResData.part_name}`,
        url: `/part/${ResData._id}`,
      });
      console.log("Thanks for sharing!");
    } catch (err) {
      console.log(`Couldn't share because of`, err);
    }
  };

  function createData(prop, val) {
    return { prop, val };
  }

  const rows = [
    createData("OEM part number", `${ResData.part_number}`),
    createData("Part name", `${ResData.part_name}`),
    createData("Brand", `${ResData.brand}`),
    createData("Modle", `${ResData.modle}`),
    createData("Applicability", `${ResData.applicability}`),
    createData("Production period", `${ResData.production_period}`),
    createData("Base price", `${ResData.base_price}`),
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
