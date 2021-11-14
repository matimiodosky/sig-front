import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import Card from "../../components/Card/Card";
import {getStepToVerify, getVehicle, getVehicles, saveNewProcess, verifyStep} from "../../api/connector";
import {Button as MUButton, CircularProgress, Input} from "@material-ui/core";
import {distinct} from "../../utils/utils";
import {Link, useHistory, useParams} from "react-router-dom";
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
import FileInputComponent from 'react-file-input-previews-base64'
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


const Verification = () => {
    const classes = useStyles();

    const {id} = useParams()

    const [loaders, setLoaders] = useState({})

    const [loading, setLoading] = useState(true)

    const [vehicle, setVehicle] = useState()

    const [step, setStep] = useState()

    const [form, setForm] = useState({})

    const [error, setError] = useState()

    const history = useHistory()


    useEffect(() => {
        const fn = async () => {
            setLoaders({...loaders, 'GET_VEHICLE': true})
            setVehicle(await getVehicle(id))
            setLoaders({...loaders, 'GET_VEHICLE': false})
        }
        fn()
    }, [])

    useEffect(() => {
        const fn = async () => {
            setLoaders({...loaders, 'GET_STEP': true})
            const step = await getStepToVerify(id)
            setStep(step)
            step.stepFields.filter(({type}) => type === 'BOOLEAN').forEach(field => {
                setForm({...form, [field.label]: false})
            })
            setLoaders({...loaders, 'GET_STEP': false})
        }
        fn()
    }, [])


    useEffect(() => {
        setLoading(Object.values(loaders).find(x => x))
    }, [loaders])

    const onChange = (stepField) => async (e) => {
        let value
        switch (stepField.type) {
            case 'BOOLEAN':
                value = e.target.checked
                break
            case 'STRING':
                value = e.target.value
                break
            case 'FILE':
                value = e
        }
        setForm({...form, [stepField.label]: value})
        console.log(JSON.stringify({...form, [stepField.label]: value}))
    }

    const stepField = (stepField) => {
        const {type, label} = stepField
        switch (type) {
            case 'FILE': {
                return (

                    <div style={{display: 'flex', flexDirection: 'row', gap: '2%', alignItems: 'center'}}>

                        <p><b>{label}: </b></p>
                        {form[label] &&
                        <p>{form[label].name}</p>
                        }
                        <FileInputComponent
                            labelText=""
                            labelStyle={{fontSize: 14}}
                            multiple={false}
                            imagePreview={false}
                            textBoxVisible={false}
                            callbackFunction={(file_arr) => {
                                onChange(stepField)(file_arr)
                            }}
                            accept="*"
                            buttonComponent={<Button variant="contained" color="primary" component="span">
                                {form[label] ? 'Cambiar archivo' : 'Subir archivo'}
                            </Button>}
                        />
                    </div>
                )
            }
            case 'STRING': {
                return <div style={{display: 'flex', flexDirection: 'row', gap: '2%'}}>
                    <p><b>{label}: </b></p>
                    <Input onChange={onChange(stepField)}/>
                </div>
            }
            case 'BOOLEAN': {
                return <div style={{display: 'flex', flexDirection: 'row', gap: '2%'}}>
                    <p><b>{label}: </b></p>
                    <Checkbox onChange={onChange(stepField)}/>
                </div>
            }
        }
    }

    const handleSubmit = async () => {

        if (!step.stepFields.every(field => Object.keys(form).includes(field.label))) {
            setError('Complete todos los campos para continuar')
            setTimeout(() => {
                setError(null)
            }, 5000)
            return
        }
        setLoaders({...loaders, 'VERIFY_STEP': true})
        const data = {}

        Object.entries(form).forEach(([key, value]) => {
            data[key] = value.base64 || value
        })


        await verifyStep(id, step, data)
        setLoaders({...loaders, 'VERIFY_STEP': false})
        history.push(`/app/vehicles/${id}`)
    }
    return (
        [<div>
            <GridContainer>
                {
                    loading && <CircularProgress/>
                }
                {
                    !loading && step &&
                    <GridItem xs={12} sm={6} md={3} style={{maxWidth: '100%', flexBasis: '100%'}}>

                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>{step.label}</h4>
                            </CardHeader>
                            <CardBody styles={{display: 'flex'}}>
                                {step.stepFields.map(stepField)}
                                <div style={{display: 'flex'}}>
                                    <Button type='submit' onClick={handleSubmit} style={{marginLeft: 'auto'}}
                                            color={'primary'}>
                                        Enviar
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                }

            </GridContainer>

        </div>,
            error && <Snackbar
                place="br"
                color="danger"
                icon={AddAlert}
                message={error}
                open={1000}
                closeNotification={() => setError(null)}
                close
            />]
    );
}

export default Verification
