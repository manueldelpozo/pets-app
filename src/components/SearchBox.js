import React from 'react';

import axios from 'axios';
const parseString = require('xml2js').parseString;

class SearchBox extends React.Component {
    petsAPI = {
        cats: 'http://thecatapi.com/api/categories/list',
        dogs: 'https://dog.ceo/api/breeds/list/all'
    };
  
    state = { 
        petType: ''
    };
    
    search = (event) => {
        event.preventDefault();
  
        if (this.petsAPI[this.state.petType]) {
            axios.get(this.petsAPI[this.state.petType]).then(res => {
                this.props.onSubmit(this.state.petType, this.formatResponseList(res.data));
            })
        }
    }
  
    formatResponseList = (result) => {
        let list = Object.keys(result.message).map((key, i) => {
            return {
                id: i,
                name: key
            }
        });
    
        if (this.state.petType === 'cats') {
            parseString(result, (err, res) => {
                list = res.response.data[0].categories[0].category.map(categ => {
                    return {
                        id: Number(categ.id[0]),
                        name: categ.name[0]
                    }
                });
            });
        }
    
        return list;
    }
  
    render() {
        return (
            <form onSubmit={ this.search } >
                <input
                    type="text" 
                    placeholder="Type 'dogs' or 'cats'" 
                    value={ this.state.petType }
                    onChange={(event) => this.setState({ petType: event.target.value })}
                    required/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default SearchBox;