/* eslint-disable react/no-children-prop */
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/userApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resetedPassword = await resetPassword({
        params,
        password,
      }).unwrap();

      toast.success(resetedPassword.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }

    navigate("/login");
  };

  return (
    <Container padding={"16"} h={"86.8vh"}>
      <form onSubmit={submitHandler}>
        <Heading
          children={"Reset Password"}
          my={"16"}
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />

        <VStack height={"full"} spacing={"8"}>
          <Input
            type="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            focusBorderColor="purple.400"
          />
          <Button
            isLoading={isLoading}
            type="submit"
            w={"full"}
            colorScheme="purple"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
