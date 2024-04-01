import moment from 'moment/moment.js';
import {Rating, ThemeProvider, Typography} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ratingTheme from '@/theme/ratingTheme.js';
import {
    Box,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Circle,
    Container,
    Flex,
    Grid,
    GridItem, Img,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import Button from "@/lib/components/Button.jsx";
import {Icon} from "@iconify/react";

const CommentComponent = ({ comments, recipeUrl, limit }) => {
    const displayedComments = limit ? comments?.slice(0, limit) : comments;
    const url = window.location.href.split("/");
    const isProfile = url[url.length - 1] === "profile";

    return (

      <div>
          <SimpleGrid columns={2} spacingY={4}>
              {displayedComments?.map((comment) => (
                isProfile ? (
                  <Container>
                      <Card shadow={"md"} h={"full"}>
                          <CardHeader>
                              <Flex gap={4}>
                                  <Img src={`/img/recipe/${comment.Recipe.image}`}
                                       alt={recipeUrl} width={135} height={75} className={"rounded"}/>
                                  <Text fontFamily={"sans-serif"} fontWeight={700}>{comment.Recipe.title}</Text>
                              </Flex>
                          </CardHeader>
                          <CardBody gap={4}>
                              <Text>{comment.comment}</Text>
                          </CardBody>
                          <CardFooter>
                              <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                                  <ThemeProvider theme={ratingTheme}>
                                      <Rating name="half-rating" value={comment.Recipe.average_rating} precision={0.5} readOnly={true}/>
                                  </ThemeProvider>
                                  <Text fontSize={"smaller"} color={"gray.400"}>31/03/2024</Text>
                              </Flex>
                          </CardFooter>
                      </Card>
                  </Container>
                ) : (
                  <Container>
                      <Card shadow={"md"} h={"full"}>
                          <CardHeader>
                              <Flex gap={4}>
                                  <Text fontFamily={"sans-serif"} fontWeight={700}>{comment.User.userName}</Text>
                              </Flex>
                          </CardHeader>
                          <CardBody gap={4}>
                              <Text>{comment.comment}</Text>
                          </CardBody>
                          <CardFooter>
                              <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                                  <ThemeProvider theme={ratingTheme}>
                                      <Rating name="half-rating" value={comment.rating} precision={0.5} readOnly={true}/>
                                  </ThemeProvider>
                                  <Text fontSize={"smaller"} color={"gray.400"}>{moment(comment.createdAt).format('DD/MM/YYYY')}</Text>
                              </Flex>
                          </CardFooter>
                      </Card>
                  </Container>
                )
              ))}
          </SimpleGrid>

          {limit && comments?.length > limit && (
            <div className={"w-full text-center my-4"}>
                <Link to={`/recettes/${recipeUrl}/comments`}
                      className={"text-yellow-400 font-medium underline text-center"}>Lire plus</Link>
            </div>
          )}
      </div>
    );
};

export default CommentComponent;