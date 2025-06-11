import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  Card,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddEventForm } from "./AddEventForm";
import { useSearch } from "./SearchContext";
import mockImage from "../assets/mockeventimage.jpg";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { searchTerm } = useSearch();

  const filteredEvents = events
    .filter((event) =>
      selectedCategory === "uncategorized"
        ? event.categoryIds.length === 0
        : selectedCategory === "showAll" || selectedCategory === ""
        ? true
        : event.categoryIds.includes(Number(selectedCategory))
    )

    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      setEvents(events);
    }

    async function fetchCategories() {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
      setCategories(categories);
    }

    fetchEvents();
    fetchCategories();
  }, []);

  return (
    <Box maxW="container.lg" mx="auto" p={4}>
      <Heading my="10" fontSize="5xl">
        Upcoming Events
      </Heading>
      <HStack>
        {" "}
        <Box width="30%">
          <Select
            placeholder="filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="showAll">show all</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="uncategorized">uncategorized</option>
          </Select>
        </Box>
        <Text as="b">OR</Text>
        <Button onClick={onOpen}>Add a new event</Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new event:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm
              onSubmit={(newEvent) => {
                setEvents((prev) => [...prev, newEvent]);
                setSelectedCategory("");
              }}
              onClose={onClose}
              categories={categories}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box my={10} display="grid" gap={6}>
        {filteredEvents.map((event) => {
          const start = new Date(event.startTime).toLocaleString();
          const end = new Date(event.endTime).toLocaleString();

          const categoryNames = event.categoryIds.map((id) => {
            const match = categories.find((category) => category.id === id);
            return match ? match.name : "Uncategorized";
          });

          return (
            <Card
              key={event.id}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              borderRadius="20"
              _hover={{
                boxShadow: "md",
                transform: "translate(-1px)",
                transition: "all 0.1s ease-in-out",
              }}
            >
              <Stack
                display="flex"
                irection="column"
                p={6}
                flex="1"
                justify="space-between"
              >
                <Box>
                  <Link to={`/event/${event.id}`}>
                    <Heading as="b" fontSize="3xl">
                      {event.title}
                    </Heading>
                  </Link>
                  <Text py="2" fontSize="md">
                    {event.description}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm">Starts: {start}</Text>
                  <Text fontSize="sm">Ends: {end}</Text>
                  <Text fontSize="sm">
                    Categories: {categoryNames.join(", ")}
                  </Text>
                </Box>
              </Stack>

              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.description}
                  boxSize="xs"
                  objectFit="cover"
                  alignSelf="stretch"
                />
              ) : (
                <Image
                  src={mockImage}
                  alt={event.description}
                  boxSize="xs"
                  objectFit="cover"
                  alignSelf="stretch"
                />
              )}
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
