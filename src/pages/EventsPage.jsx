import React, { useEffect, useState } from "react";
import { Heading, Box } from "@chakra-ui/react";

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
      <ul>
        {events.map((event) => {
          return <li key={event.id}>- {event.title}</li>;
        })}
      </ul>
    </Box>
  );
};
