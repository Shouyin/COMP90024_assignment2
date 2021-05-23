import { Fab, Paper } from '@material-ui/core';
import { useState } from 'react';

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";



let DetailStream = (props) => {

  const comp = props.comp;
  let displayComp = [];

  const [show, setShow] = useState(true);

  const oncl = () => {
    setShow(!show);
  }

  for (let i of Object.keys(comp)) {
    displayComp.push(comp[i]);
    // console.log(comp[i]);
  }
  
  return <Paper elevation={3} style={{
    padding: "32px", backgroundColor: "rgba(255, 255, 255,0.9)", zIndex: 1,
    position: "fixed", right: show ? "0px" : "calc(128px - 60vw)",
    top: "0px", height: "95vh", width: "60vw", overflow: "scroll",
    backdropFilter: "blur(8px)"
  }}>
    <div style={{display: "flex", textAlign: "center", verticalAlign: "center"}}>
      <Fab variant="extended" color="primary" aria-label="expand" onClick={oncl}>
        {show ? <ArrowForwardIos style={{marginRight: "16px"}} /> : <ArrowBackIos style={{marginRight: "16px"}} />}
        {show ? "Collapse" : "Scenarios"}
    </Fab>
    </div>
    {displayComp}
  </Paper>;
}

export default DetailStream;