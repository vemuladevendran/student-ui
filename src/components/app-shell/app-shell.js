import { React, useState, useEffect } from 'react';
import ss from './app-shell.module.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { menuItems } from './sidenav-menu';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import TokenServe from '../../service/token';
import Students from '../student/student';
import AddEditStudent from '../student/add-edit-student/add-edit-student';
import ViewStudent from '../student/view-student/view-student';
import Users from '../users/user';
import AddUser from '../users/add-user/add-user';
import AddCircular from '../circular/add-circular';

const drawerWidth = 240;

//  app-shell styles
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor: '#70b0ed'
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    // getting token data
    const getTokenData = () => {
        const token = TokenServe.getToken();
        return (TokenServe.getTokenPayloadData(token));
    }

    useEffect(() => {
        const data = getTokenData();
        setIsAdmin(data.isAdmin);
    }, []);


    const logOut = () => {
        TokenServe.removeToken();
        props.setLoggedIn(false);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <img src="/assets/logo.png" alt="logo" />
            </div>
            <Divider />
            {/* mobile screen */}
            <List>
                {
                    menuItems.map((item, index) => {
                        const isAdminRoute = (isAdmin === 'true' && item.acl === 'admin');

                        if (item.acl === 'all' || isAdminRoute) {
                            return (
                                <div key={index}>
                                    <NavLink to={item.path} className={`${ss.nav_link} d-md-none`} activeClassName="active_nav_item" exact onClick={handleDrawerToggle}>
                                        <ListItem button key={item.text}>
                                            <ListItemIcon><Icon style={{ fontSize: 30 }}>{item.icon}</Icon></ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItem>
                                    </NavLink>
                                </div>
                            )
                        }

                        return null;
                    })
                }
            </List>

            {/* desktop screen */}
            <List>
                {
                    menuItems.map((item, index) => {
                        const isAdminRoute = (isAdmin === 'true' && item.acl === 'admin');

                        if (item.acl === 'all' || isAdminRoute) {
                            return (
                                <div key={index}>
                                    <NavLink to={item.path} className={`${ss.nav_link} d-none d-md-block`} activeClassName="active_nav_item" exact>
                                        <ListItem button key={item.text}>
                                            <ListItemIcon><Icon style={{ fontSize: 30 }}>{item.icon}</Icon></ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItem>
                                    </NavLink>
                                </div>
                            )
                        }

                        return null;
                    })
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="d-flex justify-content-between">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />

                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>

                    {/* acount profile */}
                    <div className="btn-group" role="group">
                        <span id="btnGroupDrop1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <AccountCircle edge="end" />
                        </span>
                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <li>
                                <div className="dropdown-item my-2">
                                    <NavLink className="text-decoration-none" to="/">Update Password</NavLink>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown-item my-2 text-center">
                                    <button type="button" className="btn btn-primary" onClick={logOut}>LogOut</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
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
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            {/* page to display */}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path='/students'>
                        <Students></Students>
                    </Route>
                    <Route exact path='/students/add-student'>
                        <AddEditStudent></AddEditStudent>
                    </Route>
                    <Route exact path='/students/view-student'>
                        <ViewStudent></ViewStudent>
                    </Route>
                    <Route exact path='/add-circular'>
                        <AddCircular></AddCircular>
                    </Route>

                    {
                        isAdmin === 'true' ? (
                            <div>
                                <Route exact path='/users'>
                                    <Users></Users>
                                </Route>
                                <Route exact path='/users/add-user'>
                                    <AddUser></AddUser>
                                </Route>
                            </div>
                        ) : null
                    }

                    <Redirect to="/students"></Redirect>
                </Switch>
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
