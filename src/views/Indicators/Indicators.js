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
import {getIframe} from "../../utils/metabase";


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


const Indicators = () => {

    const classes = useStyles();

    const [iframeUrls, setIframeURls] = useState([])

    useEffect(() => {
        setIframeURls([ 5, 6, 7, 8].map(getIframe))
    }, [])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4 className={classes.cardTitleWhite}>Indicadores</h4>
                        </CardHeader>

                        <CardBody>
                            <GridContainer>
                                {
                                    iframeUrls.map(iframeUrl =>
                                        <GridItem>


                                            <iframe
                                                src={iframeUrl}
                                                frameBorder="0"
                                                width="800"
                                                height="600"
                                                allowTransparency
                                            />
                                        </GridItem>
                                    )
                                }
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Indicators
