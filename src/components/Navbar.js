import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Fragment, useState } from 'react';

import { Drawer, ListItem, List, ListItemText } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

export default function Navbar() {

  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (x) => (event) => {
    setDrawerOpen(x);
  }

  const itemsList = ["Path finder", "Sorting", "Graphs", "Simulations"];
  const list = (
    <div className={classes.list}
    role="presentation">
      <List>
        {itemsList.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Algo Sight
            </Typography>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor={"left"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list}
        </Drawer>
      </Fragment>
    </div>
  );
}
