import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "@reach/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome to the Dojo Pet Shelter!
          </Typography>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleMenu}
              color="inherit"
              aria-haspopup="true"
              aria-controls="menu-appbar"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <Link className={classes.link} to="/register">
                <MenuItem onClick={handleClose}>Register</MenuItem>
              </Link>
              <Link className={classes.link} to="/pets/all">
                <MenuItem onClick={handleClose}>Pets</MenuItem>
              </Link>
              <Link className={classes.link} to="/pets/add">
                <MenuItem onClick={handleClose}>Add A Pet</MenuItem>
              </Link>
              <Link className={classes.link} to="/shelters/all">
                <MenuItem onClick={handleClose}>Shelters</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
