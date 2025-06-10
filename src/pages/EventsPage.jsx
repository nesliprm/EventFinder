import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

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
      <Heading>List of events</Heading>
      <UnorderedList>
        {events.map((event) => {
          const start = new Date(event.startTime).toLocaleString();
          const end = new Date(event.endTime).toLocaleString();

          const categoryNames = event.categoryIds.map((id) => {
            const match = categories.find((category) => category.id === id);
            return match ? match.name : "Uncategorized";
          });

          return (
            <ListItem key={event.id} p="5">
              <Text as="b" fontSize="xl">
                {event.title}
              </Text>
              <Text fontSize="sm">{event.description}</Text>
              <Image
                src={event.image}
                alt={event.description}
                boxSize="xs"
                objectFit="cover"
                borderRadius="20"
                p="2"
              />
              <Text fontSize="sm">Starts: {start}</Text>
              <Text fontSize="sm">Ends: {end}</Text>
              <Text fontSize="sm">Categories: {categoryNames.join(", ")}</Text>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};
