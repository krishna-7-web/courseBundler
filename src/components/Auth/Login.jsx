/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApi";
// import { setUser } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize the login mutation hook
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();

      toast.success(result.message);
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <Container height={"87vh"}>
      <VStack height={"full"} justifyContent={"center"} spacing={"16"}>
        <Heading children={"Welcome to Course Bundler"} />

        <form onSubmit={submitHandler} style={{ width: "100%" }}>
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

          <Box>
            <Link to={"/forgetpassword"}>
              <Button fontSize={"sm"} variant={"link"}>
                Forget Password
              </Button>
            </Link>
          </Box>

          <Button
            isLoading={isLoading}
            my={"4"}
            colorScheme="purple"
            type="submit"
          >
            Login
          </Button>

          <Box>
            New User?{" "}
            <Link to={"/register"}>
              <Button colorScheme="purple" variant={"link"}>
                Sign Up
              </Button>{" "}
            </Link>
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
