import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export const AddEventForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormLabel>Starts</FormLabel>
        <Input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <FormLabel>Ends</FormLabel>
        <Input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <FormLabel>Category</FormLabel>
        <Input
          type="text"
          value={categoryIds.join(",")}
          onChange={(e) => setCategoryIds(e.target.value.split(","))}
        />
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};
