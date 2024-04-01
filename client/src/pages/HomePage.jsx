import { Box, Heading, Text, Flex, Badge, Link } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Card from '../components/card';

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
    isLoggedIn && getFavoriteRecipes();
  }, [isLoggedIn]);

  const getRecipes = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/recipes?limit=5')
      .then(res => res.json())
      .then(res => res.data && setRecipes(res.data));
  };

  const getFavoriteRecipes = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/') // TODO: Update to get favorites
      .then(res => res.json())
      .then(res => res.data && setFavoriteRecipes(res.data));
  };

  return (
    <Flex flexDir="column" as="main" w="full" py={4} px={8}>
      {isLoggedIn && (
        <Box mb={8}>
          <Heading fontSize="xl">Mes recettes préférées:</Heading>
          <Flex mt={8} overflowX={'auto'} gap={6}>
            {favoriteRecipes.map(recipe => (
              <Card key={recipe.id} item={recipe} />
            ))}
            {favoriteRecipes.length === 0 && (
              <Text as="small">
                Vous n&apos;avez pas encore de recettes préférées.
              </Text>
            )}
          </Flex>
        </Box>
      )}

      <Heading fontSize="xl">Découvrez nos recettes de la semaine:</Heading>
      <Flex mt={8} overflowX={'auto'} gap={6}>
        {recipes.map(recipe => (
          <Card key={recipe.id} item={recipe} />
        ))}
      </Flex>
      <Link color={'darkblue'} pt={8} href="/recettes">
        Voir toutes nos recettes!
      </Link>
    </Flex>
  );
};

export default HomePage;
