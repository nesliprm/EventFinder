import { Heading, Box } from "@chakra-ui/react";
import heroImage from "../assets/heroimage01b.jpg";

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
      <Heading fontFamily="Monoton" fontWeight="normal" fontSize="8xl">
        EventFinder
      </Heading>
    </Box>
  );
};
