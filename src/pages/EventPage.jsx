import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Stack,
  HStack,
  Card,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { AddEventForm } from "./AddEventForm";
import mockImage from "../assets/mockeventimage.jpg";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [categories, setCategories] = useState([]);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const toast = useToast();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

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

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      toast({ title: "Event deleted.", status: "success" });
      onDeleteClose();
      navigate("/");
    } else {
      toast({ title: "Action failed.", status: "error" });
    }
  };

  return (
    <Box maxW="container.lg" mx="auto" p={4}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        my={{ base: 5, md: 10 }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
      >
        <Heading fontSize={{ base: "3xl", md: "5xl" }}>
          Event: {event.title}
        </Heading>
        <Box role="buttons-group">
          <Button onClick={onEditOpen} size="xs" m="1">
            Edit
          </Button>
          <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit event:</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <AddEventForm
                  event={event}
                  onSubmit={(updatedEvent) => {
                    setEvent(updatedEvent);
                    toast({ title: "Event updated", status: "success" });
                  }}
                  onClose={onEditClose}
                  categories={categories}
                />
              </ModalBody>
            </ModalContent>
          </Modal>

          <Button onClick={onDeleteOpen} size="xs" m="1" colorScheme="red">
            Delete
          </Button>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
            isOpen={isDeleteOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Are you sure?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                This action cannot be undone. This will permanently delete the
                event and remove its data from our system.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} colorScheme="red" ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      </Stack>
      <Card
        variant="unstyled"
        gap={4}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
      >
        <Stack
          display="flex"
          direction="column"
          flex="1"
          justify="space-between"
        >
          {creator?.name ? (
            <HStack align="center">
              <Text fontSize={{ base: "xs", md: "md" }}>
                Created by <Text as="b">{creator.name}</Text>
              </Text>

              <Image
                src={creator.image}
                alt={creator.name}
                boxSize="50px"
                objectFit="cover"
                borderRadius="full"
              />
            </HStack>
          ) : (
            "Unknown creator"
          )}

          <Box role="time-group">
            <Text fontSize="sm">
              Starts:{" "}
              {new Date(event.startTime).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
            <Text fontSize="sm">
              Ends:{" "}
              {new Date(event.endTime).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
          </Box>
          <Box role="description-group">
            <Text as="b">{event.description}</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ornare ex at orci dapibus lacinia. Aenean nec lacinia est, at
              rhoncus lorem. Vestibulum et sapien pellentesque, eleifend tortor
              ac, aliquet urna. Nullam pellentesque suscipit posuere. Etiam
              posuere eleifend lorem auctor pretium. Proin vitae lectus velit.
              Aenean mattis suscipit turpis in facilisis. Duis nisi orci,
              tincidunt eget augue at, lobortis pulvinar dui. Mauris facilisis
              volutpat vestibulum.
            </Text>
          </Box>

          <Text fontSize="sm">Categories: {categoryNames.join(", ")}</Text>
        </Stack>

        {event.image ? (
          <Image
            src={event.image}
            alt={event.description}
            boxSize="md"
            objectFit="cover"
            borderRadius="20"
            p="2"
          />
        ) : (
          <Image
            src={mockImage}
            alt={event.description}
            boxSize="md"
            objectFit="cover"
            borderRadius="20"
            p="2"
          />
        )}
      </Card>
      <Box fontSize="sm" color="gray.500">
        <Link to="/">↰ Back to events list</Link>
      </Box>
    </Box>
  );
};
