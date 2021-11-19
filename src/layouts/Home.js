import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-5.jpeg";
import logo from "assets/img/reactlogo.png";
import Button from "../components/CustomButtons/Button";
import Vehicle from "../views/Vehicles/Vehicle";
import Vehicles from "../views/Vehicles/Vehicles";
import NewVehicle from "../views/Vehicles/NewVehicle";
import Logout from "../views/Logout/Logout";
import Verification from "../views/Verification/Verification";
import Indicators from "../views/Indicators/Indicators";

let ps;

const switchRoutes = (
    <Switch>
        <Route from="/app/vehicles/:id/verify" component={Verification}/>
        <Route from="/app/vehicles/new" component={NewVehicle}/>
        <Route from="/app/vehicles/:id" component={Vehicle}/>
        <Route from="/app/vehicles" component={Vehicles}/>
        <Route from="/app/indicators" component={Indicators}/>
        <Route from="/app/logout" component={Logout}/>
        <Redirect from="/app" to="/app/vehicles"/>
    </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({...rest}) {
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("blue");
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getRoute = () => {
        return window.location.pathname !== "/admin/maps";
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);
    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"SIG"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                {getRoute() ? (
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                ) : (
                    <div className={classes.map}>{switchRoutes}</div>
                )}
            </div>
        </div>
    );
}
