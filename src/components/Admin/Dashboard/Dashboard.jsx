/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { useGetDashboardStatsQuery } from "../../../redux/api/userApi";
import Loader from "../../Layout/Loader";
import Sidebar from "../Sidebar";
import { DoughnutChart, LineChart } from "./Chart";

const Databox = ({ title, qty, qtyPercentege, profit }) => (
  <Box
    w={["full", "30%"]}
    boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
    p={"8"}
    borderRadius={"lg"}
  >
    <Text children={title} />

    <HStack spacing={"8"}>
      <Text fontSize={"2xl"} fontWeight={"bold"} children={qty} />

      <HStack>
        <Text children={`${qtyPercentege}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>

    <Text opacity={"0.6"} children={"Since Last Month"} />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py={"4"} px={["0", "20"]}>
    <Heading size={"sm"} children={title} mb={"2"} />

    <HStack w={"full"} alignItems={"center"}>
      <Text children={profit ? "0%" : `-${value}%`} />
      <Progress
        width={"full"}
        value={profit ? value : 0}
        colorScheme={"purple"}
      />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();

  return (
    <Grid
      overflowX={"auto"}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(), default` }}
    >
      {isLoading || !data?.stats ? (
        <Loader />
      ) : (
        <Box boxSizing={"border-box"} py={"16"} px={["4", "0"]}>
          <Text
            textAlign={"center"}
            opacity={"0.5"}
            children={`Last Chance was on ${
              String(new Date(data?.stats[11].createdAt)).split("G")[0]
            }`}
          />

          <Heading
            children={"Dashboard"}
            ml={["0", "16"]}
            mb={"16"}
            textAlign={["center", "left"]}
          />

          <Stack
            direction={["column", "row"]}
            minH={"24"}
            justifyContent={"space-evenly"}
          >
            <Databox
              title={"Views"}
              qty={data?.viewsCount}
              qtyPercentege={data?.viewsPercentage}
              profit={data?.viewsProfit}
            />
            <Databox
              title={"Users"}
              qty={data?.usersCount}
              qtyPercentege={data?.usersPercentage}
              profit={data?.usersProfit}
            />
            <Databox
              title={"Subscriptions"}
              qty={data?.subscriptiosCount}
              qtyPercentege={data?.subscriptionsPercentage}
              profit={data?.subscriptionsProfit}
            />
          </Stack>

          <Box
            m={["0", "16"]}
            borderRadius={"lg"}
            p={["0", "16"]}
            mt={["4", "16"]}
            boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
          >
            <Heading
              textAlign={["center", "left"]}
              size={"md"}
              children={"Views Graph"}
              pt={["8", "0"]}
              ml={["0", "4"]}
            />

            {/* Line graph here  */}
            <LineChart views={data?.stats.map((item) => item.views)} />
          </Box>

          <Grid templateColumns={["1fr", "2fr 1fr"]}>
            <Box p={"4"}>
              <Heading
                textAlign={["center", "left"]}
                size={"md"}
                children={"Progress Bar"}
                my={"8"}
                ml={["0", "16"]}
              />

              <Box>
                <Bar
                  profit={data?.viewsProfit}
                  title={"Views"}
                  value={data?.viewsPercentage}
                />
                <Bar
                  profit={data?.usersProfit}
                  title={"Users"}
                  value={data?.usersPercentage}
                />
                <Bar
                  profit={data?.subscriptionsProfit}
                  title={"Subscriptions"}
                  value={data?.subscriptionsPercentage}
                />
              </Box>
            </Box>

            <Box p={["0", "16"]} boxSizing={"border-box"} py={"4"}>
              <Heading
                textAlign={"center"}
                size={"md"}
                mb={"4"}
                children={"Users"}
              />

              {/* Doughnut graph  */}
              <DoughnutChart
                users={[
                  data?.subscriptiosCount,
                  data?.usersCount - data?.subscriptiosCount,
                ]}
              />
            </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
