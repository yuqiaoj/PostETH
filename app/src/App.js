import { useState, useEffect } from "react";
import Web3 from "web3";
import { contractAbi, contractAddress } from "./utils/constants";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";
import { Edit, Close, GitHub } from "@mui/icons-material";

const web3 = new Web3("ws://localhost:8545");
const boardContract = new web3.eth.Contract(contractAbi, contractAddress);

function App() {
  const [board, setBoard] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const getNotes = async () => {
    const notes = await boardContract.methods.getNotes().call();
    setBoard(notes);
    return notes;
  };

  const handleClose = () => {
    setOpen(false);
    setValue("");
  };

  const handlePost = async () => {
    if (value) {
      const date = Math.floor(new Date().getTime());

      await boardContract.methods
        .createNote(value, date)
        .send({ from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" });
      await getNotes();
    }
    handleClose();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: "#001e3c" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h4">PostETH</Typography>
            <Box>
              <Button
                sx={{
                  color: "primary.light",
                  borderRadius: "10px",
                  border: "2px solid rgb(19, 47, 76);",
                  py: 1,
                  px: 2,
                }}
                onClick={() => setOpen(true)}
                endIcon={<Edit />}
              >
                New Note
              </Button>
              <IconButton
                href="https://github.com/"
                target="_blank"
                sx={{
                  borderRadius: "10px",
                  border: "2px solid rgb(19, 47, 76);",
                  mx: 2,
                }}
              >
                <GitHub sx={{ color: "primary.light" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 3 }}>
        {board &&
          Array.from(board)
            .reverse()
            .map((note, i) => (
              <Paper
                key={i}
                elevation={4}
                sx={{ backgroundColor: "primary.dark", m: 2, p: 1 }}
              >
                <Typography>{note.text}</Typography>
                <Typography variant="caption" color="#bdbdbd">
                  {new Date(parseInt(note.date)).toLocaleTimeString() +
                    ", " +
                    new Date(parseInt(note.date)).toLocaleDateString()}
                </Typography>
              </Paper>
            ))}
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          New Post
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Post content..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "primary.light" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "primary.light" }} onClick={handlePost}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a1929",
    },
    primary: {
      light: "#90caf9",
      main: "#3f50b5",
      dark: "#001e3c",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: darkScrollbar(),
      }),
    },
  },
});

export default App;
