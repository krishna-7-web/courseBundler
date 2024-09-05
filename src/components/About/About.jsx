/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import pic from "../../assets/docs/images/pic.webp";
import termsAndCondition from "../../assets/docs/termsAndConditions";

const Founder = () => (
  <Stack direction={["column", "row"]} spacing={["4", "16"]} padding={"8"}>
    <VStack>
      <Avatar src={pic} boxSize={["40", "48"]} />
      <Text children="Co-Founder" opacity={"0.7"} />
    </VStack>

    <VStack justifyContent={"center"} alignItems={["center", "flex-start"]}>
      <Heading children={"Krishna Raj Singh"} size={["md", "xl"]} />
      <Text
        children={
          "Hi, I am a full-stack developer. Our mission is to provide quality content at reasonable price."
        }
        textAlign={["center", "left"]}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      src={
        "https://res.cloudinary.com/dwfibnfkg/video/upload/v1725342006/CorseBundler/86c5381d-bd94-40fa-974a-f2f2b1f3c2f1.mp4"
      }
      autoPlay
      muted
      controls
      controlsList="nodownload nofullscreen disablePictureInPicture displayRemotePlayback"
    ></video>
  </Box>
);

const TandC = ({ termsAndCondition }) => (
  <Box>
    <Heading
      size={"md"}
      children={"Terms & Condition"}
      textAlign={["center", "left"]}
      my={"4"}
    />
    <Box h={"sm"} p={"4"} overflowY={"scroll"}>
      <Text
        fontFamily={"heading"}
        letterSpacing={"widest"}
        textAlign={["center", "left"]}
      >
        {termsAndCondition}
      </Text>

      <Heading
        my={"4"}
        size={"xs"}
        children={"Refund only Applicable for cancellation within 7 days."}
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={"container.lg"} padding={"9"} boxShadow={"lg"}>
      <Heading children={"About Us"} textAlign={["center", "left"]} />
      <Founder />

      <Stack m={["0", "8"]} direction={["column", "row"]} alignItems={"center"}>
        <Text fontFamily={"cursive"} textAlign={["center", "left"]}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          voluptatem quaerat eum ab suscipit quo dignissimos illum nesciunt.
        </Text>

        <Link to={"/subscribe"}>
          <Button variant={"ghost"} colorScheme="purple">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndCondition={termsAndCondition} />

      <HStack my={"4"} p={"4"}>
        <RiSecurePaymentFill />
        <Heading
          size={"xs"}
          fontFamily={"sans-serif"}
          textTransform={"uppercase"}
          children={"Payment is secured by Razorpay"}
        />
      </HStack>
    </Container>
  );
};

export default About;
