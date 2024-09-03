/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  useCancelSubscriptionMutation,
  useRemoveFromPlaylistMutation,
  useUpdateProfilePictureMutation,
} from "../../redux/api/userApi";
import { fileUploadCss } from "../Auth/Register";

const Profile = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeProfilePic, { isLoading }] = useUpdateProfilePictureMutation();

  const [removeFromPlaylist, { isLoading: loading }] =
    useRemoveFromPlaylistMutation();

  const [cancelSubscription, { isLoading: subscriptionLoading }] =
    useCancelSubscriptionMutation();

  const removeFromPlaylistHandler = async (id) => {
    try {
      const removedFromPlaylist = await removeFromPlaylist(id).unwrap();

      toast.success(removedFromPlaylist.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      myForm.append("file", image);

      // Send the FormData directly to the register mutation
      const changedProfilePic = await changeProfilePic(myForm).unwrap();

      toast.success(changedProfilePic.message);
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  const cancelSubscriptionHandler = async () => {
    try {
      const canceledSubscription = await cancelSubscription().unwrap();

      toast.success(canceledSubscription.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Container minH={"95vh"} maxW={"container.lg"} py={"8"}>
      <Heading children={"Profile"} m={"8"} textTransform={"uppercase"} />
      <Stack
        direction={["column", "row"]}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={["8", "16"]}
        padding={"8"}
      >
        <VStack>
          <Avatar boxSize={"48"} src={user.avatar.url} />
          <Button
            isLoading={isLoading}
            onClick={onOpen}
            colorScheme="purple"
            variant={"ghost"}
          >
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
          <HStack>
            <Text children={"Name"} fontWeight={"bold"} />
            <Text children={user.name} />
          </HStack>

          <HStack>
            <Text children={"Email"} fontWeight={"bold"} />
            <Text children={user.email} />
          </HStack>

          <HStack>
            <Text children={"Created At"} fontWeight={"bold"} />
            <Text children={user.createdAt.split("T")[0]} />
          </HStack>

          {user.role !== "admin" && (
            <HStack>
              <Text children={"Subscription"} fontWeight={"bold"} />
              {user?.subscription?.status === "active" ? (
                <Button
                  onClick={cancelSubscriptionHandler}
                  color={"purple.500"}
                  variant={"ghost"}
                  isLoading={subscriptionLoading}
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={"/subscribe"}>
                  <Button colorScheme="purple">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={["column", "row"]} alignItems={"center"}>
            <Link to={"/updateprofile"}>
              <Button>Update Profile</Button>
            </Link>

            <Link to={"/changepassword"}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children={"Playlist"} size={"md"} my={"8"} />

      {user.playlist.length > 0 && (
        <Stack
          direction={["column", "row"]}
          alignItems={"center"}
          flexWrap={"wrap"}
          p={"4"}
        >
          {user.playlist.map((element) => (
            <VStack w={"48"} m={"2"} key={element.course}>
              <Image
                boxSize={"full"}
                objectFit={"contain"}
                src={element.poster}
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={"ghost"} colorScheme="purple">
                    Watch Now
                  </Button>
                </Link>
                <Button
                  isLoading={loading}
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        isLoading={isLoading}
      />
    </Container>
  );
};

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  isLoading,
}) {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev("");
    setImage("");
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                {imagePrev && <Avatar src={imagePrev} boxSize={"48"} />}
                <Input
                  type="file"
                  css={{ "&:: file-selector-button": fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={isLoading}
                  w={"full"}
                  colorScheme={"purple"}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button onClick={closeHandler} mr={"3"}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Profile;
