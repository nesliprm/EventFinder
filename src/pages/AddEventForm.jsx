import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

export const AddEventForm = ({ event, onClose, categories, onSubmit }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");
  const [categoryIds, setCategoryIds] = useState(event?.categoryIds || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, startTime, endTime, categoryIds };

    const url = event
      ? `http://localhost:3000/events/${event.id}`
      : "http://localhost:3000/events";

    const method = event ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resultEvent = await response.json();
    onSubmit(resultEvent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormLabel mt={3}>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FormLabel mt={3}>Starts</FormLabel>
        <Input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <FormLabel mt={3}>Ends</FormLabel>
        <Input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <FormLabel mt={3}>Category</FormLabel>
        <Select
          value={categoryIds}
          onChange={(e) => setCategoryIds([Number(e.target.value)])}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Button type="submit" my={5}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};
