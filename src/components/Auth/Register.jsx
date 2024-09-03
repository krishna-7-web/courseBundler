/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/userApi";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  color: "#5c34b4",
  backgroundColor: "white",
  textAlign: "center",
};

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

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

      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("password", password);
      myForm.append("file", image);

      // Send the FormData directly to the register mutation
      const result = await register(myForm).unwrap();

      navigate("/profile");

      toast.success(result.message);
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <Container height={"95vh"}>
      <VStack height={"full"} justifyContent={"center"} spacing={"8"}>
        <Heading children={"Registration"} textTransform={"uppercase"} />

        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Box my={"4"} textAlign={"center"}>
            <Avatar size={"2xl"} src={imagePrev} />
          </Box>

          <Box my={"4"}>
            <FormLabel htmlFor="name" children={"Name"} />
            <Input
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
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
            <FormLabel htmlFor="password" children={"Password"} />
            <Input
              type="password"
              required
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your Password"
              focusBorderColor="purple.400"
            />
          </Box>

          <Box my={"4"}>
            <FormLabel htmlFor="chooseAvatar" children={"Choose Avatar"} />
            <Input
              accept="image/*"
              type="file"
              required
              id="chooseAvatar"
              onChange={changeImageHandler}
              focusBorderColor="purple.400"
              css={fileUploadStyle}
            />
          </Box>

          <Button
            isLoading={isLoading}
            my={"4"}
            colorScheme="purple"
            type="submit"
          >
            Sign Up
          </Button>

          <Box>
            Already Signed Up?{" "}
            <Link to={"/login"}>
              <Button colorScheme="purple" variant={"link"}>
                Login
              </Button>{" "}
            </Link>
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
