import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Explore from '@material-ui/icons/ExploreOutlined';
import Info from '@material-ui/icons/InfoOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ChevronDown from '@material-ui/icons/KeyboardArrowDown'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PrimarySearchAppBar from './Appbar';
import { Switch, Route } from 'react-router'
import About from '../pages/About';
import Settings from '../pages/Settings';
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import { ListItemSecondaryAction } from '@material-ui/core';
import NotFound from '../pages/NotFound';
import Item from '../pages/Item';
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
    '& .mini-expand-icon': {
      opacity: 1,
    }
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    width: theme.spacing(7) + 1,
    '& .mini-expand-icon': {
      opacity: 0,
    },
    '&:hover': {
      width: drawerWidth,
      '& .nestedMini': {
        paddingLeft: '1rem'
      },
      '& .mini-expand-icon': {
        opacity: 1,
      }
    }
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
    paddingLeft: '1rem',
    transition: theme.transitions.create('padding-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  nestedMenuMini: {
    backgroundColor: '#e3e3e3',
    paddingLeft: '0rem'
  },
  listItemIconExpand: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }) + " , " + theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    transform: 'rotate(0deg)',
  },
  listItemIconExpandOpen: {
    transform: 'rotate(180deg)',
  },
  hidden : {
    display: 'none'
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

  function openNestedMenu(parent_id,key) {
    if(key === openMenu) {
      return setOpenMenu(parent_id)
    }
    setOpenMenu(key)
  }

  function calculateDescendants(children) {
    let descendants = [];
    children.forEach((element,index) => {
      index += 1
      descendants.push(element.label + index);
      if(typeof element.children !== 'undefined') {
        if(element.children.length > 0) {
          descendants = [...descendants,...calculateDescendants(element.children)];
        }
      }
    });
    return descendants;
  }
  function renderMenu(list, parent_id) {
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
                <List key={key}>
                  <ListItem className={listOpen ? classes.openMenuStyleOn : classes.openMenuStyleOff} button key={key} onClick={() => openNestedMenu(parent_id,key)}>
                    <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                    <ListItemText  className={classes.menuItemText} primary={item.label} />
                    <ListItemSecondaryAction>
                    <ChevronDown className={`${classes.listItemIconExpand} ${(listOpen ? classes.listItemIconExpandOpen : '')} mini-expand-icon ${open? 'open' : null}`}/>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse in={listOpen} timeout="auto" unmountOnExit>
                    <List className={`${classes.nestedMenu} ${(open)? null : `${classes.nestedMenuMini} nestedMini`}`}>
                      {
                        renderMenu(item.children, key)
                      }
                    </List>
                  </Collapse>
                </List>  
            )
          }
        }
        return (
          <ListItem  component={CollisionLink} to={item.path} button key={key} >
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
    { label: 'Overview', icon: <Explore />, path: '', children: [
      { label: 'Item 1', icon: <SettingsIcon />, path: '', children: [
        { label: 'Item 3', icon: <SettingsIcon />, path: '/panel/item3' },  
        { label: 'Item 4', icon: <SettingsIcon />, path: '/panel/item4' },
      ]
     },  
      { label: 'Item 2', icon: <SettingsIcon />, path: '/panel/item2' },
    ] },
    <Divider/>,
    { label: 'Settings', icon: <SettingsIcon />, path: '/panel/settings', children: [] },
    { label: 'Version 0.0.1', icon: <Info />, path: '/panel/about', children: [] },
  ]

  const panelRoutes = {
    Main: [
      {  path: '/panel/item2', render: props => <Item number={2} {...props}/> },
      {  path: '/panel/item3', render: props => <Item number={3} {...props}/> },
      {  path: '/panel/item4', render: props => <Item number={4} {...props}/> },
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
            renderMenu(list, '')
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
            <Route component={NotFound}/>
          </Switch>
      </main>
    </div>
  );
}


export default ResponsiveDrawer;