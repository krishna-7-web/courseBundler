/* eslint-disable react/prop-types */
import { Button, VStack } from "@chakra-ui/react";
import {
  RiCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const LinkButton = ({ url, Icon, text, active }) => (
  <Link to={`/admin/${url}`}>
    <Button
      fontSize={["larger", "medium", "larger"]}
      variant={"ghost"}
      colorScheme={active ? "purple" : ""}
    >
      <Icon style={{ margin: "4px" }} />
      {text}
    </Button>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();

  return (
    <VStack
      spacing={"5"}
      py={"16"}
      boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
    >
      <LinkButton
        url={"dashboard"}
        Icon={RiDashboardFill}
        text={"Dashboard"}
        active={location.pathname === "/admin/dashboard"}
      />

      <LinkButton
        url={"createcourse"}
        Icon={RiCircleFill}
        text={"Create Course"}
        active={location.pathname === "/admin/createcourse"}
      />

      <LinkButton
        url={"courses"}
        Icon={RiEyeFill}
        text={"Courses"}
        active={location.pathname === "/admin/courses"}
      />

      <LinkButton
        url={"users"}
        Icon={RiUser3Fill}
        text={"Users"}
        active={location.pathname === "/admin/users"}
      />
    </VStack>
  );
};

export default Sidebar;
