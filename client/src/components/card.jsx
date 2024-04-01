import { Box, Heading, Text, Flex, Image, Badge } from '@chakra-ui/react';
import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';

const Card = ({ item }) => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      borderWidth={1}
      minW={96}
      maxW={96}
      h={56}
      as="a"
      href={`/recettes/${item.url}`}
      mb={4}
    >
      <Image
        objectFit="cover"
        src={'/img/recipe/' + item.image}
        alt={item.title}
        w="full"
        h="full"
      />
      <Box p={4} pt={0}>
        <Text as="small" color={'gray'}>
          Temps estimé:&nbsp;{item.time}&nbsp;minutes
        </Text>
        <Heading fontSize="sm" my={1}>
          {item.title}
        </Heading>
        <Flex justify="space-between">
          <ThemeProvider theme={ratingTheme}>
            <Rating
              name="half-rating"
              value={item.average_rating}
              precision={0.5}
              readOnly={true}
            />
          </ThemeProvider>
          {item.level && (
            <Badge
              alignSelf="end"
              colorScheme={
                item.level === 'DIFFICILE'
                  ? 'purple'
                  : item.level === 'MOYEN'
                  ? 'blue'
                  : 'green'
              }
            >
              {item.level}
            </Badge>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Card;
