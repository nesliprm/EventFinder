import { Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import heroImage from "../assets/heroimage01b.jpg";

export const Header = () => {
  return (
    <Link to={`/`}>
      <Box
        bgImage={heroImage}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        h={{ base: "150px", md: "300px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        textAlign="center"
      >
        <Heading
          fontFamily="Monoton"
          fontWeight="normal"
          fontSize={{ base: "4xl", md: "6xl" }}
        >
          EventFinder
        </Heading>
      </Box>
    </Link>
  );
};
