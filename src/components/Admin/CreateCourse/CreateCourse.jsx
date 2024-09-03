/* eslint-disable react/no-children-prop */
import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../../redux/api/userApi";
import { fileUploadCss } from "../../Auth/Register";
import Sidebar from "../Sidebar";

const CreateCourse = () => {
  const navigate = useNavigate();

  const categories = [
    "Web Development",
    "Artificial Intelligence",
    "Data Structure & Algorithim",
    "App Development",
    "Data Science",
    "Game Developer",
  ];

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const myForm = new FormData();

      myForm.append("title", title);
      myForm.append("description", description);
      myForm.append("createdBy", createdBy);
      myForm.append("category", category);
      myForm.append("file", image);

      const createdCourse = await createCourse(myForm).unwrap();

      toast.success(createdCourse.message);
      navigate("/admin/courses");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(), default` }}
    >
      <Container py={"16"}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={"uppercase"}
            children={"Create Course"}
            my={"16"}
            textAlign={["center", "left"]}
          />

          <VStack m={"auto"} spacing={"8"}>
            <Input
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
              focusBorderColor="purple.400"
            />
            <Input
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Discription"
              focusBorderColor="purple.400"
            />
            <Input
              type="text"
              required
              onChange={(e) => setCreatedBy(e.target.value)}
              value={createdBy}
              placeholder="Creator Name"
              focusBorderColor="purple.400"
            />
            <Select
              focusBorderColor="purple.400"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value={""}>Category</option>

              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              type="file"
              required
              onChange={changeImageHandler}
              focusBorderColor="purple.400"
              css={{
                "&::file-selector-button": fileUploadCss,
              }}
            />

            {imagePrev && (
              <Image src={imagePrev} boxSize={"64"} objectFit={"contain"} />
            )}

            <Button
              isLoading={isLoading}
              w={"full"}
              colorScheme="purple"
              type="submit"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
