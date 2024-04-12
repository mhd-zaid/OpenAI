import {
  Badge,
  Button,
  Heading,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Card from '../../components/card';
import { Icon } from '@iconify/react';
import {useParams} from "react-router-dom";

const RecipesPage = ({ type }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]); // example: [{ type: 'tags', values: ['entree', 'plat']}]

  const filters = [
    {
      label: 'Tags',
      slug: 'tags',
      options: [
        { label: 'Entrée', value: 'ENTREE' },
        { label: 'Plat', value: 'PLAT' },
        { label: 'Dessert', value: 'DESSERT' },
        { label: 'Boisson', value: 'BOISSON' },
      ],
    },
    {
      label: 'Difficulté',
      slug: 'level',
      options: [
        { label: 'Plutôt simple', value: 'FACILE' },
        { label: 'Moyenne', value: 'MOYEN' },
        { label: 'Assez difficile', value: 'DIFFICILE' },
      ],
    },
  ];

  useEffect(() => {
    getRecipes();
  }, [selectedFilters]);

  const getRecipes = async () => {
    const filters = selectedFilters
      .map(selectedFilter => {
        return selectedFilter.values
          .map(value => {
            return `${selectedFilter.type}=${value}`;
          })
          .join('&');
      })
      .join('&');

    await fetch(import.meta.env.VITE_BACKEND_URL + '/recipes' + '?' + filters)
      .then(res => res.json())
      .then(res => res.data && setRecipes(res.data));
  };

  return (
    <Flex flexDir="column" w="full">
      <Heading fontSize="xl">Voici toutes nos recettes:</Heading>
      <Flex mt={2}>
        {filters.map(filter => (
          <Menu key={filter.slug} closeOnSelect={false}>
            <MenuButton borderWidth={1} px={4} py={2} mr={4}>
              {filter.label}
            </MenuButton>
            <MenuList>
              {filter.options.map(option => (
                <MenuItem key={option.value}>
                  <Checkbox
                    isChecked={selectedFilters.some(
                      selectedFilter =>
                        selectedFilter.type === filter.slug &&
                        selectedFilter.values.includes(option.value),
                    )}
                    onChange={() => {
                      if (
                        selectedFilters.some(
                          selectedFilter => selectedFilter.type === filter.slug,
                        )
                      ) {
                        setSelectedFilters(
                          selectedFilters.map(selectedFilter => {
                            if (selectedFilter.type === filter.slug) {
                              return {
                                type: selectedFilter.type,
                                values: selectedFilter.values.includes(
                                  option.value,
                                )
                                  ? selectedFilter.values.filter(
                                      value => value !== option.value,
                                    )
                                  : [...selectedFilter.values, option.value],
                              };
                            }
                            return selectedFilter;
                          }),
                        );
                      } else {
                        setSelectedFilters([
                          ...selectedFilters,
                          {
                            type: filter.slug,
                            values: [
                              ...(selectedFilters.find(
                                selectedFilter =>
                                  selectedFilter.type === filter.slug,
                              )?.values || []),
                              option.value,
                            ].filter(
                              (value, index, self) =>
                                self.indexOf(value) === index,
                            ),
                          },
                        ]);
                      }
                    }}
                  >
                    {option.label}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        ))}
        <Button
          variant="unstyled"
          onClick={() => selectedFilters.length > 0 && setSelectedFilters([])}
        >
          <Icon icon="system-uicons:reset" />
        </Button>
      </Flex>
      {selectedFilters.length > 0 && (
        <Flex mt={2}>
          {selectedFilters.map(selectedFilter =>
            selectedFilter.values.map(value => (
              <Badge key={value} mr={2}>
                {value}
              </Badge>
            )),
          )}
        </Flex>
      )}
      <Flex mt={8} wrap="wrap" justifyContent="space-evenly">
        {recipes.map(recipe => (
          <Card key={recipe.id} item={recipe} />
        ))}
      </Flex>
    </Flex>
  );
};

export default RecipesPage;
