import Ajv from 'ajv';

const validateRequest = (req, res, schema) => {

    const ajv = new Ajv({allErrors: true});
    const validateBody = ajv.compile(schema);

    // validate request
    var validate = validateBody(req.body);
    if(!validate) {
        res.status(400);
        res.send(ajv.errorsText(validateBody.errors));
        return false;
    }
    return true;
};

export default validateRequest;