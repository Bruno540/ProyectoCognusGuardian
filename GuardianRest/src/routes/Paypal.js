const Router = require("express");
const {  authorizePayment, createSuscription, verifySuscription, destroySuscription } = require("../paypal/paypal.controller");
const {  validateSignup, validateSuscription } = require('../validation/validation');
const handleError = require('../helpers/error.check');

const router = Router();

let cors = require('cors')

router.use(cors());

router.post('/createsuscription/', validateSuscription, handleError(createSuscription));

router.post('/verifysuscription/', validateSignup, handleError(verifySuscription));

router.post('/destroysuscription/:id',handleError(destroySuscription));

router.post('/authorizepayment', handleError(authorizePayment));

module.exports=router;