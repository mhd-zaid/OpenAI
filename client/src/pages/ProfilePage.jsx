import useToken from '@/utils/useToken.js';
import React, { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';

const ProfilePage = () => {
  const { token } = useToken();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await apiService.getOne('users', `profile`);
        if (res.data && res.data[0]) {
          setUser(res.data[0]);
          setComments(res.data[0].comments);
          setFavorites(res.data[0].favorites);
          setPreferences(res.data[0].preferences);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Profil de {user?.username}</h1>
      <div>
        <h2>Commentaires postés</h2>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Recettes favorites</h2>
        {favorites.map(recipe => (
          <div key={recipe.id}>
            <p>{recipe.title}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Préférences alimentaires</h2>
        {preferences.map(preference => (
          <div key={preference.id}>
            <p>{preference.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
