import React, { useState, useEffect } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "@reach/router";
import EditIcon from "@material-ui/icons/Edit";
import "./ShelterStyles.css";
import ShelterDeleteDialog from "./ShelterDeleteDialog";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  container: {
    padding: theme.spacing(2)
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const ShelterList = () => {
  const classes = useStyles();
  const [shelterList, setShelterList] = useState([]);
  const [shelterId, setShelterId] = useState(null);
  const [deleteDialogOpen, setDeleteDialog] = useState(false);

  useEffect(() => {
    getShelterList();
  }, []);

  const handleClose = () => {
    setDeleteDialog(false);
  };

  const getShelterList = () => {
    axios
      .get("http://localhost:8000/api/shelters/all")
      .then(res => {
        console.log(res);
        setShelterList(res.data);
      })
      .catch(err => {
        console.log(
          "something went wrong in PetsList.jsx in the axios call",
          err
        );
      });
  };

  const onDeleteHandler = shelterId => {
    //   delete pet from pet list
    // reset state without the pet that was deletd
    setDeleteDialog(true);
    setShelterId(shelterId);
  };
  const confirmedDelete = () => {
    console.log("CONFIRMED");
    setDeleteDialog(false);
    axios
      .delete(`http://localhost:8000/api/shelter/delete/${shelterId}`)
      .then(res => setShelterList(shelterList.filter(s => s._id !== shelterId)))
      .catch(err =>
        console.log(
          "something went wrong in the axios.delete in PetsList.jsx",
          err
        )
      );
  };
  return (
    <div className={classes.container}>
      <ShelterDeleteDialog
        handleClose={handleClose}
        open={deleteDialogOpen}
        confirm={confirmedDelete}
      />
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Shelters
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Pet Count</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shelterList.map(shelter => (
              <TableRow hover className="tableRow" key={shelter._id}>
                <TableCell component="th" scope="row">
                  {shelter.name}
                </TableCell>
                <TableCell align="center">{shelter.phoneNumber}</TableCell>
                <TableCell align="center">{shelter.email}</TableCell>
                <TableCell align="center">{shelter.pets.length}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      onDeleteHandler(shelter._id);
                    }}
                    color="secondary"
                    aria-label="delete"
                  >
                    <DeleteForeverIcon />
                  </IconButton>

                  <Button
                    variant="contained"
                    href={`/pets/all/${shelter._id}`}
                    color="primary"
                  >
                    View Pets
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ShelterList;
