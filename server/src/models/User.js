import { Model, DataTypes } from "sequelize";
import sendMail from "../Controllers/mailController.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import fs from "fs/promises";
export default function (connection) {
    class User extends Model {
        static associate(db) { }
    }

    User.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            userName: {
                type: DataTypes.STRING(45),
                validate: {
                    len: [2, 45],
                },
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: "L'adresse e-mail ne peut pas être vide.",
                    },
                    isEmail: {
                        msg: "Veuillez fournir une adresse e-mail valide.",
                    },
                },
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    isStrongPassword(value) {
                        const strongPasswordRegex =
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

                        if (!strongPasswordRegex.test(value)) {
                            throw new Error(
                                "Le mot de passe doit avoir au moins 12 caractères avec au moins une majuscule, un chiffre et un caractère spécial."
                            );
                        }
                    },
                },
            },
            gender: {
                type: DataTypes.ENUM("H", "F"),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            zip: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateOfBirth: {
                type: DataTypes.DATE,
                allowNull: true
            },
            role: {
                type: DataTypes.ENUM("admin", "user"),
                allowNull: false,
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            loginAttempts: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isActive:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
        },
        {
            sequelize: connection,
            tableName: "User",
        }
    );


    User.addHook("beforeCreate", async function (user) {
        const bcrypt = bcryptjs
        const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
        const token = crypto.randomBytes(30).toString("hex");
        user.password = hash;
        user.token = token;
    });

    User.addHook("beforeUpdate", async function (user, { fields }) {
        if (fields.includes("password")) {
            const token = crypto.randomBytes(30).toString("hex");
            const bcrypt = bcryptjs;
            const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            user.password = hash;
            user.token = token;
        }
    });

    User.addHook("afterCreate", async user => {
        let content = await fs.readFile(
            `mails/validateUserAccount.txt`,
            "utf8"
        );
        console.log("user created", user.dataValues);
        content = content
            .replace("{{name}}", user.userName)
            .replace("{{confirmLink}}", `${process.env.CLIENT_URL}/verifyEmail?token=${user.token}`);
        await sendMail(user.email, "Vérifiez votre compte", null, content);
    });

    return User;
};
