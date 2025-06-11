import React from "react";
import { Link } from "react-router-dom";
import {
  HStack,
  Input,
  Box,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

export const Navigation = () => {
  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack className="nav-links">
        <Link to="/">Events</Link>
        <Link to="/event/1">Event</Link>
      </HStack>

      <HStack className="search-box">
        <InputGroup>
          <Input placeholder="Search for events"></Input>
          <InputRightElement>
            <SearchIcon color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </Box>
  );
};
