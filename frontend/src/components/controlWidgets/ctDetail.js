import PieChart_ from "../plots/PieChart_.js";
import BarChart_ from "../plots/BarChart_.js";

let CityDetailed1 = (props) => {
  const dt = props.dt;
  const ct = props.ct;
  const vn = props.vn;
  let bd = [];
  let empty = true;
  for (let fd of Object.keys(dt)) {
    if (dt[fd] > 0) {
      empty = false;
      let tmp = { "name": fd, value: dt[fd] };
      bd.push(tmp);
    }
  }
  console.log(bd);

  if (empty) {
    return <div>
    <h4>{ct}: {vn}</h4>
    No data
    </div>
  }

  return <div style={{width: "100%", height: "380px"}}>
    <h4>{ct}: {vn}</h4>
    <PieChart_ data={bd} keyName={"name"} height={300} width={620} />
    </div>
}

let CityDetailed = (props) => {
  const dt = props.dt;
  const ct = props.ct;
  const vn = props.vn;
  let bd = [];
  for (let fd of Object.keys(dt)) {
    let tmp = { "name": fd, [vn]: dt[fd] };
      bd.push(tmp);
  }
  console.log(bd);
  return <div style={{width: "100%", height: "380px"}}>
    <h4>{ct}: {vn}</h4>
    <BarChart_ data={bd} keyName={"name"} keyList={[vn]} brush_flag={false} height={300} width={620} />
    </div>
}

export { CityDetailed, CityDetailed1 };