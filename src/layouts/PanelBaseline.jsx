import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Explore from "@material-ui/icons/ExploreOutlined";
import Info from "@material-ui/icons/InfoOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import UsersIcon from "@material-ui/icons/PeopleOutlineOutlined";
import ChevronDown from "@material-ui/icons/KeyboardArrowDown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MainAppbar from "./Appbar";
import { Switch, Route } from "react-router";
import About from "../pages/About";
import Settings from "../pages/Settings";
import Collapse from "@material-ui/core/Collapse";
import { ListItemSecondaryAction } from "@material-ui/core";
import NotFound from "../pages/NotFound";
import Item from "../pages/Item";
import CollisionLink from "../components/CollisionLink";
import Welcome from "../pages/Welcome";
import { withStyles, withTheme } from "@material-ui/styles";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    "& .mini-expand-icon": {
      opacity: 1
    },
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth
    }
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: theme.spacing(7) + 1,
    "& .mini-expand-icon": {
      opacity: 0
    },
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth
    },
    "&:hover": {
      width: drawerWidth,
      "& .nestedMini": {
        paddingLeft: "1rem"
      },
      "& .mini-expand-icon": {
        opacity: 1
      }
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    padding: 8
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(3)
  },
  menuItemText: {
    whiteSpace: "nowrap"
  },
  listItemIcon: {
    minWidth: 40
  },
  menuItem: {
    borderRadius: "2rem",
    marginTop: 2
  },
  currentOpenMenuStyleOn: {
    backgroundColor: "#e3e3e3"
  },
  nestedMenu: {
    paddingLeft: "1rem",
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  nestedMenuMini: {
    paddingLeft: "0rem"
  },
  listItemIconExpand: {
    transition:
      theme.transitions.create("transform", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }) +
      " , " +
      theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),

    transform: "rotate(0deg)"
  },
  listItemIconExpandOpen: {
    transform: "rotate(180deg)"
  },
  hidden: {
    display: "none"
  },
  list: {
    paddingTop: "unset",
    paddingBottom: "unset"
  }
});

const list = [
  {
    label: "Overview",
    icon: <Explore />,
    path: "",
    children: [
      {
        label: "Item 1",
        icon: <SettingsIcon />,
        path: "",
        children: [
          { label: "Item 3", icon: <SettingsIcon />, path: "/panel/item3" },
          { label: "Item 4", icon: <SettingsIcon />, path: "/panel/item4" }
        ]
      },
      { label: "Item 2", icon: <SettingsIcon />, path: "/panel/item2" }
    ]
  },
  {
    label: "Users",
    icon: <UsersIcon />,
    path: "",
    children: [
      {
        label: "List all users",
        icon: <ListIcon />,
        path: "/panel/users/list"
      },
      { label: "Add new user", icon: <AddIcon />, path: "/panel/users/add" }
    ]
  },
  <Divider />,
  {
    label: "Settings",
    icon: <SettingsIcon />,
    path: "",
    children: [
      { label: "General", icon: <ListIcon />, path: "/panel/settings/general" }
    ]
  },
  { label: "Version 0.0.1", icon: <Info />, path: "/panel/about", children: [] }
];

const panelRoutes = {
  Main: [
    {
      title: "Welcome",
      path: "/panel",
      render: props => <Welcome number={2} {...props} />
    },
    {
      title: "Item 2",
      path: "/panel/item2",
      render: props => <Item number={2} {...props} />
    },
    {
      title: "Item 3",
      path: "/panel/item3",
      render: props => <Item number={3} {...props} />
    },
    {
      title: "Item 4",
      path: "/panel/item4",
      render: props => <Item number={4} {...props} />
    },
    {
      title: "List all users",
      path: "/panel/users/list",
      render: props => <Item number={"List all users"} {...props} />
    },
    {
      title: "Add new user",
      path: "/panel/users/add",
      render: props => <Item number={"Add new user"} {...props} />
    },
    {
      title: "Settings",
      path: "/panel/settings",
      render: props => <Settings {...props} />
    },
    {
      title: "About",
      path: "/panel/about/",
      render: props => <About {...props} />
    }
  ]
};

