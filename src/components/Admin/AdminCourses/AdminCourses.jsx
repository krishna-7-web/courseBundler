/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  useAddLectureMutation,
  useDeleteCourseMutation,
  useDeleteLectureMutation,
  useGetAllCoursesQuery,
  useLazyGetCourseLecturesQuery,
} from "../../../redux/api/userApi";
import Sidebar from "../Sidebar";
import CourseModal from "./CourseModal";

const AdminCourses = () => {
  const { data } = useGetAllCoursesQuery({ category: "", keyword: "" });

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const [getCourseLectures, { isLoading, data: lectures }] =
    useLazyGetCourseLecturesQuery();

  const [deleteCourse, { isLoading: loading }] = useDeleteCourseMutation();

  const [addLecture, { isLoading: addLectureLoading }] =
    useAddLectureMutation();

  const [deleteLecture, { isLoading: deleteLoading }] =
    useDeleteLectureMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const courses = data?.courses;

  const courseDetailHandler = async (courseId, title) => {
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);

    try {
      await getCourseLectures(courseId).unwrap();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const deleteCourseHandler = async (courseId) => {
    try {
      const deletedCourse = await deleteCourse(courseId).unwrap();

      toast.success(deletedCourse.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    try {
      const deletedLecture = await deleteLecture({
        courseId,
        lectureId,
      }).unwrap();

      toast.success(deletedLecture.message);
    } catch (error) {
      toast.error(error.data.message);
    }
    console.log(courseId);
    console.log(lectureId);
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();

    try {
      const myForm = new FormData();

      myForm.append("title", title);
      myForm.append("description", description);
      myForm.append("file", video);

      const addedLecture = await addLecture({ courseId, myForm }).unwrap();

      toast.success(addedLecture.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(), default` }}
    >
      <Box p={["0", "16"]} overflowX={"auto"}>
        <Heading
          textTransform={"uppercase"}
          children={"All Courses"}
          my={"16"}
          textAlign={["center", "left"]}
        />

        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All availabel Courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses?.map((item) => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetailHandler={courseDetailHandler}
                  deleteUserHandler={deleteCourseHandler}
                  isLoading={isLoading}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures?.lectures}
          addLectureLoading={addLectureLoading}
          deleteLoading={deleteLoading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

function Row({
  item,
  courseDetailHandler,
  deleteUserHandler,
  isLoading,
  loading,
}) {
  return (
    <Tr>
      <Td>#{item?._id}</Td>
      <Td>
        <Image src={item?.poster?.url} />
      </Td>
      <Td>{item?.title}</Td>
      <Td textTransform={"uppercase"}>{item?.category}</Td>
      <Td>{item?.createdBy}</Td>
      <Td isNumeric>{item?.views}</Td>
      <Td isNumeric>{item?.numOfVideos}</Td>

      <Td>
        <HStack>
          <Button
            isLoading={isLoading}
            variant={"outline"}
            color={"purple.500"}
            onClick={() => courseDetailHandler(item._id, item?.title)}
          >
            View Lectures
          </Button>

          <Button
            isLoading={loading}
            color={"purple.600"}
            onClick={() => deleteUserHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
