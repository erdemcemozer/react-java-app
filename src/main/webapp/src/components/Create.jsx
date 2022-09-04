import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import { AppProvider, AppContext } from "../context/AppState";

export default function Task(props) {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const marginStyle = { marginTop: "20px" };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createDate, setCreateDate] = useState("");


  const { addPost } = useContext(AppContext);

  const submitCreateForm = (e) => {
    e.preventDefault();
    try {
      const task = { title, description, createDate };
      fetch("http://localhost:8080/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      }).then(() => {
        addPost({ title, description, createDate });
        setTitle("");
        setDescription("");
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h2>Create a task</h2>

        <form
          onSubmit={(event) => submitCreateForm(event)}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Task Name"
            variant="outlined"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target?.value)}
          />
          <br />
          <TextField
            style={marginStyle}
            id="outlined-basic"
            label="Decription"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target?.value)}
          />

          <Button
            onClick={(event) => {
              submitCreateForm(event);
            }}
            style={marginStyle}
            color="success"
            variant="contained"
          >
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
