import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "@/lib/components/Button.jsx";
import {toast} from "react-toastify";
import {apiService} from "@/services/apiService.js";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import { z } from "zod";
import validateData from "@/utils/formValidator.js";
import CardComponent from "@/lib/components/CardComponent.jsx";

async function resetPassword(password, token) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/resetpassword/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  }).then((data) => data.json());
}

async function checkToken(token) {
  return apiService.getOne("users", `?token=${token}`);
}

const resetPasswordValidationSchema = z.object({
  password: z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères' }),
})

const ResetPasswordComponent = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [hasTokenOwner, setHasTokenOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const response = await checkToken(token);

      if (response.data.length === 0) {
        navigate('/pagenotfound');
      }
      setHasTokenOwner(response.data.length > 0);
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        setErrors('Les mots de passe ne correspondent pas.');
        setLoading(false);
        return;
      }

      const validationErrors = validateData(resetPasswordValidationSchema, { password });
      if (validationErrors) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      const response = await resetPassword(password, token);

      if (response.success) {
        toast.success(response.message);
        navigate('/auth/login');
      } else {
        setErrors(response.errors || 'Une erreur inattendue s\'est produite.');
      }
    } catch (error) {
      setErrors('Une erreur inattendue s\'est produite.');
    }

    setLoading(false);
  };

  return (
      <>
        {hasTokenOwner ?
            <CardComponent title="RÉINITIALISEZ VOTRE MOT DE PASSE" cardContentClass={"w-full h-full"}>
              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto px-4 py-8 lg:w-2/3">
                <div>
                  <h2 className="text-xl font-bold mb-4">Création de votre nouveau mot de passe</h2>
                  <p className="mb-4">
                    Veuillez entrer votre nouveau mot de passe dans les champs ci-dessous. Assurez-vous que votre mot de
                    passe est fort et unique.
                  </p>
                  <p className="mb-4">
                    Si vous rencontrez des difficultés ou si vous avez besoin d'aide, n'hésitez pas à contacter notre
                    support client.
                  </p>
                </div>
                {errors && errors.global ? <p className="error">{errors.global}</p> : null}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">
                      Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre nouveau mot de passe"
                        className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="confirmPassword">
                      Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmez votre nouveau mot de passe"
                        className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        required
                    />
                    {errors && <p className="error">{errors}</p>}
                  </div>
                  <Button
                      title={loading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
                      className="btn bezel flex bg-black text-white w-full justify-center mt-6 mb-2"
                      variant="rounded"
                  />
                </form>
              </div>
            </CardComponent> : <NotFoundPage/>}
      </>
  );
};

export default ResetPasswordComponent;