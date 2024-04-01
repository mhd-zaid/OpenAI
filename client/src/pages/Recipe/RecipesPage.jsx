import { Box, Heading, Text, Flex, Badge, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Card from '../../components/card';

const RecipesPage = ({ type }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/recipes')
      .then(res => res.json())
      .then(res => res.data && setRecipes(res.data));
  };
  return (
    <Flex flexDir="column" w="full">
      <Heading fontSize="xl">Voici toutes nos recettes:</Heading>
      <Flex mt={8} wrap="wrap" justifyContent="space-evenly">
        {recipes.map(recipe => (
          <Card key={recipe.id} item={recipe} />
        ))}
      </Flex>
    </Flex>
  );
};

export default RecipesPage;
