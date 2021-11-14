import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import Card from "../../components/Card/Card";
import {getVehicle, getVehicles, saveVehicle} from "../../api/connector";
import {CircularProgress} from "@material-ui/core";
import {distinct} from "../../utils/utils";
import {Link, useHistory, useParams} from "react-router-dom";
import CardIcon from "../../components/Card/CardIcon";
import CardFooter from "../../components/Card/CardFooter";
import DateRange from "@material-ui/icons/DateRange";
import LocalShipping from "@material-ui/icons/LocalShipping";
import moment from 'moment'
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "../../components/CustomButtons/Button";
import Snackbar from "../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";

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


const NewVehicle = () => {

    const keys = ['Patente', 'Patente Acoplado', 'Nombre Chofer', 'Apellido Chofer', 'DNI Chofer']
    const classes = useStyles();

    const history = useHistory();


    const [form, setForm] = useState({})

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const onChange = (key) => (e) => {
        setForm({...form, [key]: e.target.value})
    }

    const handleCreate = () => {
        if (!keys.every(key => form[key])) {
            setError('Complete todos los campos para poder crear un camión')
            setTimeout(() => {
                setError(null)
            }, 3000)
            return
        }
        const fn = async () => {
            setLoading(true)
            await saveVehicle({fields: form})
            history.push('/app/vehicles')
        }
        fn()
    }

    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8} style={{flexBasis: '100%', maxWidth: '100%'}}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Nuevo Camión</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                {
                                    keys
                                        .map(key => {
                                            return <GridItem xs={12} sm={12} md={5}>
                                                <CustomInput
                                                    labelText={key}
                                                    id={key}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        disabled: false,
                                                        required: true
                                                    }}
                                                    onChange={onChange(key)}
                                                />
                                            </GridItem>
                                        })
                                }


                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            {!loading && <Button onClick={handleCreate} color="primary">Crear Camión </Button>}
                            {loading && <CircularProgress/>}
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>,

            {error && <Snackbar
                place="br"
                color="danger"
                icon={AddAlert}
                message={error}
                open={1000}
                closeNotification={() => setError(null)}
                close
             />}
        </React.Fragment>

    )
}

export default NewVehicle
