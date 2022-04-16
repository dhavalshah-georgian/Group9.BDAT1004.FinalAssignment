import React, { Component } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const options = {
  title: "Employees's Performance",
  legend: { position: "bottom" },
  colors: ["#3366CC", "#78d499", "#e7711c"],
};

export const workOptions = {
  title: "Employees's work hours",
  legend: { position: "bottom" },
}

export const hikeOptions = {
  title: "Employees's salary hike %",
  legend: { position: "bottom" },
  colors: ["#78d499"],
}

export const ageOptions = {
  title: "Employees's age",
  legend: { position: "bottom" },
  colors: ["#e7711c"],
}

class Charts extends Component {
  workData = [["Name", "Work hours"]]
  hikeData = [["Name", "Salary hike %"]]
  ageData = [["Name", "Age"]]

  graphdata = [["Name", "Salary Hike %", "Work Hours", "Age"]];

  newgraphdata = [];
  istrue = false;

  async componentDidMount() {
    console.log("componentDidMount");
    let temp = [["Name", "Salary Hike %", "Work Hours", "Age"]];
    let tempHike = [["Name", "Salary Hike %"]];
    let tempWork = [["Name", "Work Hours"]];
    let tempAge = [["Name", "Age"]];
    axios({
      method: "get",
      url: "https://dataprogram.herokuapp.com/api/emps/",
      // url: "http://127.0.0.1:8000/api/emps/",
      responseType: "stream",
    }).then(function (response) {
      let json = response.data.data;
      for (const key in json) {
        if (Object.hasOwnProperty.call(json, key)) {
          const element = json[key];
          tempWork.push([element.emp_name, element.work_hrs]);
          tempHike.push([element.emp_name, element.emp_hike]);
          tempAge.push([element.emp_name, element.age]);
          temp.push([element.emp_name, element.emp_hike, element.work_hrs, element.age]);
        }
      }
    });
    this.graphdata = temp;
    this.workData = tempWork;
    this.hikeData = tempHike;
    this.ageData = tempAge;
    this.setState({});
  }

  render() {
    return (
          <div className="graph-main">
            <div className="graph-container">
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={this.workData}
                options={workOptions}
              />
              <Chart
                chartType="AreaChart"
                width="100%"
                height="400px"
                data={this.hikeData}
                options={hikeOptions}
              />
              <Chart
                chartType="Histogram"
                width="100%"
                height="400px"
                data={this.ageData}
                options={ageOptions}
              />

              <Chart
                chartType="ScatterChart"
                width="100%"
                height="400px"
                data={this.graphdata}
                options={options}
              />
              <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={this.graphdata}
                options={options}
              />
            </div>
          </div>
    );
  }
}

export default Charts;
