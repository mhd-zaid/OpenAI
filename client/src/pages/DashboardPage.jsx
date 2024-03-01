import { useState } from 'react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recipes = [
    { id: 1, name: 'Pizza Margherita', category: 'plat principal', rating: 4.5 },
    { id: 2, name: 'Tiramisu', category: 'dessert', rating: 4.8 },
    { id: 3, name: 'Pâtes carbonara', category: 'plat principal', rating: 4.7 },
    { id: 4, name: 'Tarte aux pommes', category: 'dessert', rating: 4.6 },
    { id: 5, name: 'Salade César', category: 'entrée', rating: 4.3 },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedCategory === 'all') {
      return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return recipe.category === selectedCategory && recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div>
      <h1>Tableau de bord de recettes de cuisine</h1>
      <input type="text" placeholder="Rechercher une recette" value={searchTerm} onChange={handleSearchChange} />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">Toutes les catégories</option>
        <option value="plat principal">Plats principaux</option>
        <option value="dessert">Desserts</option>
        <option value="entrée">Entrées</option>
      </select>
      <h2>Recettes les plus populaires</h2>
      <ul>
        {filteredRecipes.slice(0, 3).map((recipe) => (
          <li key={recipe.id}>
            {recipe.name} ({recipe.rating})
          </li>
        ))}
      </ul>
      <h2>Recettes récemment ajoutées</h2>
      <ul>
        {filteredRecipes.slice(-3).map((recipe) => (
          <li key={recipe.id}>
            {recipe.name} ({recipe.rating})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;