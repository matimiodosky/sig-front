import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButtons/Button";
import {getVehicles} from "../../api/connector";
import {CircularProgress} from "@material-ui/core";
import {distinct} from "../../utils/utils";


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};


const Logout = () => {
    window.location.replace('http://camiones-sig.com.ar:8081/login')
   return (<div></div>)
}

export default Logout
