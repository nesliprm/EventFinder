import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      setEvents(events);
    }

    fetchEvents();
  }, []);

  return (
    <Box>
      <Heading>List of events</Heading>
      <UnorderedList>
        {events.map((event) => {
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
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};
