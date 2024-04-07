import React, { useEffect } from 'react';
import { Card, CardFooter, Flex, Img, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import { apiService } from '@/services/apiService.js';
import Pagination from "@/components/Pagination.jsx";

const FavoriteComponent = () => {
  const [favorites, setFavorites] = React.useState([]);
  const [nbFavorites, setNbFavorites] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const fetchUserFavorites = async () => {
    const getFavorites = await apiService.getUserInfo('users', '/favorites');
    if (getFavorites.data) {
        setNbFavorites(getFavorites.data.length);
      setFavorites(getFavorites.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }
  }

  useEffect(() => {
    fetchUserFavorites();
  }, [currentPage]); // Ajoutez currentPage comme dépendance

  return (
      <>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={5}>
          {favorites.map((favorite) => (
              <Link key={favorite.id} to={`/recettes/${favorite.Recipe.url}`}>
                <Card data-type='Card' h={"full"}>
                  <Img data-type='Image' objectFit='cover' src={`/img/recipe/${favorite.Recipe.image}`}/>
                  <CardFooter data-type='CardFooter' justify='space-between' flexWrap='wrap'>
                    <Flex direction={"column"} w={"full"} justifyContent={"space-between"} bgColor={"white"}>
                      <Text fontFamily={"sans-serif"} fontWeight={700}>{favorite.Recipe.title}</Text>
                      <Flex justifyContent={"space-between"} w={"full"}>
                        <ThemeProvider theme={ratingTheme}>
                          <Rating name="half-rating" value={favorite.Recipe.average_rating} precision={0.5}
                                  readOnly={true}/>
                        </ThemeProvider>
                        <Text fontSize={"smaller"} color={"gray.400"}>31/03/2024</Text>
                      </Flex>
                    </Flex>
                  </CardFooter>
                </Card>
              </Link>
          ))}
        </SimpleGrid>
        <div className={"w-full row justify-end my-4"}>
          <Pagination
              totalPages={Math.ceil(nbFavorites / itemsPerPage)}
              currentPage={currentPage}
              onPageChange={(newPage) => {
                if (newPage >= 1 && newPage <= Math.ceil(nbFavorites / itemsPerPage)) {
                  setCurrentPage(newPage);
                }
              }}
          />
        </div>
      </>
  );
};

export default FavoriteComponent;