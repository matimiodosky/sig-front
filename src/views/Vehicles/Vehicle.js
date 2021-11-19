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
import VehicleDetails from "./VehicleDetails";

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


const Vehicle = () => {
    const classes = useStyles();

    const {id} = useParams()
    const [loaders, setLoaders] = useState({})

    const [loading, setLoading] = useState(false)

    const [vehicle, setVehicle] = useState(undefined)

    const [lastCreatedProcess, setLastCreatedProcess] = useState()

    useEffect(() => {
        setLoaders({...loaders, 'GET_VEHICLE': true})
        const fn = async () => {
            const vehicle = await getVehicle(id)
            setVehicle(vehicle)
            setLoaders({...loaders, 'GET_VEHICLE': false})
        }
        fn()
    }, [lastCreatedProcess])

    useEffect(() => {
        setLoading(Object.values(loaders).find(x => x))
    }, [loaders])

    const handleNewProcess = (vehicle) => () => {

        setLoaders({...loaders, 'SAVE_PROCESS': true})
        const fn = async () => {
            await saveNewProcess(vehicle)
            setLoaders({...loaders, 'SAVE_PROCESS': false})
            setLastCreatedProcess(new Date())
        }
        fn()
    }

    const showNewProcess = vehicle && vehicle.processes.every(p => p.finishAt)
    const showVerify = !showNewProcess
    return (
        <div>
            <GridContainer>
                {
                    loading && <CircularProgress/>
                }
                {
                    !loading && vehicle &&
                    <GridItem xs={12} sm={6} md={3} style={{maxWidth: '100%', flexBasis: '100%'}}>
                       <VehicleDetails vehicle={vehicle} showVerify={showVerify}/>
                    </GridItem>
                }
                {!loading && vehicle && <GridItem xs={12} sm={6} md={3} style={{maxWidth: '100%', flexBasis: '100%'}}>

                    <Card>
                        <CardHeader color="primary" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4 className={classes.cardTitleWhite}>Ingresos</h4>
                            {showNewProcess && <MUButton onClick={handleNewProcess(vehicle)}>
                                <IconButton className={classes.cardTitleWhite}>
                                    <Add/>
                                </IconButton>
                            </MUButton>}
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHead={["Fecha de ingreso", "Fecha de salida", "Tiempo de permanencia"]}
                                tableHeaderColor={'primary'}
                                tableData={
                                    vehicle.processes.map(process => [
                                        moment(process.createdAt).format('DD/MM/YYYY HH:mm'),
                                        process.finishAt ? moment(process.finishAt).format('DD/MM/YYYY HH:mm') : '',
                                        process.finishAt ? `${ moment(process.finishAt).diff(process.createdAt, 'minutes')} minutos` : '',
                                        <Link to={`/app/vehicles/${vehicle.id}/processes/${process.id}`}>
                                            <IconButton aria-label="Edit">
                                                <Launch/>
                                            </IconButton>
                                        </Link>
                                    ])
                                }
                                emptyMessage={"Sin ingresos hasta el momento"}
                            />
                        </CardBody>
                    </Card>
                </GridItem>}

            </GridContainer>
        </div>
    );
}

export default Vehicle
