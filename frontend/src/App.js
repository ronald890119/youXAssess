import styles from "./App.module.css";
import HomePage from './pages/HomePage';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { loadAsync, remove, add } from "./state/uniSlice";

function App() {
  // it is used for updating state
  const dispatch = useDispatch();

  // load university data from database
  const loadFromDB = () => {
    axios
      .get("http://localhost:5000/uni/load")
      .then((res) => {
        dispatch(loadAsync(res.data))
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // load university data from API
  const loadFromAPI = () => {
    axios
      .get("http://universities.hipolabs.com/search?country=Australia")
      .then((res) => {
        dispatch(loadAsync(res.data))
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className={styles.App}>
      <HomePage/>
      <div className={styles.buttonContainer}>
        <Stack spacing={{ xs: 3, sm: 2 }} direction="row" justifyContent="center" useFlexGap flexWrap="wrap">
          <Button variant="load" style={{backgroundColor: '#95b222'}} onClick={loadFromAPI}>Load</Button>
          <Button variant="delete" style={{backgroundColor: '#95b222'}} onClick={() => dispatch(remove())}>Delete</Button>
          <Button variant="add" style={{backgroundColor: '#95b222'}} onClick={() => dispatch(add())}>Add</Button>
          <Button variant="database" style={{backgroundColor: '#95b222'}} onClick={loadFromDB}>Load from Database</Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
