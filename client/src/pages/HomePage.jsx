import { Box, Heading, Text, Flex, Badge, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/recipes')
      .then(res => res.json())
      .then(res => setRecipes(res.data));
  };

  return (
    <Flex flexDir="column" as="main" py={4} px={8}>
      <Heading fontSize="xl">Découvrez nos recettes de la semaine:</Heading>
      <Flex mt={8} overflowX={'auto'} gap={6}>
        {recipes.map(recipe => (
          <Flex
            flexDir="column"
            justifyContent="space-between"
            key={recipe.id}
            borderWidth={1}
            minW={64}
            p={4}
            as="a"
            href={`/recipe/${recipe.id}`}
          >
            <Box>
              <Heading fontSize="sm">{recipe.title}</Heading>
              <Text>{recipe.description}</Text>
            </Box>
            <Badge
              alignSelf="end"
              colorScheme={
                recipe.level === 'DIFFICILE'
                  ? 'purple'
                  : recipe.level === 'MOYEN'
                  ? 'blue'
                  : 'green'
              }
            >
              {recipe.level}
            </Badge>
          </Flex>
        ))}
      </Flex>
      <Link color={'darkblue'} pt={8} href="/recipes">
        Voir toutes nos recettes!
      </Link>
    </Flex>
  );
};

export default HomePage;
