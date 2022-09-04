import React, { useState, useContext, Fragment } from "react";
import { Container, Paper, Button, Table, TextField, Box, Modal, Typography, Alert, Collapse, IconButton } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {  AppContext } from "../context/AppState";
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Tasks({ postList }) {
  const [edited, setEdited] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isEditActionData, setIsEditActionData] = useState({
    state: false,
    task: { title: "", description: ""}
  });
  const { posts } = useContext(AppContext);
  const { deletePost, editPost } = useContext(AppContext);

  const paperStyle = { padding: "50px 20px", margin: "20px auto" };
  const marginStyle = { margin: "10px 0", width: "100%" };
  const submitButtonStyle = { marginTop: "10px", width: "100%" };

  function removeTask(id) {
    try {
      const task = { id };
      console.log(task);
      fetch("http://localhost:8080/task/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      }).then(() => {
        deletePost(id);
        console.log("Task deleted");
      });
    } catch (error) {
      alert(error);
    }
  }

  const editTask = (e, title, description) => {
    e.preventDefault();
    const { task } = isEditActionData;
    
    try {
      fetch('http://localhost:8080/task/update', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: task.id,
          title: title,
          description: description
        }),
      }).then(() => {
        editPost({
          id: task.id, 
          title, 
          description 
        });
        console.log("Task updated");
        setEdited(true)
        handleClose();
      });
    } catch (error) {
      alert(error);
    }
  }

  const GetEdit = () => {
    const { task } = isEditActionData;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
      <Modal 
        open={open}
        onClose={handleClose}
      >
        <Fragment>
          <Box sx={style}>
            <form onSubmit={(event) => editTask(event, title, description)}>
              <TextField style={marginStyle} name="title" onChange={(e) => setTitle(e.target.value)} placeholder={task.title} value={ title ? title : task.title} />
              <TextField style={marginStyle} name="description" onChange={(e) => setDescription(e.target.value)} placeholder={task.description} value={ description ? description : task.description} />
              <Button style={submitButtonStyle} type="submit" size="small" variant="contained" color="primary">Save</Button>
            </form>
          </Box>
        </Fragment>
    </Modal>
    )
  }

  return (
    <Container>
          <Box sx={{ width: '100%' }}>
          <Collapse in={edited}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    setEdited(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Task Updated!
            </Alert>
          </Collapse>
        </Box>
      <Paper style={paperStyle} elevation={3}>
        <h2 style={{ paddingTop: "10px", marginRight: "100px" }}> Tasks</h2>
        <TableContainer component={Paper}>
        {
          isEditActionData.state && (
          <GetEdit task={isEditActionData} />
        )
      }
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">
                  Title
                </TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((task, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{task.createDate}</TableCell>
                  <TableCell align="right">{task.title}</TableCell>
                  <TableCell align="right">{task.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setOpen(true)
                        setIsEditActionData({
                          state: true,
                          task: task
                        })
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        removeTask(task.id)
                      }}
                      // task-close={() => setShow(!show)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    
    </Container>
  );
}
