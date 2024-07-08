import styles from "./App.module.css";
import HomePage from './pages/HomePage';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { loadAsync, remove, add, update_alpha_two_code, update_name, update_domains, update_web_pages, 
  update_country, update_state_province, update_foundUni, update_operationMessage, update_errorMessage,
  update_success, update_number} from "./state/uniSlice";
import SearchIcon from '@mui/icons-material/Search';

function App() {
  // load redux state
	const state = useSelector(state => state.uniData.uniObj);
  const messages = useSelector(state => state.uniData.messages);

  // it is used for updating state
  const dispatch = useDispatch();

  // search university from database with given number
  const search = () => {
    axios
      .get(`http://localhost:5000/uni/retrieve/${messages.number - 1}`)
      .then((res) => {
        if(res.data) {
          console.log(res.data);
          dispatch(update_alpha_two_code(res.data["alpha_two_code"]));
          dispatch(update_name(res.data["name"]));
          dispatch(update_domains(res.data["domains"].join()));
          dispatch(update_web_pages(res.data["web_pages"].join()));
          dispatch(update_country(res.data["country"]));
          if(res.data["state-province"]) {
            dispatch(update_state_province(res.data["state-province"]));
          } else {
            dispatch(update_state_province(""));
          }

          dispatch(update_foundUni(true));
        } else {
          console.log("NULL");
          dispatch(update_alpha_two_code(""));
          dispatch(update_name(""));
          dispatch(update_domains(""));
          dispatch(update_web_pages(""));
          dispatch(update_country(""));
          dispatch(update_state_province(""));
          dispatch(update_foundUni(false));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

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

  function validation() {
    return state.alpha_two_code.length > 0 && state.name.length > 0 && state.domains.length > 0 && state.web_pages.length > 0 &&
      state.country.length > 0;
  }

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

  // update university
  const update = () => {
    if(validation()) {
      dispatch(update_errorMessage(""));
      axios
      .put("http://localhost:5000/uni/update", {
        index: messages.number - 1,
        alpha_two_code: state.alpha_two_code,
        name: state.name,
        domains: state.domains.split(","),
        web_pages: state.web_pages.split(","),
        country: state.country,
        state_province: state.state_province
      })
      .then((res) => {
        const {data} = res;
        if(data.error_code === 0) {
          dispatch(update_alpha_two_code(""));
          dispatch(update_name(""));
          dispatch(update_domains(""));
          dispatch(update_web_pages(""));
          dispatch(update_country(""));
          dispatch(update_state_province(""));

          dispatch(update_success("Success!"));
          setTimeout(() => dispatch(update_success("")), 2000);
          dispatch(update_foundUni(false));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      dispatch(update_errorMessage("Fields with * are required"));
      setTimeout(() => dispatch(update_errorMessage("")), 2000);
    }
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
      <div className={styles.inputContainer}>
        <label>Update University (Database Operation)</label>
        <div style={{marginTop: '2rem'}}>
          <label>Enter the number of the university to be updated (from the table): </label>
          <TextField
              required
              id="number"
              label="Number"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              style={{width: '20%'}}
              value={messages.number}
              defaultValue={1}
              onChange={(e) => {dispatch(update_number(e.target.value))}}
          />
          <SearchIcon className={styles.icon} onClick={search}/>
        </div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              disabled={!messages.foundUni}
              id="alpha_two_code"
              label="Alpha two code"
              value={state.alpha_two_code}
              onChange={(e) => {dispatch(update_alpha_two_code(e.target.value))}}
            />
            <TextField
              required
              disabled={!messages.foundUni}
              id="name"
              label="Name"
              value={state.name}
              onChange={(e) => {dispatch(update_name(e.target.value))}}
            />
            <TextField
              required
              disabled={!messages.foundUni}
              id="domains"
              label="Domains"
              value={state.domains}
              onChange={(e) => {dispatch(update_domains(e.target.value))}}
            />
          </div>
          <div>
            <TextField
              required
              disabled={!messages.foundUni}
              id="web_pages"
              label="Web pages"
              value={state.web_pages}
              onChange={(e) => {dispatch(update_web_pages(e.target.value))}}
            />
            <TextField
              required
              disabled={!messages.foundUni}
              id="country"
              label="Country"
              value={state.country}
              onChange={(e) => {dispatch(update_country(e.target.value))}}
            />
            <TextField
              disabled={!messages.foundUni}
              id="state-province"
              label="State province"
              value={state.state_province}
              onChange={(e) => {dispatch(update_state_province(e.target.value))}}
            />
          </div>
        </Box>
        <div>
          <label>Hint: Separate different domains and web pages by using comma</label>
        </div>
        <div className={styles.errorMessage}>
          <label>{messages.errorMessage}</label>
        </div>
        <div>
          <label>{messages.success}</label>
        </div>
        <Button disabled={!messages.foundUni} variant="create" style={{backgroundColor: '#95b222', marginTop: '0.5rem'}} onClick={update}>Update University</Button>
      </div>
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
