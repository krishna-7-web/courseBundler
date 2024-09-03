/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedData = await updateProfile({ name, email }).unwrap();

      toast.success(updatedData.message);
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
          children={"Update Profile"}
          my={"16"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Update Name"
            focusBorderColor="purple.400"
          />
          <Input
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Update Email"
            focusBorderColor="purple.400"
          />
          <Button
            isLoading={isLoading}
            w={"full"}
            colorScheme={"purple"}
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
