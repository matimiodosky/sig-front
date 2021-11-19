/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import LocalShipping from "@material-ui/icons/LocalShipping";
import VehiclesPage from "views/Vehicles/Vehicles.js";
import IndicatorsPage from "views/Indicators/Indicators.js";
import Button from "./components/CustomButtons/Button";
import React from "react";
import {ExitToApp, Timeline} from "@material-ui/icons";
import Logout from "./views/Logout/Logout";
import Vehicle from "./views/Vehicles/Vehicle";

const dashboardRoutes = [
  {
    path: "/vehicles",
    name: "Camiones",
    icon: LocalShipping,
    component: VehiclesPage,
    layout: "/app",
  },
  {
    path: "/indicators",
    name: "Indicadores",
    icon: Timeline,
    component: IndicatorsPage,
    layout: "/app",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: ExitToApp,
    component: Logout,
    layout: "/app",
  }
];

export default dashboardRoutes;
