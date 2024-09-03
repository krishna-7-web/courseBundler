import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container height={"86.8vh"} p={"16"}>
      <VStack justifyContent={"center"} h={"full"} spacing={"4"}>
        <RiErrorWarningFill size={"5rem"} />
        <Heading my={"8"} textAlign={"center"}>
          Page Not Found
        </Heading>
        <Link to={"/"}>
          <Button variant={"ghost"}>Go to home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
