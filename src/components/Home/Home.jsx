import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import "./home.css";
import vg from "../../assets/docs/images/pic.webp";
import { Link } from "react-router-dom";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height={"100%"}
          justifyContent={["center", "space-between"]}
          alignItems={"center"}
          spacing={["16", "56"]}
        >
          <VStack
            width={"full"}
            alignItems={["center", "flex-end"]}
            spacing={"8 "}
          >
            <Heading size={"xl"}>LEARN FROM THE EXPERTS</Heading>
            <Text
              textAlign={["center", "left"]}
              fontSize={"2xl"}
              fontFamily={"cursive"}
            >
              Find Valuable content At Resonable Price
            </Text>
            <Link to={"/courses"}>
              <Button size={"lg"} colorScheme="purple">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={"md"}
            src={vg}
            objectFit={"contain"}
          />
        </Stack>
      </div>

      <Box padding={"8"} bg={"blackAlpha.900"}>
        <Heading textAlign={"center"} fontFamily={"body"} color={"white"}>
          OUR BRANDS
        </Heading>
        <HStack
          className="brandsBanner"
          justifyContent={"space-evenly"}
          marginTop={"8"}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          src={
            "https://res.cloudinary.com/dwfibnfkg/video/upload/v1725342006/CorseBundler/86c5381d-bd94-40fa-974a-f2f2b1f3c2f1.mp4"
          }
          // autoPlay
          controls
          controlsList="nodownload nofullscreen displayRemotePlayback"
        ></video>
      </div>
    </section>
  );
};

export default Home;
