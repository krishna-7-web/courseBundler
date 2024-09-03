/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  useAddToPlaylistMutation,
  useGetAllCoursesQuery,
} from "../../redux/api/userApi";
import Loader from "../Layout/Loader";

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image src={imageSrc} boxSize={60} objectFit={"contain"} />
      <Heading
        textAlign={["center", "left"]}
        maxW={"200px"}
        size={"sm"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text
          fontWeight={"bold"}
          textTransform={"uppercase"}
          children={"Creator"}
        />
        <Text
          fontFamily={"body"}
          textTransform={"uppercase"}
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={"center"}
        size={"xs"}
        children={`Lectures - ${lectureCount}`}
      />

      <Heading size={"xs"} children={`Views - ${views}`} />

      <Stack direction={["column", "row"]}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="purple">Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={"ghost"}
          colorScheme="purple"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([""]);

  // Directly call the hook with query parameters
  const { data, isLoading } = useGetAllCoursesQuery({
    category,
    keyword,
  });

  const [addToPlaylist, { isLoading: loading }] = useAddToPlaylistMutation();

  const addToPlaylistHandler = async (courseId) => {
    try {
      const addedToPlaylist = await addToPlaylist(courseId).unwrap();

      toast.success(addedToPlaylist.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const categories = [
    "Web Development",
    "Artificial Intelligence",
    "Data Structure & Algorithim",
    "App Development",
    "Data Science",
    "Game Developer",
  ];

  return isLoading ? (
    <Loader />
  ) : (
    data && (
      <Container minH={"95vh"} maxW={"container.lg"} padding={"8"}>
        <Heading children={"All Courses"} m={"8"} />

        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search a course..."
          type="text"
          focusBorderColor="purple.400"
        />

        <HStack
          overflowX={"auto"}
          padding={"8"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {categories.map((item, index) => (
            <Button onClick={() => setCategory(item)} key={index} minW={"60"}>
              <Text children={item} />
            </Button>
          ))}
        </HStack>

        <Stack
          direction={["column", "row"]}
          flexWrap={"wrap"}
          justifyContent={["flex-start", "space-evenly"]}
          alignItems={["center", "flex-start"]}
        >
          {data?.courses.length > 0 ? (
            data?.courses?.map((course) => (
              <Course
                key={course._id}
                title={course.title}
                description={course.description}
                views={course.views}
                imageSrc={course.poster.url}
                id={course._id}
                creator={course.createdBy}
                lectureCount={course.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <Heading>Courses Not Found</Heading>
          )}
        </Stack>
      </Container>
    )
  );
};

export default Courses;
