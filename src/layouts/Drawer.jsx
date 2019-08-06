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
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function handleDrawerOpen() {
    setOpen(!open);
  }

  const list = [
    { label: 'Overview', icon: <Explore />, path: '/panel/overview' },
    <Divider/>,
    { label: 'Settings', icon: <SettingsIcon />, path: '/panel/settings' },
    { label: 'Version 0.0.1', icon: <Info />, path: '/panel/about' },
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
        {list.map((item, index) => {
          if(typeof item.label === 'undefined') {
            return (
              <div key={index}>
                {item}
              </div>
            );
          }
          return (
            <ListItem component={CollisionLink} to={item.path} button key={item.label + index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )}
        )}
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
                    <Route path={route.path} key={route.path} render={route.render} exact/>
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