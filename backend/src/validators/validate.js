import { validationResult } from "express-validator";
import apierror from "../utils/apierror.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new apierror(
                400,
                errors.array().map(err => err.msg).join(", ")
            )
        );
    }
    next();
};

export default validate;