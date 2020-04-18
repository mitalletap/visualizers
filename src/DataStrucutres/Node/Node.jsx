import React, { Component } from 'react'
import './Node.css'

class Node extends Component {
    render() { 
        const { index, visited, letter, currentIndex, stackState } = this.props;
        const classIdentifier = currentIndex === true ? 'node-current' : visited ? 'node-visited' : '';
        return ( 
            <div className={`node ${classIdentifier} `} id={`node-${index}`} visited={visited}> 
                {classIdentifier === "node-visited" || classIdentifier === "node-current" ? letter : ''}
            </div>
        );
    }
}
 
export default Node;