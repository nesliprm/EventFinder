import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text, Button } from "@chakra-ui/react";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadEvent() {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
    }

    async function loadCategories() {
      const response = await fetch(`http://localhost:3000/categories`);
      const data = await response.json();
      setCategories(data);
    }

    loadEvent();
    loadCategories();
  }, [eventId]);

  useEffect(() => {
    if (!event) return;
    async function loadCreator() {
      const response = await fetch(
        `http://localhost:3000/users/${event.createdBy}`
      );
      const data = await response.json();
      setCreator(data);
    }
    loadCreator();
  }, [event]);

  if (!event) return "Loading...";

  const categoryNames = event.categoryIds.map((id) => {
    const match = categories.find((category) => category.id === id);
    return match?.name ?? "Uncategorized";
  });

  return (
    <Box>
      <Heading>{event.title}</Heading>
      {creator?.name ? (
        <Box>
          <Text>Created by {creator.name}</Text>{" "}
          <Image
            src={creator.image}
            alt={creator.name}
            boxSize="100px"
            objectFit="cover"
            borderRadius="full"
          />
        </Box>
      ) : (
        "Unknown creator"
      )}

      {event.image && (
        <Image
          src={event.image}
          alt={event.description}
          boxSize="md"
          objectFit="cover"
          borderRadius="20"
          p="2"
        />
      )}
      <Text>{event.description}</Text>
      <Text fontSize="sm">
        Starts: {new Date(event.startTime).toLocaleString()}
      </Text>
      <Text fontSize="sm">
        Ends: {new Date(event.endTime).toLocaleString()}
      </Text>
      {categoryNames.map((name) => (
        <Text fontSize="sm" key={name}>
          Categories: {name}
        </Text>
      ))}

      <Button size="sm" m="1">
        Edit
      </Button>
      <Button size="sm" m="1" colorScheme="red">
        Delete
      </Button>
    </Box>
  );
};
