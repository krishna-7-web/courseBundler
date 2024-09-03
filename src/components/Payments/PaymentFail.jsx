/* eslint-disable react/no-children-prop */
import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <Container height={"86.8vh"} p={"16"}>
      <VStack justifyContent={"center"} h={"full"} spacing={"4"}>
        <RiErrorWarningFill size={"5rem"} />
        <Heading my={"8"} textAlign={"center"}>
          Payment Fail
        </Heading>
        <Link to={"/subscribe"}>
          <Button variant={"ghost"}>Try Again</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFail;
