import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { getUserList } from "./Service";
import moment from "moment";

export default class LineDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userArray: [],
      labels: [],
      distictIndexArray:[],
      countArray:[]
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("Token");
    getUserList(token).then(Response => {
      let array = Response.data.data;
      this.setState(
        {
          userArray: array.reverse()
        },
        () => {
          let array = [];
          this.state.userArray.map(user => {
            array.push(moment(user.createdDate).format("MMM YYYY"));
          });
          console.log(array);
          let distictIndexArray = [];
          let countArray = [];
          let count = 0;
          let i = 0;
          let currentIndex = array[0];
          for (i; i < array.length; i++) {
            if (currentIndex === array[i]) {
              count++;
            } else {
              distictIndexArray.push(currentIndex);
              countArray.push(count);
              currentIndex = array[i];
              count = 0;
              i--;
            }
          }
          distictIndexArray.push(currentIndex);
          countArray.push(count);

          this.setState({
            distictIndexArray: distictIndexArray,
            countArray: countArray
          });
        }
      );
    });

    const { datasets } = this.refs.chart.chartInstance.data;
    console.log(datasets[0].data);
  }
  render() {
    const data = {
      labels:this.state.distictIndexArray,
      datasets: [
        {
          label: "",
          fill: false,
          lineTension: 0.1,
          borderColor: "rgba(75,192,192,1)",
          data: this.state.countArray
        }
      ]
    };
    return (
      <div>
        <Line ref="chart" data={data} />
      </div>
    );
  }
}
