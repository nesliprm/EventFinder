import { Heading, Box } from "@chakra-ui/react";
import heroImage from "../assets/heroimage01.jpg";

export const Header = () => {
  return (
    <Box
      bgImage={heroImage}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      h="300px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      <Heading fontSize="6xl">EventFinder</Heading>
    </Box>
  );
};
