import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import React from "react";

import regionsa3 from "../../aurin_data/regions/sa3.json";
import regionsa4 from "../../aurin_data/regions/sa4.json";
import regionlga from "../../aurin_data/regions/lga2018.json";


import DisplayMap from "../displayMap.js";
import { defaultViewport } from "../../consts/consts.js";
import geojsonAULess from "../../shapes/geojsonAUless.json";


import { initLabour, initMedicare, initTourism } from "../../aurin_data/p.js";
import { getCityLocMap } from "../../aurin_data/map.js";


import WordCloud_ from "../plots/WordCloud_.js"

const Disabled = "disable";

// str.strip
let trim = (name) => {
  return name.replace(/^\s+|\s+$/g, "");
};

// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();
};

init();



let Detailed = (props) => {
  const location = props.location;
  const state = props.state;

  return <div>
    <h2>Scenario 2</h2>
      <wordcloudDetailed location={location} /> 
  </div>
}


let wordcloudDetailed = (props) => {

  const location = props.location;

  const data_1 = {"Australian Capital Territory": [{
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'correct',
    value: 10,
  },
  {
    text: 'day',
    value: 54,
  },
  {
    text: 'prescription',
    value: 12,
  },
  {
    text: 'time',
    value: 77,
  },
  {
    text: 'thing',
    value: 45,
  },
  {
    text: 'left',
    value: 19,
  },
  {
    text: 'pay',
    value: 13,
  },
  {
    text: 'people',
    value: 32,
  },
  {
    text: 'month',
    value: 22,
  },
  {
    text: 'again',
    value: 35,
  },
  {
    text: 'review',
    value: 24,
  },
  {
    text: 'call',
    value: 38,
  },
  {
    text: 'doctor',
    value: 70,
  },
  {
    text: 'asked',
    value: 26,
  },
  {
    text: 'finally',
    value: 14,
  },
  {
    text: 'insurance',
    value: 29,
  },
  {
    text: 'week',
    value: 41,
  },
  {
    text: 'called',
    value: 49,
  },
  {
    text: 'problem',
    value: 20,
  }],"Greater Brisbane":[{
    text: 'going',
    value: 59,
  },
  {
    text: 'help',
    value: 49,
  },
  {
    text: 'felt',
    value: 45,
  },
  {
    text: 'discomfort',
    value: 11,
  },
  {
    text: 'lower',
    value: 22,
  },
  {
    text: 'severe',
    value: 12,
  },
  {
    text: 'free',
    value: 38,
  },
  {
    text: 'better',
    value: 54,
  },
  {
    text: 'muscle',
    value: 14,
  },
  {
    text: 'neck',
    value: 41,
  },
  {
    text: 'root',
    value: 24,
  },
  {
    text: 'adjustment',
    value: 16,
  },
  {
    text: 'therapy',
    value: 29,
  },
  {
    text: 'injury',
    value: 20,
  },
  {
    text: 'excruciating',
    value: 10,
  },
  {
    text: 'chronic',
    value: 13,
  },
  {
    text: 'chiropractor',
    value: 35,
  },
  {
    text: 'treatment',
    value: 59,
  },
  {
    text: 'tooth',
    value: 32,
  },
  {
    text: 'chiropractic',
    value: 17,
  },
  {
    text: 'dr',
    value: 77,
  },
  {
    text: 'relief',
    value: 19,
  }],"Greater Melbourne":[{
    text: 'shoulder',
    value: 26,
  },
  {
    text: 'nurse',
    value: 17,
  },
  {
    text: 'room',
    value: 22,
  },
  {
    text: 'hour',
    value: 35,
  },
  {
    text: 'wait',
    value: 38,
  },
  {
    text: 'hospital',
    value: 11,
  },
  {
    text: 'eye',
    value: 13,
  },
  {
    text: 'test',
    value: 10,
  },
  {
    text: 'appointment',
    value: 49,
  },
  {
    text: 'medical',
    value: 19,
  },
  {
    text: 'question',
    value: 20,
  },
  {
    text: 'office',
    value: 64,
  },
  {
    text: 'care',
    value: 54,
  },
  {
    text: 'minute',
    value: 29,
  },
  {
    text: 'waiting',
    value: 16,
  },
  {
    text: 'patient',
    value: 59,
  },
  {
    text: 'health',
    value: 49,
  },
  {
    text: 'alternative',
    value: 24,
  },
  {
    text: 'holistic',
    value: 19,
  },
  {
    text: 'traditional',
    value: 20,
  },
  {
    text: 'symptom',
    value: 29,
  },
  {
    text: 'internal',
    value: 17,
  },
  {
    text: 'prescribed',
    value: 26,
  },
  {
    text: 'acupuncturist',
    value: 16,
  },
  {
    text: 'pain',
    value: 64,
  },
  {
    text: 'integrative',
    value: 10,
  },
  {
    text: 'herb',
    value: 13,
  },
  {
    text: 'sport',
    value: 22,
  }], "Greater Sydney":[{
    text: 'physician',
    value: 41,
  },
  {
    text: 'herbal',
    value: 11,
  },
  {
    text: 'eastern',
    value: 12,
  },
  {
    text: 'chinese',
    value: 32,
  },
  {
    text: 'acupuncture',
    value: 45,
  },
  {
    text: 'prescribe',
    value: 14,
  },
  {
    text: 'medication',
    value: 38,
  },
  {
    text: 'western',
    value: 35,
  },
  {
    text: 'sure',
    value: 38,
  },
  {
    text: 'work',
    value: 64,
  },
  {
    text: 'smile',
    value: 17,
  },
  {
    text: 'teeth',
    value: 26,
  },
  {
    text: 'pair',
    value: 11,
  },
  {
    text: 'wanted',
    value: 20,
  },
  {
    text: 'frame',
    value: 13,
  },
  {
    text: 'lasik',
    value: 10,
  },
  {
    text: 'amazing',
    value: 41,
  },
  {
    text: 'fit',
    value: 14,
  },
  {
    text: 'happy',
    value: 22,
  },
  {
    text: 'feel',
    value: 49,
  },
  {
    text: 'glasse',
    value: 19,
  },
  {
    text: 'vision',
    value: 12,
  },
  {
    text: 'pressure',
    value: 16,
  },
  {
    text: 'find',
    value: 29,
  },
  {
    text: 'experience',
    value: 59,
  },
  {
    text: 'year',
    value: 70,
  },
  {
    text: 'massage',
    value: 35,
  },
  {
    text: 'best',
    value: 54,
  },
  {
    text: 'mouth',
    value: 20,
  },
  {
    text: 'staff',
    value: 64,
  }]}

  const items = [];

  for (const city of location) {
    items.push(
      <WordCloud_ words={data_1[city]}> </WordCloud_>
    )
  }

  return (
  <div> 
    {items}
  </div>)
}


export default function ScenarioTwoControl(props) {
  // console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenariotwo";

  // const RadioButtonList = [LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA];

  const onlySwitch = "Enable";

  let inst = {onlySwitch: false};

  const [state, setState] = React.useState(inst);


  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);

    newState[onlySwitch] ? addComp(
      key, <Detailed state={newState} location={location} />
    ): delComp(key);
  };


  let Radios = () => {
    let children = [];
    
    children.push(
      <FormControlLabel
        control={
          <Checkbox onChange={handleChange} name={onlySwitch} />
        }
        label={onlySwitch}
      />
    );
    return children;
  };

  return <FormGroup>{Radios()}</FormGroup>;
}
