import React, { Component } from "react";
import { getLocationWiseUserCount } from "./Service";
import "../CssFiles/location.css";
class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryArray: [],
      topThreeCountries: []
    };
  }
  count = () => {
    let count = 0;
    count = count + 1;
    return count;
  };
  componentDidMount() {
    let token = localStorage.getItem("Token");
    getLocationWiseUserCount(token)
      .then(Response => {
        this.setState(
          {
            countryArray: Response.data.data
          },
          () => {
            let array = [];
            array.push(this.state.countryArray[0]);
            array.push(this.state.countryArray[1]);
            array.push(this.state.countryArray[2]);
            this.setState({
              topThreeCountries: array
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="mainLocation">
        <div className="ageGroup">Top Location</div>
        {this.state.topThreeCountries.map((country, index) => (
          <div className="locationRow">
            <div>
              {index + 1}. {" " + country.country}
            </div>
            <div>{country.numberOfUsers}</div>
          </div>
        ))}
        <div
          className="seeAllLocation"
          onClick={()=>this.props.handleTopLocationClick()}
        >
          See All Locations
        </div>
      </div>
    );
  }
}

export default Location;
