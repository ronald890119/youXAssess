import styles from "./App.module.css";
import HomePage from './pages/HomePage';
import { useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  // variable to store API data
  const [uniData, setUniData] = useState([]);

  // onClick function to fetch data from API
  const load = () => {
    axios
      .get("http://universities.hipolabs.com/search?country=Australia")
      .then((res) => {
        console.log(res);
        setUniData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // onClick function to remove last item of array
  const deletion = () => {
    const temp = [...uniData];
    temp.pop();
    setUniData(temp);
  }

  // onClick function to append the first item to the end of array
  const add = () => {
    const temp = [...uniData];
    if(temp.length > 0) {
      temp.push(temp[0]);
      setUniData(temp);
    }
  }

  return (
    <div className={styles.App}>
      <HomePage uniData={uniData}/>
      <div className={styles.buttonContainer}>
        <Stack spacing={{ xs: 3, sm: 2 }} direction="row" justifyContent="center" useFlexGap flexWrap="wrap">
          <Button variant="load" style={{backgroundColor: '#95b222'}} onClick={() => load()}>Load</Button>
          <Button variant="delete" style={{backgroundColor: '#95b222'}} onClick={() => deletion()}>Delete</Button>
          <Button variant="add" style={{backgroundColor: '#95b222'}} onClick={() => add()}>Add</Button>
          <Button variant="database" style={{backgroundColor: '#95b222'}}>Load from Database</Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
