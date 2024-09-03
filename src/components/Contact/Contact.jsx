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
import { useContactMutation } from "../../redux/api/userApi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [contact, { isLoading }] = useContactMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const contactData = await contact({ name, email, message }).unwrap();

      toast.success(contactData.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Container h={"86.8vh"}>
      <VStack h={"full"} spacing={"16"} justifyContent={"center"}>
        <Heading children={"Contact Us"} />
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Box my={"4"}>
            <FormLabel htmlFor="name" children={"Name"} />
            <Input
              type="name"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              focusBorderColor="purple.400"
            />
          </Box>

          <Box my={"4"}>
            <FormLabel htmlFor="message" children={"Message"} />
            <Textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message..."
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
            Request for a course?{" "}
            <Link to={"/request"}>
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

export default Contact;