function calculateDescendants(children) {
  let descendants = {};
  children.forEach((element, index) => {
    index += 1;
    descendants[element.label + index] = element;
    if (typeof element.children !== "undefined") {
      if (element.children.length > 0) {
        descendants = {
          ...descendants,
          ...calculateDescendants(element.children)
        };
      }
    }
  });
  return descendants;
}

class PanelBaseline extends React.Component {
  state = {
    mobileDrawerOpen: false,
    extendedMode: true,
    currentOpenMenu: false
  };
  renderMenu(list, parents) {
    const { classes } = this.props;
    const { mobileDrawerOpen, extendedMode, currentOpenMenu } = this.state;

    return list.map((item, index) => {
      if (typeof item.label === "undefined") {
        return <div key={index}>{item}</div>;
      }
      index += 1;
      let key = item.label + index;
      const parent_id = [...parents, key];
      if (typeof item.children !== "undefined") {
        if (item.children.length > 0) {
          // calculate if any Descendants is open
          let listOpen = currentOpenMenu === key;
          if (!listOpen) {
            let list = calculateDescendants(item.children);
            Object.keys(list).map(current => {
              if (listOpen) {
                return;
              }
              listOpen = current === currentOpenMenu;
            });
          }
          let parent = parent_id[parent_id.indexOf(key) - 1];
          if (typeof parent === "undefined") {
            parent = "";
          }
          let open = listOpen ? parent : key;
          return (
            <List className={classes.list} key={key}>
              <ListItem
                className={`${classes.menuItem} ${
                  listOpen ? classes.currentOpenMenuStyleOn : null
                }`}
                button
                key={key}
                onClick={() => this.setCurrentOpenMenu(open)}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className={classes.menuItemText}
                  primary={item.label}
                />
                <ListItemSecondaryAction>
                  <ChevronDown
                    className={`${classes.listItemIconExpand} ${
                      listOpen ? classes.listItemIconExpandOpen : ""
                    } mini-expand-icon ${extendedMode ? "open" : null}`}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={listOpen} timeout="auto" unmountOnExit>
                <List
                  className={`${classes.list} ${classes.nestedMenu} ${
                    extendedMode ? null : `${classes.nestedMenuMini} nestedMini`
                  }`}
                >
                  {this.renderMenu(item.children, parent_id)}
                </List>
              </Collapse>
            </List>
          );
        }
      }
      return (
        <ListItem
          component={CollisionLink}
          to={item.path}
          button
          key={key}
          onClick={() => {
            this.setCurrentOpenMenu(parent_id[parent_id.length - 1]);
          }}
          className={classes.menuItem}
        >
          <ListItemIcon className={classes.listItemIcon}>
            {item.icon}
          </ListItemIcon>
          <ListItemText className={classes.menuItemText} primary={item.label} />
        </ListItem>
      );
    });
  }
  toggleextendedMode = () => {
    this.setState({
      extendedMode: !this.state.extendedMode
    });
  };
  setCurrentOpenMenu = currentOpenMenu => {
    this.setState({
      currentOpenMenu
    });
  };
  handleDrawerToggle = () => {
    this.setState({
      mobileDrawerOpen: !this.state.mobileDrawerOpen
    });
  };
  render() {
    const { classes, container, theme } = this.props;
    const { mobileDrawerOpen, extendedMode } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{this.renderMenu(list, [""])}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        <MainAppbar
          setMini={this.toggleextendedMode}
          mini={extendedMode}
          className={classes.appBar}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileDrawerOpen}
            onClose={this.handleDrawerToggle}
            className={extendedMode ? classes.drawerOpen : classes.drawerClose}
            classes={{
              paper: extendedMode ? classes.drawerOpen : classes.drawerClose
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={extendedMode ? classes.drawerOpen : classes.drawerClose}
            classes={{
              paper: extendedMode ? classes.drawerOpen : classes.drawerClose
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {Object.keys(panelRoutes).map(group => {
              return panelRoutes[group].map(route => {
                return (
                  <Route
                    path={route.path}
                    key={"panel-route-" + route.path}
                    component={route.render}
                    exact
                  />
                );
              });
            })}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

const PanelBaselineWithTheme = withTheme(PanelBaseline);

export default withStyles(styles)(PanelBaselineWithTheme);
