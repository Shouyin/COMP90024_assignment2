import {
  Fab, Paper, FormGroup, FormControlLabel,
  Checkbox, InputLabel, MenuItem, FormControl, Select, Slider, ListSubheader, CircularProgress,
  Chip, Button
} from '@material-ui/core';

import { ExpandLess, ExpandMore } from "@material-ui/icons";

let DT = (props) => {
  const t = props.t;
  const collaps = props.collaps;
  const setCollaps = props.setCollaps;

  return <div style={{
    display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    <h2 style={{ marginRight: "18px" }}>{t}</h2>
    <Button variant="outlined" color="secondary" onClick={() => {setCollaps(!collaps)}}>
    {collaps ? <ExpandMore style={{marginRight: "6px"}} /> : <ExpandLess style={{marginRight: "6px"}} />}
    {collaps ? "Show" : "Collapse"}
    </Button>
  </div>
}

export default DT;