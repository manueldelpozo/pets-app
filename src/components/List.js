import React from 'react';

import axios from 'axios';

class List extends React.Component {
    prefixAPI = {
        dogs: 'https://dog.ceo/api/breed/'
    }
  
    sufixAPI = {
        dogs: '/images/random'
    }
  
    state = { 
        petSelectedName: ''
    };
  
    selectPet = (event) => {
        event.preventDefault();
        const name = event.target.getAttribute('name');
    
        if (name) {
            axios.get(this.prefixAPI[this.props.type] + name + this.sufixAPI[this.props.type])
            .then(res => {
            this.props.onSelectPet(name, res.data.message);
            })

            this.setState({ 
                petSelectedName: name
            })
        }
    }
  
    render() {
        return (
            <div>
                <ul className="list-group">
                {this.props.result.map(item => 
                    <li 
                        className="list-group-item" 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        onClick={this.selectPet}>
                            {item.name}
                    </li>
                )}
                </ul>
            </div>
        )
    }
}

export default List;