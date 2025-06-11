import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
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

      <Button onClick={onEditOpen} size="sm" m="1">
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

      <Button onClick={onDeleteOpen} size="sm" m="1" colorScheme="red">
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
            This action cannot be undone. This will permanently delete the event
            and remove its data from our system.
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
  );
};
