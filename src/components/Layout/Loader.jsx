/* eslint-disable react/prop-types */
import { Spinner, VStack } from "@chakra-ui/react";

const Loader = ({ color = "purple.500" }) => {
  return (
    <VStack height={"100vh"} justifyContent={"center"}>
      <div style={{ transform: "scale(2)" }}>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="transparent"
          color={color}
          size={"xl"}
        />
      </div>
    </VStack>
  );
};

export default Loader;
