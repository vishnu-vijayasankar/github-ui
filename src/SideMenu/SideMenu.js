import React, { Component } from "react";
import axios from "axios";
import './SideMenu.css';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            profPic:'',
            profName: '',
            profId: '',
            profDesc: '',
            profCompany: '',
            profCountry: '',
            profBio: ''
        };
    }

    componentDidMount() {
        axios.get('https://api.github.com/users/supreetsingh247')
        .then(res => {
            this.setState({
                profPic: res.data.avatar_url,
                profName: res.data.name,
                profId: res.data.login,
                profCompany: res.data.company,
                profCountry: res.data.location,
                profBio: res.data.bio
            });
        })
    }

  render() {
    return (
        <div className="sideMenuWrap">
            <img src={this.state.profPic} alt="Profile"/>
            <h1>
                <div>{this.state.profName}</div>
                <div className="userName">{this.state.profId}</div>
            </h1>
            
            <div>{this.state.profCompany}</div>
            <div>{this.state.profCountry}</div>
            <div>{this.state.profBio}</div>
        </div>
    );
  }
}

export default SideMenu;