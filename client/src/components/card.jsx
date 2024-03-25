import { Box, Heading, Text, Flex, Badge } from '@chakra-ui/react';

const Card = ({ item }) => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      borderWidth={1}
      minW={64}
      p={4}
      as="a"
      href={`/recipe/${item.id}`}
      mb={4}
    >
      <Box>
        <Heading fontSize="sm">{item.title}</Heading>
        <Text>{item.description}</Text>
      </Box>
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
  );
};

export default Card;
