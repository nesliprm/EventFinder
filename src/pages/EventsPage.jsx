import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  ListItem,
  List,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddEventForm } from "./AddEventForm";
import { useSearch } from "./SearchContext";

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
    <Box>
      <Heading fontSize="3xl">Upcoming Events</Heading>

      <HStack width="30%">
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
      </HStack>

      <Button onClick={onOpen}>Add a new event</Button>
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

      <List styleType="none">
        {filteredEvents.map((event) => {
          const start = new Date(event.startTime).toLocaleString();
          const end = new Date(event.endTime).toLocaleString();

          const categoryNames = event.categoryIds.map((id) => {
            const match = categories.find((category) => category.id === id);
            return match ? match.name : "Uncategorized";
          });

          return (
            <ListItem key={event.id} p="5">
              <Link to={`/event/${event.id}`}>
                <Text as="b" fontSize="xl">
                  {event.title}
                </Text>
              </Link>
              <Text fontSize="sm">{event.description}</Text>
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.description}
                  boxSize="xs"
                  objectFit="cover"
                  borderRadius="20"
                  p="2"
                />
              ) : null}

              <Text fontSize="sm">Starts: {start}</Text>
              <Text fontSize="sm">Ends: {end}</Text>
              <Text fontSize="sm">Categories: {categoryNames.join(", ")}</Text>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
