import { uuidv7 } from "uuidv7";
import ValidationError from "../errors/ValidationError.js";
import sendMail from "../Controllers/mailController.js";
import createToken from "../utils/token.js";
import User from "../models/User.js";
import sequelize from "../config/sequelize.js";
import {promises as fs} from "fs";
import crypto from "crypto";

const UserModel = User(sequelize);
export default () => ({
    register: async (req, res, next) => {
        try{
            const id = uuidv7();
            const user = await UserModel.create({
                id,
                ...req.body,
                isVerified: false,
                loginAttempts: 0,
                role: "user"
            });
            res.status(201).json(user);
        }catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                console.log("e", error)
                error = ValidationError.fromSequelize(error);
                res.status(400).json(error.errors);
            }
            next(error);
        }

    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                const err = new ValidationError({ "email": ['Email invalide.'], "password": ['Mot de passe invalide.'] })
                return next(err);
            }

            const user = await UserModel.findOne({ where: { email } });

            if (!user) {
                const err = new ValidationError({ "email": ['Email invalide.'], "password": ['Mot de passe invalide.'] })
                return next(err);
            }
            if (!user.isActive) {
                const err = new ValidationError({ "isActive": ["Compte inactif."] })
                return next(err);
            }
            if (!user.isVerified) {
                const err = new ValidationError({ "isVerified": ["Compte non vérifié."] })
                return next(err);
            }

            const token = createToken(user);
            res.cookie('jwt', token, { httpOnly: true, signed: true });

            return res.json(user);
        } catch (error) {
            next(error);
        }
    },

    logout: (req, res) => {
        res.clearCookie("jwt");
        res.send("logout");
    },

    resetPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ where: { email } });
            if (!user) {
                return res.status(200).send();
            }else{

                res.status(200).send();
            }
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            if (!req.body.email) {
                return next(
                    new ValidationError({
                        email: "Veuillez fournir un email.",
                    })
                );
            }
            const user = await UserModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (user !== null) {
                let content = await fs.readFile(`mails/forgetPassword.txt`, "utf8");
                const token = crypto.randomBytes(30).toString("hex");
                content = content.replace(`{{url_forget}}`, `${process.env.CLIENT_URL}/new_password?token=${token}`);
                await user.update({token:token})
                sendMail(user.email, "Reinitialiser votre mot de passe", null, content);
                res.status(200).send();
            } else {
                res.status(200).send();
            }
        } catch (error) {
            if (
                error.name === "SequelizeValidationError" ||
                error.name === "SequelizeUniqueConstraintError"
            ) {
                error = ValidationError.fromSequelize(error);
            }
            next(error);
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            const user = await UserModel.findOne({
                where: {
                    token: req.params.token,
                },
            });
            if (user) {
                await user.update({ isVerified: true, token: null });
                return res.status(200).send(user);
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            next(error);
        }
    },

    checkToken: async (req, res, next) => {
        try {
            const user = await UserModel.findOne({
                where: {
                    token: req.params.token,
                },
            });
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            next(error);
        }
    }
})