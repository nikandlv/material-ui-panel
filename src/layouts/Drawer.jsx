import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Explore from '@material-ui/icons/ExploreOutlined';
import Info from '@material-ui/icons/InfoOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PrimarySearchAppBar from './Appbar';
import { Switch, Route } from 'react-router'
import Overview from '../pages/Overview'
import About from '../pages/About';
import Settings from '../pages/Settings';
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  menuItemText: {
    whiteSpace: 'nowrap'
  },
  listItemIcon: {
    minWidth: 40
  },
  openMenuStyleOn: {
    backgroundColor: '#e3e3e3',
  },
  openMenuStyleOff: {

  },
  nestedMenu: {
    backgroundColor: '#e3e3e3',
    paddingLeft: '1rem'
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState('');
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function calculateDescendants(children) {
    let descendants = [];
    children.forEach((element,index) => {
      index += 1
      descendants.push(element.label + index);
      if(typeof element.children !== 'undefined') {
        if(element.children.length > 0) {
          descendants = [...descendants,calculateDescendants(element.children)];
        }
      }
    });
    return descendants;
  }

  function renderMenu(list, level = 1) {
    return list.map((item, index) => {
        if(typeof item.label === 'undefined') {
          return (
            <div key={index}>
              {item}
            </div>
          );
        }
        index += 1;
        let key = item.label + index
        if(typeof item.children !== 'undefined') {
          if(item.children.length > 0) {
            let listOpen = openMenu === (key)
            // calculate if any Descendants is open
            if(!listOpen) {              
              let list = calculateDescendants(item.children)
              listOpen = list.filter((item) => item === openMenu).length > 0
            }
            return (
                <List key={item.label + index}>
                  <ListItem className={listOpen ? classes.openMenuStyleOn : classes.openMenuStyleOff} component={CollisionLink} to={item.path} button key={key} onClick={() => setOpenMenu(key)}>
                    <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                    <ListItemText  className={classes.menuItemText} primary={item.label} />
                  </ListItem>
                  <Collapse in={listOpen} timeout="auto" unmountOnExit className={classes.nestedMenu}>
                    {
                      renderMenu(item.children)
                    }
                  </Collapse>
                </List>  
            )
          }
        }
        return (
          <ListItem  component={CollisionLink} to={item.path} button key={key} onClick={() => setOpenMenu(key)} >
            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText  className={classes.menuItemText} primary={item.label} />
          </ListItem>
        )}
      )
  }

  function handleDrawerOpen() {
    setOpen(!open);
  }

  const list = [
    { label: 'Overview', icon: <Explore />, path: '/panel/overview', children: [
      { label: 'Item 1', icon: <SettingsIcon />, path: '/panel/settings/item1' },  
      { label: 'Item 2', icon: <SettingsIcon />, path: '/panel/settings/item2' },
    ] },
    <Divider/>,
    { label: 'Settings', icon: <SettingsIcon />, path: '/panel/settings', children: [] },
    { label: 'Version 0.0.1', icon: <Info />, path: '/panel/about', children: [] },
  ]

  const panelRoutes = {
    Main: [
      {  path: '/panel/overview', render: props => <Overview {...props}/> },
      {  path: '/panel/settings', render: props => <Settings {...props}/> },
      {  path: '/panel/about', render: props => <About {...props}/> }
    ]
  }
  const CollisionLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          {
            renderMenu(list)
          }
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <PrimarySearchAppBar setMini={handleDrawerOpen} mini={open} className={classes.appBar} handleDrawerToggle={handleDrawerToggle} />
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            className={open?classes.drawerOpen:classes.drawerClose}
            classes={{
                paper: open?classes.drawerOpen:classes.drawerClose,
              }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={open?classes.drawerOpen:classes.drawerClose}
            classes={{
                paper: open?classes.drawerOpen:classes.drawerClose,
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
            {
              Object.keys(panelRoutes).map((group) => {
                return panelRoutes[group].map((route) => {
                  return (
                    <Route path={route.path} key={'panel-route-' + route.path} render={route.render} exact/>
                  )
                })
              }) 
            }
          </Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.object,
};

export default ResponsiveDrawer;