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
import { useSearch } from "../pages/SearchContext";

export const Navigation = () => {
  const { searchTerm, setSearchTerm } = useSearch();

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
      <HStack mx={{ base: "1", md: "5" }}>
        <Link to="/">Home</Link>
        <Link to="/">Contact</Link>
      </HStack>

      <HStack mx={{ base: "1", md: "5" }}>
        <InputGroup>
          <Input
            placeholder="Search for events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
          <InputRightElement>
            <SearchIcon color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </Box>
  );
};
