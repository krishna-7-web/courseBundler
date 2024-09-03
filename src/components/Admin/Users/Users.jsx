/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  useDeleteUsersMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../redux/api/userApi";
import Loader from "../../Layout/Loader";
import Sidebar from "../Sidebar";

const Users = () => {
  const { data, isLoading } = useGetAllUsersQuery();

  const [updateRole, { isLoading: updateRoleLoading }] =
    useUpdateUserRoleMutation();

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUsersMutation();

  const users = data?.users;

  const updateRoleHandler = async (userId) => {
    try {
      const updatedRole = await updateRole(userId).unwrap();

      toast.success(updatedRole.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const deleteUserHandler = async (userId) => {
    try {
      const deletedUser = await deleteUser(userId).unwrap();

      toast.success(deletedUser.message);
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
      {isLoading ? (
        <Loader />
      ) : (
        <Box p={["0", "16"]} overflowX={"auto"}>
          <Heading
            textTransform={"uppercase"}
            children={"All Users"}
            my={"16"}
            textAlign={["center", "left"]}
          />

          <TableContainer w={["100vw", "full"]}>
            <Table variant={"simple"} size={"lg"}>
              <TableCaption>All availabel users in the database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscriptions</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {users?.map((item) => (
                  <Row
                    key={item._id}
                    item={item}
                    updateRoleHandler={updateRoleHandler}
                    deleteUserHandler={deleteUserHandler}
                    updateRoleLoading={updateRoleLoading}
                    deleteUserLoading={deleteUserLoading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({
  item,
  updateRoleHandler,
  deleteUserHandler,
  updateRoleLoading,
  deleteUserLoading,
}) {
  return (
    <Tr>
      <Td>#{item?._id}</Td>
      <Td>{item?.name}</Td>
      <Td>{item?.email}</Td>
      <Td>{item?.role}</Td>
      <Td>
        {item?.subscription?.status === "active" ? "Active" : "Not Active"}
      </Td>
      <Td>
        <HStack>
          <Button
            isLoading={updateRoleLoading}
            variant={"outline"}
            color={"purple.500"}
            onClick={() => updateRoleHandler(item._id)}
          >
            Change Role
          </Button>

          <Button
            isLoading={deleteUserLoading}
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
