import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, Route, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import Survey from "./survey"
import Chart from "./chart"

export function App(props) {
  let history = useHistory();
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        history.push("/");
      }
    });

    return unsubscribe;
  }, [history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            Health Tracker
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List>
          <ListItem onClick={() => {history.push("/app/survey"); setDrawerOpen(false)}} button>
            <ListItemText primary="Take Survey" />
          </ListItem>
          <ListItem onClick={() => {history.push("/app/chart"); setDrawerOpen(false)}} button>
            <ListItemText primary="Chart" />
          </ListItem>          
        </List>
      </Drawer>
        <Route path="/app/survey">
          <Survey user={user} />
        </Route>
        <Route path="/app/chart">
          <Chart user={user} />
        </Route>  
    </div>
  );
}
