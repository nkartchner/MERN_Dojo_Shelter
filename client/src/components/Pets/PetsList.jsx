import React, { useState, useEffect } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "@reach/router";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";

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

const PetsList = props => {
  const classes = useStyles();

  const [petList, setPetList] = useState([]);
  useEffect(() => {
    getPetList();
  }, []);

  const getPetList = () => {
    const URL = props.shelterId
      ? `http://localhost:8000/api/pets/all/${props.shelterId}`
      : "http://localhost:8000/api/pets/all";
    axios
      .get(URL)
      .then(res => {
        console.log(res);
        setPetList(res.data);
      })
      .catch(err => {
        console.log(
          "something went wrong in PetsList.jsx in the axios call",
          err
        );
      });
  };

  const onDeleteHandler = petId => {
    //   delete pet from pet list
    // reset state without the pet that was deletd
    axios
      .delete(`http://localhost:8000/api/pets/delete/${petId}`)
      .then(res => {
        console.log(res);
        getPetList();
        // const filteredList = petList.filter(p => p._id !== petId);
        // setPetList(filteredList);
      })
      .catch(err => {
        console.log(
          "something went wrong in the axios.delete in PetsList.jsx",
          err
        );
      });
  };

  return (
    <div className={classes.container}>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Pets
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Breed</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Weight</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {petList.map(pet => (
              <TableRow hover key={pet._id}>
                <TableCell component="th" scope="row">
                  {pet.name}
                </TableCell>
                <TableCell align="center">{pet.breed}</TableCell>
                <TableCell align="center">{pet.age}</TableCell>
                <TableCell align="center">{pet.sex}</TableCell>
                <TableCell align="center">{pet.weight}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      onDeleteHandler(pet._id);
                    }}
                    color="secondary"
                    aria-label="delete"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <Link to={`/pets/edit/${pet._id}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  <IconButton color="primary" size="medium">
                    <Link to={`/pets/${pet._id}`}>
                      <InfoIcon />
                    </Link>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default PetsList;
