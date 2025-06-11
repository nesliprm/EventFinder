import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

export const AddEventForm = ({ event, onClose, categories, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, startTime, endTime, categoryIds };
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newEvent = await response.json();
    onSubmit(newEvent);
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
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FormLabel>Starts</FormLabel>
        <Input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <FormLabel>Ends</FormLabel>
        <Input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <FormLabel>Category</FormLabel>
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
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};
