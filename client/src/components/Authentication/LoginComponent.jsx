import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

import Button from "@/lib/components/Button.jsx";
import CardComponent from "@/lib/components/CardComponent.jsx";

import validateData from "@/utils/formValidator.js";
import useToken from "@/utils/useToken.js";

async function loginUser(credentials) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const loginValidationSchema = z.object({
  identifier: z.string().min(1, { message: 'L\'identifiant est requis' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis' }),
})

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const { setToken } = useToken();
  const [errors, setErrors] = useState([]);
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

    const validationErrors = validateData(loginValidationSchema, formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    const login = await loginUser(formData);

    if (!login.errors) {
      const { token } = login.data;
      setToken(token);
      navigate("/");
    } else {
      setErrors(login.errors || ["Une erreur inattendue s'est produite."]);
      setToken();
    }

  };

  return (
      <>
        <div className="login-bg">
          <CardComponent title="SE CONNECTER" className={"w-3/4"} backgroundImage={"C:/Users/makan/ESGI/5iw/Intégration AI/OpenAI/client/public/img/login-bg.jpg"}>
            {errors.global ? <p className="error">{errors.global}</p> : null}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="identifier">
                  Email ou pseudo
                </label>
                <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="Entrez votre adresse e-mail ou pseudo"
                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
                {errors.identifier ? <p className="error">{errors.identifier}</p> : null}
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
              <div className="mt-6 flex items-center justify-between">
                <Link to="/auth/forgetpassword" className="text-sm">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Button
                  className="flex bg-black text-white w-full justify-center mt-6 mb-2"
                  variant="rounded"
              >
                <span>Se Connecter</span>
              </Button>
              <p>ou</p>
              <Button
                  className="flex bg-black text-white w-full justify-center mt-2"
                  variant="rounded"
                  onClick={() => navigate("/auth/register")}
              >
                <span>Créer un compte</span>
              </Button>
            </form>
          </CardComponent>
        </div>
      </>
  );
};

export default LoginComponent;