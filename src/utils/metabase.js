// you will need to install via 'npm install jsonwebtoken' or in your package.json

const jwt = require("jsonwebtoken");

const METABASE_SITE_URL = "http://sig-metabase.herokuapp.com";
const METABASE_SECRET_KEY = "d38d1c0776c96f4ea97bf67a547a6fc2bbecaa7aa327781edde92d89f5c1241a";


const getIframe = (id) => {
    const payload = {
        resource: {question: id},
        params: {},
        exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    const token = jwt.sign(payload, METABASE_SECRET_KEY);

    return METABASE_SITE_URL + "/embed/question/" + token + "#bordered=truefalse&titled=true";

}
module.exports = {

   getIframe

}
