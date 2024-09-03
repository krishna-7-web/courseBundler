/* eslint-disable react/no-children-prop */
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForgetPasswordMutation } from "../../redux/api/userApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const forgetedPassword = await forgetPassword(email).unwrap();

      toast.success(forgetedPassword.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Container padding={"16"} h={"86.8vh"}>
      <form onSubmit={submitHandler}>
        <VStack height={"full"} spacing={"8"}>
          <Heading
            children={"Forget Password"}
            my={"16"}
            textTransform={"uppercase"}
            textAlign={["center", "left"]}
          />
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            focusBorderColor="purple.400"
          />
          <Button
            isLoading={isLoading}
            type="submit"
            w={"full"}
            colorScheme="purple"
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
