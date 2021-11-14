import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import {getVehicles} from "../../api/connector";
import {CircularProgress} from "@material-ui/core";
import {distinct} from "../../utils/utils";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Add, Create, Launch, ViewColumn} from "@material-ui/icons";
import {Link} from "react-router-dom";


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

const getTableRows = (vehicles) => {
    const headers = getTableHeaders(vehicles).filter(header => header !== 'Estado');
    return vehicles
        .map(vehicle => [
            ...headers.map(h => vehicle.fields[h]),
            vehicle.state,
            <Link to={`/app/vehicles/${vehicle.id}`}>
                <IconButton aria-label="Edit">
                    <Launch/>
                </IconButton>
            </Link>
        ])

}

function getTableHeaders(vehicles) {
    return [...vehicles.flatMap(v => Object.keys(v.fields)).filter(distinct), 'Estado']
}

const Vehicles = () => {
    const classes = useStyles();

    const [vehicles, setVehicles] = useState([])

    const [loaders, setLoaders] = useState({})

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoaders({...loaders, 'GET_VEHICLES': true})
        const fn = async () => {
            const vehicles = await getVehicles()
            setVehicles(vehicles)
            setLoaders({...loaders, 'GET_VEHICLES': false})
        }
        fn()
    }, [])

    useEffect(() => {
        setLoading(Object.values(loaders).find(x => x))
    }, [loaders])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4 className={classes.cardTitleWhite}>Camiones</h4>
                            <Link to={"/app/vehicles/new"}>
                                <IconButton className={classes.cardTitleWhite}>
                                    <Add/>
                                </IconButton>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            {
                                loading && <CircularProgress/>
                            }
                            {
                                !loading && <Table
                                    tableHeaderColor="primary"
                                    tableHead={getTableHeaders(vehicles)}
                                    tableData={getTableRows(vehicles)}
                                    emptyMessage={"Sin camiones hasta el momento"}
                                />
                            }
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Vehicles
