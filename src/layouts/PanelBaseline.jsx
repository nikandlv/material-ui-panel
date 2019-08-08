import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Explore from '@material-ui/icons/ExploreOutlined';
import Info from '@material-ui/icons/InfoOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AddIcon from '@material-ui/icons/AddBoxOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import UsersIcon from '@material-ui/icons/PeopleOutlineOutlined'
import ChevronDown from '@material-ui/icons/KeyboardArrowDown'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MainAppbar from './Appbar';
import { Switch, Route } from 'react-router'
import About from '../pages/About';
import Settings from '../pages/Settings';
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import { ListItemSecondaryAction } from '@material-ui/core';
import NotFound from '../pages/NotFound';
import Item from '../pages/Item';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
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
    },
    [theme.breakpoints.down('xs')]: {
      width: drawerWidth,
    },
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
    [theme.breakpoints.down('xs')]: {
      width: drawerWidth,
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
  currentOpenMenuStyleOn: {
    backgroundColor: '#e3e3e3',
  },
  currentOpenMenuStyleOff: {

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
  },
  list: {
    paddingTop:'unset',
    paddingBottom:'unset'
  }
}));

const list = [
  { label: 'Overview', icon: <Explore />, path: '', children: [
    { label: 'Item 1', icon: <SettingsIcon />, path: '', children: [
      { label: 'Item 3', icon: <SettingsIcon />, path: '/panel/item3' },  
      { label: 'Item 4', icon: <SettingsIcon />, path: '/panel/item4' },
    ]
   },  
    { label: 'Item 2', icon: <SettingsIcon />, path: '/panel/item2' },
  ] },
  { label: 'Users', icon: <UsersIcon />, path: '', children: [
    { label: 'List', icon: <ListIcon />, path: '/panel/users/list' },  
    { label: 'Add', icon: <AddIcon />, path: '/panel/users/add' },
  ] },
  <Divider/>,
  { label: 'Settings', icon: <SettingsIcon />, path: '/panel/settings', children: [] },
  { label: 'Version 0.0.1', icon: <Info />, path: '/panel/about', children: [] },
]

const panelRoutes = {
  Main: [
    { title: 'Item 2', path: '/panel/item2', render: props => <Item number={2} {...props}/> },
    { title: 'Item 3', path: '/panel/item3', render: props => <Item number={3} {...props}/> },
    { title: 'Item 4', path: '/panel/item4', render: props => <Item number={4} {...props}/> },
    { title: 'Settings', path: '/panel/settings', render: props => <Settings {...props}/> },
    { title: 'About', path: '/panel/about', render: props => <About {...props}/> }
  ]
}

const appbarActions = () => {
  return (
    <React.Fragment>
      <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
    </React.Fragment>
  )
};

const panelGlobals = () => {
  return (
    <div>
    </div>
  )
}

function calculateDescendants(children) {
  let descendants = {};
  children.forEach((element,index) => {
    index += 1
    descendants[element.label + index] = element;
    if(typeof element.children !== 'undefined') {
      if(element.children.length > 0) {
        descendants = {...descendants,...calculateDescendants(element.children)};
      }
    }
  });
  return descendants;
}

function PanelBaseline(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniModeOpen, setMiniModeOpen] = React.useState(true);
  const [currentOpenMenu, setCurrentOpenMenu] = React.useState('');
  const [title, setTitle] = React.useState('Not found');
  const [firstRender, setFirstRender] = React.useState(true)
  const location = window.location.pathname
  Object.keys(panelRoutes).map((group_key) => {
    return panelRoutes[group_key].forEach(route => {
      if(location === route.path && title !== route.title) {
        setTitle(route.title)
      }
    });
  });
  
  React.useEffect(() => {
    document.title = title;
  }, [title])
  if(firstRender) {
    if(currentOpenMenu === '') {
      list.map((item, index) => {
        let list = calculateDescendants([item])
        Object.keys(list).map((current) => {
          if(typeof list[current].path !== 'undefined') {
            let route = list[current];
            if(location === route.path && currentOpenMenu !== current) {
              setCurrentOpenMenu(current)
            }
          }
        })
      })
    }
   setFirstRender(false)
  }
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function openNestedMenu(parent_id,key) {
    if(parent_id === '' && currentOpenMenu !== '') {
      return setCurrentOpenMenu('')
    }
    if(key === currentOpenMenu) {
      return setCurrentOpenMenu(parent_id)
    }
    setCurrentOpenMenu(key)
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
            let listOpen = currentOpenMenu === (key)
            // calculate if any Descendants is open
            if(!listOpen) {              
              let list = calculateDescendants(item.children)
              Object.keys(list).map((current) => {
                if(listOpen) {
                  return
                }
                listOpen = current === currentOpenMenu
              })
            }
              return (
                <List className={classes.list} key={key}>
                  <ListItem className={listOpen ? classes.currentOpenMenuStyleOn : classes.currentOpenMenuStyleOff} button key={key} onClick={() => openNestedMenu(parent_id,key)}>
                    <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                    <ListItemText  className={classes.menuItemText} primary={item.label} />
                    <ListItemSecondaryAction>
                      <ChevronDown className={`${classes.listItemIconExpand} ${(listOpen ? classes.listItemIconExpandOpen : '')} mini-expand-icon ${miniModeOpen? 'open' : null}`}/>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse in={listOpen} timeout="auto" unmountOnExit>
                    <List className={`${classes.list} ${classes.nestedMenu} ${(miniModeOpen)? null : `${classes.nestedMenuMini} nestedMini`}`}>
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
          <ListItem  component={CollisionLink} to={item.path} button key={key} onClick={() => {
            setCurrentOpenMenu(parent_id)
            setTitle('')
          }}>
            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText  className={classes.menuItemText} primary={item.label} />
          </ListItem>
        )}
      )
  }

  function handleDrawerOpen() {
    setMiniModeOpen(!miniModeOpen);
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
      {[panelGlobals].map((Item,index) => <Item key={index} />)}
      <MainAppbar appbarActions={[appbarActions]} setMini={handleDrawerOpen} mini={miniModeOpen} className={classes.appBar} handleDrawerToggle={handleDrawerToggle} />
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            className={miniModeOpen?classes.drawerOpen:classes.drawerClose}
            classes={{
                paper: miniModeOpen?classes.drawerOpen:classes.drawerClose,
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
            className={miniModeOpen?classes.drawerOpen:classes.drawerClose}
            classes={{
                paper: miniModeOpen?classes.drawerOpen:classes.drawerClose,
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


export default PanelBaseline;