import React, { Component } from "react";
import axios from "axios";
import './RepoList.css';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['name']

class RepoList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            repoArr: []
        };
    }

    componentDidMount() {
        axios.get('https://api.github.com/users/supreetsingh247/repos')
        .then(res => {
            this.setState({
                repoArr: res.data,
                searchTerm: ''
            });
        })
    }

    searchUpdated = (term) => {
        this.setState({searchTerm: term})
    }

  render() {
    const filteredRepo = this.state.repoArr.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
        <div className="RepoList">
            <SearchInput className="search-input" onChange={this.searchUpdated} placeholder="Find a repository..."/>
            <ul>
                {
                    filteredRepo.map((item, index) => {
                        return (
                            <li className="eachRepo">
                                <h3 className="repoName">
                                    <a href={item.full_name}>{item.name}</a>
                                </h3>
                                <div>
                                    <span className="repoDetails">{item.language}</span>
                                    <span className="repoDetails">Updated on {item.updated_at}</span>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
        
    );
  }
}

export default RepoList;