/* eslint-disable react/prop-types */
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { useLazyLogoutQuery } from "../../redux/api/userApi";

const LinkButton = ({ url = "/", title = "Home", onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLazyLogoutQuery();

  // const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await logout().unwrap(); // Trigger the logout request
      toast.success(response?.message || "Logged out successfully");
      navigate("/"); // Redirect to login page
    } catch (err) {
      toast.error(err.data?.message || "Failed to log out");
    }
    onClose();
  };

  return (
    <div>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={"purple"}
        width={"12"}
        height={"12"}
        rounded={"full"}
        zIndex={"overlay"}
        position={"fixed"}
        top={"6"}
        left={"6"}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={"blur(3px)"} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>COURSE BUNDLER</DrawerHeader>

          <DrawerBody>
            <VStack spacing={"4"} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />

              <HStack
                justifyContent={"space-evenly"}
                position={"absolute"}
                bottom={"2rem"}
                width={"80%"}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to={"/profile"}>
                          <Button variant={"ghost"} colorScheme="purple">
                            Profile
                          </Button>
                        </Link>

                        <Button
                          isLoading={isLoading}
                          variant={"ghost"}
                          onClick={logoutHandler}
                        >
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>

                      {user && user.role === "admin" && (
                        <Link onClick={onClose} to={"/admin/dashboard"}>
                          <Button colorScheme="purple" variant={"ghost"}>
                            <RiDashboardFill style={{ margin: "4px" }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to={"/login"}>
                      <Button colorScheme="purple">Login</Button>
                    </Link>

                    <p>OR</p>

                    <Link onClick={onClose} to={"/register"}>
                      <Button colorScheme="purple">Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
