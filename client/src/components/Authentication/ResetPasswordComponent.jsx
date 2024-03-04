import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "@/lib/components/Button.jsx";
import {toast} from "react-toastify";
import {apiService} from "@/services/apiService.js";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import { z } from "zod";
import validateData from "@/utils/formValidator.js";

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
  const [error, setError] = useState('');
  const [hasTokenOwner, setHasTokenOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const response = await checkToken(token);
      if (response.data.length === 0) {
        navigate('/pagenotfound');
      }
      setHasTokenOwner(response.data.length === 0);
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas.');
        setLoading(false);
        return;
      }

      const validationErrors = validateData(resetPasswordValidationSchema, { password });
      if (validationErrors) {
        setError(validationErrors);
        setLoading(false);
        return;
      }

      const response = await resetPassword(password, token);

      if (response.success) {
        toast.success(response.message);
        navigate('/auth/login');
      } else {
        setError(response.errors || 'Une erreur inattendue s\'est produite.');
      }
    } catch (error) {
      setError('Une erreur inattendue s\'est produite.');
    }

    setLoading(false);
  };

  return (
      <>
        {hasTokenOwner ?
            <div className="w-full h-full flex justify-center items-center pt-6 sm:pt-0">
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 bg-white p-5 mx-auto rounded-2xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
                <h2 className="mb-12 text-center text-3xl font-extrabold">Réinitialiser le mot de passe</h2>
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
                    {error && <p className="error">{error}</p>}
                  </div>
                  <Button
                      className="flex bg-black text-white w-full justify-center mt-6 mb-2"
                      variant="rounded"
                  >
                    <span>{loading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}</span>
                  </Button>
                </form>
              </div>
            </div> : <NotFoundPage/>}
      </>
  );
};

export default ResetPasswordComponent;