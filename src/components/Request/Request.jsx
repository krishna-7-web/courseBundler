/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCourseRequestMutation } from "../../redux/api/userApi";

const Request = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const [courseRequest, { isLoading }] = useCourseRequestMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const courseReq = await courseRequest({ name, email, course }).unwrap();

      toast.success(courseReq.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Container h={"86.8vh"}>
      <VStack h={"full"} spacing={"16"} justifyContent={"center"}>
        <Heading children={"Request New Course"} />
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Box my={"4"}>
            <FormLabel htmlFor="name" children={"Name"} />
            <Input
              type="name"
              required
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Abc"
              focusBorderColor="purple.400"
            />
          </Box>

          <Box my={"4"}>
            <FormLabel htmlFor="email" children={"Email Address"} />
            <Input
              type="email"
              required
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="abc@gmail.com"
              focusBorderColor="purple.400"
            />
          </Box>

          <Box my={"4"}>
            <FormLabel htmlFor="course" children={"Course"} />
            <Textarea
              name="course"
              id="course"
              onChange={(e) => setCourse(e.target.value)}
              value={course}
              placeholder="Explain the course..."
              focusBorderColor="purple.400"
            ></Textarea>
          </Box>

          <Button
            isLoading={isLoading}
            my={"4"}
            colorScheme="purple"
            type="submit"
          >
            Send Mail
          </Button>

          <Box>
            See available course!{" "}
            <Link to={"/courses"}>
              <Button colorScheme="purple" variant={"link"}>
                Click
              </Button>{" "}
            </Link>
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};
export default Request;
