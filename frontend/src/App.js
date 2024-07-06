import styles from "./App.module.css";
import HomePage from './pages/HomePage';
import { useEffect, useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { loadAsync, remove, add } from "./state/uniSlice";

function App() {
  // variable to store API data
  const [uniData, setUniData] = useState([]);
  const dispatch = useDispatch();

  // load university data at the beginning
  useEffect(() => {
    axios
      .get("http://universities.hipolabs.com/search?country=Australia")
      .then((res) => {
        setUniData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div className={styles.App}>
      <HomePage/>
      <div className={styles.buttonContainer}>
        <Stack spacing={{ xs: 3, sm: 2 }} direction="row" justifyContent="center" useFlexGap flexWrap="wrap">
          <Button variant="load" style={{backgroundColor: '#95b222'}} onClick={() => dispatch(loadAsync(uniData))}>Load</Button>
          <Button variant="delete" style={{backgroundColor: '#95b222'}} onClick={() => dispatch(remove())}>Delete</Button>
          <Button variant="add" style={{backgroundColor: '#95b222'}} onClick={() => dispatch(add())}>Add</Button>
          <Button variant="database" style={{backgroundColor: '#95b222'}}>Load from Database</Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
