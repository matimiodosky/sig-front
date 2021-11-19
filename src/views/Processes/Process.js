import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import {getProcess, getVehicle, getVehicles} from "../../api/connector";
import {Checkbox, CircularProgress} from "@material-ui/core";
import {distinct} from "../../utils/utils";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Add, ArrowDownward, CheckBox, Create, Launch, ViewColumn} from "@material-ui/icons";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import VehicleDetials from "../Vehicles/VehicleDetails";

const {saveAs} = require('file-saver');


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

function getTableHeaders() {
    return ['Verificación', 'Fecha', 'Resultado', 'Descargar archivos'];
}

const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
        uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, {type: mime});
    return file;
}

function handleDownloadFiles(step) {
    const fieldsToDownload = Object.entries(step.fields).filter(([_, value]) => value.startsWith('data:'))
    fieldsToDownload.forEach(([key, value]) => {
        let file = convertBase64ToFile(value, key);
        saveAs(file, key);
    });

}

function getTableRows(steps) {
    return steps.map(step => [
        step.label,
        moment(step.createdAt).format('DD/MM/YYYY HH:mm'),
        <Checkbox checked={step.checked}/>,
        Object.values(step.fields).find(v => v.startsWith('data:')) &&
            <IconButton onClick={() => handleDownloadFiles(step)}>
                <ArrowDownward/>
            </IconButton>
    ])
}

const Vehicles = () => {
    const classes = useStyles();

    const {processId, vehicleId} = useParams()

    const [process, setProcess] = useState()

    const [vehicle, setVehicle] = useState(undefined)

    useEffect(() => {
        setLoaders({...loaders, 'GET_VEHICLE': true})
        const fn = async () => {
            const vehicle = await getVehicle(vehicleId)
            setVehicle(vehicle)
            setLoaders({...loaders, 'GET_VEHICLE': false})
        }
        fn()
    }, [vehicleId])

    const [loaders, setLoaders] = useState({})

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(Object.values(loaders).find(x => x))
    }, [loaders])

    useEffect(() => {
        const fn = async () => {
            setLoaders({...loaders, PROCESS: true})
            setProcess(await getProcess(processId))
            setLoaders({...loaders, PROCESS: false})
        }
        fn()
    }, [processId])

    return (
        <div>
            <GridContainer>
                {
                    !loading && vehicle &&
                    <GridItem xs={12} sm={12} md={12}>
                        <VehicleDetials vehicle={vehicle}/>
                    </GridItem>
                }
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4 className={classes.cardTitleWhite}>Ingreso</h4>
                        </CardHeader>
                        <CardBody>
                            {
                                loading && <CircularProgress/>
                            }{
                            !loading && process && <div>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={getTableHeaders()}
                                    tableData={getTableRows(process.steps)}
                                    emptyMessage={"Sin verificaciones hasta el momento"}
                                />
                            </div>
                        }
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Vehicles
