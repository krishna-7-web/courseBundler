/* eslint-disable react/no-children-prop */
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/api/userApi";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const changedPassword = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      toast.success(changedPassword.message);
      navigate("/profile");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Container py={"16"} minH={"87vh"}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={"uppercase"}
          children={"Change Password"}
          my={"16"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input
            type="password"
            required
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            placeholder="Old Password"
            focusBorderColor="purple.400"
          />
          <Input
            type="password"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="New Password"
            focusBorderColor="purple.400"
          />
          <Button
            isLoading={isLoading}
            w={"full"}
            colorScheme={"purple"}
            type="submit"
          >
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
