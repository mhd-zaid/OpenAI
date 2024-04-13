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
import {apiService} from "@/services/apiService.js";
import Pagination from "@/components/Pagination.jsx";

const RecipesPage = ({ type }) => {
    const [recipes, setRecipes] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]); // example: [{ type: 'tags', values: ['entree', 'plat']}]
    const [ nbRecipes, setNbRecipes ] = useState(0);
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 9;

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
        const getRecipes = async () => {
            let params = type === 'all' ? '' : `tags=${type}`;
            if (selectedFilters.length > 0) {
                const filterParams = selectedFilters.map(selectedFilter => {
                    return selectedFilter.values.map(value => {
                        return `${selectedFilter.type}=${value}`;
                    }).join('&');
                }).join('&');
                params += `&${filterParams}`;
            }

            const result = await apiService.getAll('recipes', params);
            if (result.data) {
                setRecipes(result.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
                setNbRecipes(result.data.length);
            }
        };

        getRecipes();
    }, [type, currentPage, selectedFilters]);

  useEffect(() => {
    setCurrentPage(1)
  }, [type]);


    useEffect(() => {
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

            const result = await apiService.getAll('recipes', filters);
            if (result.data) {
                setRecipes(result.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
                setNbRecipes(result.data.length);
            }
        };

        getRecipes();
        console.log("selectedFilters", selectedFilters);
    }, [selectedFilters]);

    const generateContentByType = (type) => {
        switch (type) {
            case 'ENTREE':
                return (
                    <>
                        <Text mt={4}>
                            Découvrez nos délicieuses recettes d'entrées qui éveilleront vos papilles et ouvriront votre appétit pour le repas à venir. Des salades fraîches aux hors-d'œuvre savoureux, vous trouverez ici des idées pour commencer votre repas en beauté.
                        </Text>
                        <Text mt={4}>
                            Parfaites pour les dîners légers ou les occasions spéciales, nos recettes d'entrées sont simples à préparer et pleines de saveurs qui plairont à tous.
                        </Text>
                    </>
                );
            case 'PLAT':
                return (
                    <>
                        <Text mt={4}>
                            Découvrez notre sélection de plats principaux savoureux qui combleront votre faim et régaleront vos convives. Des recettes familiales réconfortantes aux plats gastronomiques élaborés, nous avons quelque chose pour tous les goûts et toutes les occasions.
                        </Text>
                        <Text mt={4}>
                            Nos recettes de plats sont conçues pour être à la fois délicieuses et faciles à préparer, afin que vous puissiez passer moins de temps en cuisine et plus de temps à savourer de bons repas en famille et entre amis.
                        </Text>
                    </>
                );
            case 'DESSERT':
                return (
                    <>
                        <Text mt={4}>
                            Laissez-vous tenter par nos irrésistibles recettes de desserts qui vous séduiront par leur douceur et leur gourmandise. Du classique au créatif, nos desserts sont parfaits pour clôturer un repas en beauté ou pour satisfaire une envie de sucré à tout moment de la journée.
                        </Text>
                        <Text mt={4}>
                            Avec des ingrédients simples et des instructions faciles à suivre, nos recettes de desserts sont accessibles à tous les niveaux de compétence culinaire. Préparez-vous à régaler vos papilles et à faire des heureux autour de la table !
                        </Text>
                    </>
                );
            case 'BOISSON':
                return (
                    <>
                        <Text mt={4}>
                            Rafraîchissez-vous avec nos délicieuses recettes de boissons, parfaites pour toutes les occasions et toutes les saisons. Des cocktails raffinés aux smoothies énergisants, nous avons une boisson pour chaque moment de la journée.
                        </Text>
                        <Text mt={4}>
                            Nos recettes de boissons sont simples à préparer et peuvent être personnalisées selon vos préférences. Faites-vous plaisir et découvrez de nouvelles saveurs à partager avec vos proches !
                        </Text>
                    </>
                );
            case 'all':
                return (
                    <>
                        <Text mt={4}>
                            Découvrez une variété de recettes délicieuses et inspirantes pour tous les goûts. Que vous soyez novice en cuisine ou un chef expérimenté, vous trouverez ici des plats simples à préparer ainsi que des créations gastronomiques pour épater vos convives.
                        </Text>
                        <Text mt={4}>
                            Utilisez les filtres ci-dessous pour explorer nos recettes en fonction de vos préférences et de vos besoins. Vous pouvez filtrer par tags (entrée, plat, dessert, boisson) et par niveau de difficulté. N'hésitez pas à jouer avec les filtres pour trouver la recette parfaite pour chaque occasion !
                        </Text>
                    </>
                )
            default:
                return null;
        }
    };

    return (
        <Flex flexDir="column" w="full">
            <Heading fontSize="xl">Bienvenue dans notre collection de recettes !</Heading>
            {type && generateContentByType(type)}
            <Flex mt={4}>
                {filters.map(filter => (
                    !(type !== 'all' && filter.slug === 'tags') && (
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
                    )
                ))}
                <Button
                    variant="unstyled"
                    onClick={() => selectedFilters.length > 0 && setSelectedFilters([])}
                >
                    <Icon icon="system-uicons:reset"/>
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
                    <Card key={recipe.id} item={recipe}/>
                ))}
            </Flex>
            <div className={"w-full row justify-end"}>
                <Pagination
                    totalPages={Math.ceil(nbRecipes / itemsPerPage)}
                    currentPage={currentPage}
                    onPageChange={(newPage) => {
                        if (newPage >= 1 && newPage <= Math.ceil(nbRecipes / itemsPerPage)) {
                            setCurrentPage(newPage);
                        }
                    }}
                />
            </div>
        </Flex>
    );
};


export default RecipesPage;
