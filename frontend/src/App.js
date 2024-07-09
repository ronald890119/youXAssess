import styles from "./App.module.css";
import HomePage from './pages/HomePage';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { loadAsync, remove, add, update_operationMessage} from "./state/uniSlice";
import Update from "./components/Update";

function App() {
  // load message from redux
  const messages = useSelector(state => state.uniData.messages);

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

  // add first university to the end
  const addFirst = () => {
    axios
      .post("http://localhost:5000/uni/add")
      .then((res) => {
        const {data} = res;
        if(data.error_code === 0) {
          console.log("Added successfully");
          dispatch(update_operationMessage("Added successfully"));
          setTimeout(() => dispatch(update_operationMessage("")), 2000);
          loadFromDB();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deletion = () => {
    axios
      .delete("http://localhost:5000/uni/delete")
      .then((res) => {
        const {data} = res;
        if(data.error_code === 0) {
          console.log("Deleted successfully");
          dispatch(update_operationMessage("Deleted successfully"));
          setTimeout(() => dispatch(update_operationMessage("")), 2000);
          loadFromDB();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      <Update />
      <div className={styles.operationContainer}>
        <label>Database Operations Area</label>
        <div>
          <label>{messages.operationMessage}</label>
        </div>
        <Stack spacing={{ xs: 3, sm: 2 }} direction="row" justifyContent="center" useFlexGap flexWrap="wrap">
          <Button variant="delete" style={{backgroundColor: '#95b222', marginTop: '0.5rem'}} onClick={deletion}>Delete</Button>
          <Button variant="add" style={{backgroundColor: '#95b222', marginTop: '0.5rem'}} onClick={addFirst}>Add</Button>
        </Stack>
      </div>
      <div style={{marginTop: '3rem', marginBottom: '3rem'}}>
        <label>End of Page</label>
      </div>
    </div>
  );
}

export default App;
