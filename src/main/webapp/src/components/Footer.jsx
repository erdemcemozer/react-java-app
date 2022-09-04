import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function GuestFooter() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Copyright © 2022 Erdem Ozer
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  );
}
