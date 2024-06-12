import "dotenv/config";
import fileUpload from "express-fileupload";
import jwt from "jsonwebtoken";

export const fileConfig = fileUpload({
    limits: { fieldSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo es superior al limite permitido",
});

export const generateToken = (email) => {
    return jwt.sign(
        {
            email,
        },
        process.env.SK,
        {
            expiresIn: "1h",
        }
    );
};
