/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import logo from "../../assets/docs/images/courseBundler.jpg";
import {
  server,
  useGetRazorpayKeyQuery,
  useLazyBuySubscriptionQuery,
} from "../../redux/api/userApi";

const Subscribe = ({ user }) => {
  const { data } = useGetRazorpayKeyQuery();

  const [buySubscription, { isLoading }] = useLazyBuySubscriptionQuery();

  const subscribeHandler = async () => {
    try {
      const key = data?.key;

      const buyedSubscription = await buySubscription().unwrap();

      if (buyedSubscription?.subscriptionId) {
        // Open PopUp only after confirming the subscription ID
        const options = {
          key,
          name: "courseBundler",
          description: "Get access to all premium content",
          image: logo,
          subscription_id: buyedSubscription.subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "@krishnaraj2538 at Instagram",
          },
          theme: {
            color: "#9f7aea",
          },
        };

        const razor = new window.Razorpay(options);

        razor.open();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Container height={"86.8vh"} padding={["8", "16"]}>
      <Heading children={"Welcome"} my={"8"} textAlign={"center"} />

      <VStack
        boxShadow={"lg"}
        alignItems={"stretch"}
        borderRadius={"lg"}
        spacing={"0"}
      >
        <Box bg={"purple.400"} p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color={"white"} children={`Pro Pack ₹299.00`} />
        </Box>

        <Box p={"4"}>
          <VStack textAlign={"center"} px={["0", "8"]} mt={"4"} spacing={"8"}>
            <Text children={"Join pro pack to access to all content."} />
            <Heading size={"md"} children={"₹299.00 Only"} />
          </VStack>

          <Button
            my={"8"}
            w={"full"}
            colorScheme="purple"
            onClick={subscribeHandler}
            isLoading={isLoading}
          >
            Buy Now
          </Button>
        </Box>

        <Box
          bg={"blackAlpha.800"}
          p={"4"}
          css={{ borderRadius: "0 0 8px 8px" }}
        >
          <Heading
            color={"white"}
            size={"sm"}
            children={"100% Refund at Cancelation"}
            textTransform={"uppercase"}
          />
          <Text
            fontSize={"xs"}
            color={"white"}
            children={"*Terms & Condition Apply"}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
