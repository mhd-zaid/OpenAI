import { z } from 'zod';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from "@/lib/components/Button.jsx";
import {toast} from "react-toastify";
import CardComponent from "@/lib/components/CardComponent.jsx";
import validateData from "@/utils/formValidator.js";

async function registerUser(credentials) {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}


const registerValidationSchema = z.object({
    email: z.string().email({ message: 'Email non valide' }),
    userName: z.string().min(1, { message: 'Le nom d\'utilisateur est requis' }),
    password: z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères' }),
    confirmPassword: z.string().min(8, { message: 'La confirmation du mot de passe doit comporter au moins 8 caractères' }),
});

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrors(["Les mots de passe ne correspondent pas."]);
            return;
        }

        const validationErrors = validateData(registerValidationSchema, formData);
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }

        const registrationPromise = registerUser(formData);

        await toast.promise(
            registrationPromise,
            {
                pending: 'Enregistrement en cours...',
                success: 'Enregistrement réussi ! \n Veuillez vérifier votre boîte de réception pour activer votre compte.',
                error: 'Une erreur est survenue lors de l\'enregistrement.'
            }
        );
        const registration = await registrationPromise;

        if (registration.errors) {
            setErrors(registration.errors || ["Une erreur inattendue s'est produite."]);
        }

    };

    return (
        <>
            <CardComponent title="CRÉER UN COMPTE" className={"w-full lg:w-2/5"}  cardContentClass={"w-full h-full"}>
                {errors.global ? <p className="error">{errors.global}</p> : null}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Entrez votre adresse e-mail"
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.email ? <p className="error">{errors.email}</p> : null}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="userName">
                            Pseudo
                        </label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Entrez votre nom d'utilisateur"
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.userName ? <p className="error">{errors.userName}</p> : null}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Entrez votre mot de passe"
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.password ? <p className="error">{errors.password}</p> : null}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="confirmPassword">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirmez votre mot de passe"
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.confirmPassword ? <p className="error">{errors.confirmPassword}</p> : null}
                    </div>
                    <Button
                        title={"S'inscrire"}
                        className="flex btn bezel text-white w-full justify-center mt-6 mb-2"
                        variant="rounded"
                    />
                    <p className={"text-center"}>ou</p>
                    <Button
                        title={"Se connecter"}
                        className="flex btn bezel text-white w-full justify-center mt-2"
                        variant="rounded"
                        onClick={() => navigate("/auth/login")}
                    />
                </form>
            </CardComponent>
        </>
    );
};

export default RegisterComponent;
