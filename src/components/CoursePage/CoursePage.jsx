/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import { useGetCourseLecturesQuery } from "../../redux/api/userApi";
import Loader from "../Layout/Loader";

const CoursePage = ({ user }) => {
  const params = useParams();
  const [lectureNumber, setLectureNumber] = useState(0);

  const { data, isLoading } = useGetCourseLecturesQuery(params.id);

  try {
    if (
      user.role !== "admin" &&
      (user.subscription === undefined || user.subscription.status !== "active")
    ) {
      return <Navigate to={"/subscribe"} />;
    }
  } catch (error) {
    toast.error(error?.data?.message);
  }

  const lectures = data?.lectures;

  return isLoading ? (
    <Loader />
  ) : (
    <Grid minH={"87vh"} templateColumns={["1fr", "3fr 1fr"]}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={"100%"}
              src={lectures[lectureNumber]?.video?.url}
              // autoPlay
              controls
              controlsList="nodownload displayRemotePlayback"
            ></video>
            <Heading
              size={"lg"}
              m={4}
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />
            <Heading size={"lg"} m={4}>
              Description
            </Heading>
            <Text m={4}> {lectures[lectureNumber].description}</Text>
          </Box>

          <VStack>
            {lectures.map((item, index) => (
              <button
                key={item._id}
                style={{
                  width: "100%",
                  padding: "1rem",
                  textAlign: "center",
                  margin: 0,
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => setLectureNumber(index)}
              >
                <Text noOfLines={1}>
                  #{index + 1} {item.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading textAlign={"center"} alignContent={"center"}>
          No Lectures
        </Heading>
      )}
    </Grid>
  );
};

export default CoursePage;
