import { useState } from 'react';
import Button from "@/lib/components/Button.jsx";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import CardComponent from "@/lib/components/CardComponent.jsx";
import {z} from "zod";
import validateData from "@/utils/formValidator.js";

const forgetPasswordValidationSchema = z.object({
  email: z.string().email({ message: 'Email non valide' }),
});

async function requestPasswordReset(formData) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/forgotpassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response.json();
}

const ForgetPasswordComponent = () => {
  // const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    email: ""
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

    try {


      const validationErrors = validateData(forgetPasswordValidationSchema, formData);
      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      const response = await requestPasswordReset(formData);

      if(response.success) {
        toast.success(response.message);
      }else {
        setErrors(response.errors || 'Une erreur inattendue s\'est produite.');
      }

    } catch (error) {
      setErrors(error.message || 'Une erreur inattendue s\'est produite.');
    }

  };

  return (
      <>
        <CardComponent title="MOT DE PASSE OUBLIÉ ?">
          {errors && errors.global ? <p className="error">{errors.global}</p> : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Adresse e-mail
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
            <Button
                title={"Envoyer la demande de réinitialisation"}
                className="flex bg-black text-white w-full justify-center mt-6 mb-2"
                variant="rounded"
            />
            <p>ou</p>
            <Button
                className="flex bg-black text-white w-full justify-center mt-2"
                variant="rounded"
                onClick={() => navigate("/auth/login")}
            >
              <span>Se Connecter</span>
            </Button>
          </form>
        </CardComponent>
      </>
  );
};

export default ForgetPasswordComponent;