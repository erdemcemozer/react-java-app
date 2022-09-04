import { useContext, useState } from "react";
import { Container, Paper, Button, Table } from "@mui/material";

const EditForm = ({ task }) => {
  const id = theEmployee.id;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const { updateEmployee } = useContext(EmployeeContext);

  const updatedEmployee = { id, name, email, address, phone };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(id, updatedEmployee);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Address"
          rows={3}
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Edit Employee
      </Button>
    </Form>
  );
};
