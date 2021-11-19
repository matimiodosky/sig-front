import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import Card from "../../components/Card/Card";
import {getVehicle, getVehicles, saveNewProcess} from "../../api/connector";
import {Button as MUButton, CircularProgress} from "@material-ui/core";
import {distinct} from "../../utils/utils";
import {Link, useParams} from "react-router-dom";
import CardIcon from "../../components/Card/CardIcon";
import CardFooter from "../../components/Card/CardFooter";
import DateRange from "@material-ui/icons/DateRange";
import LocalShipping from "@material-ui/icons/LocalShipping";
import moment from 'moment'
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import IconButton from "@material-ui/core/IconButton";
import {Add, Launch} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Button from "components/CustomButtons/Button.js";

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

const useStyles = makeStyles(styles);


function getTableHeaders(vehicles) {
    return vehicles.flatMap(v => Object.keys(v.fields)).filter(distinct);
}


const VehicleDetials = ({vehicle, showVerify = false}) => {


    return (
        <Card>
            <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                    <LocalShipping/>
                </CardIcon>
            </CardHeader>
            <CardBody>
                {[...Object.entries(vehicle.fields)
                    .map(([key, value]) => <div>
                            <p><b>{key}: </b>{value}</p>
                        </div>
                    ),
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2%'}}>
                        <p><b>Estado: </b>{vehicle.state}</p>
                        {showVerify && <Link to={`/app/vehicles/${vehicle.id}/verify`}>
                            <Button type={'button'} color={'primary'}>
                                Verificar
                            </Button>
                        </Link>}
                    </div>
                ]}
            </CardBody>
            <CardFooter stats>

                <div>
                    <DateRange/>
                    {`Creado: ${moment(vehicle.date).format('DD/MM/YYYY HH:mm')}`}
                </div>
            </CardFooter>
        </Card>
    );
}

export default VehicleDetials
