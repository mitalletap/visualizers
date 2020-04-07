import React, { Component } from 'react'
import './Cell.css'

class Cell extends Component {
    render() { 
        const { row, col, startCell, endCell, wall, onMouseDown, onMouseUp, onMouseEnter } = this.props;
        const classIdentifier = endCell ? 'cell-end' : startCell ? 'cell-start' : wall ? 'cell-wall' : '';
        return ( 
            <div
                draggable={false}
                className={`cell ${classIdentifier}`}
                id={`cell-${row}-${col}`}
                onMouseDown={() => onMouseDown(col, row)}
                onMouseEnter={() => onMouseEnter(col, row)}
                onMouseUp={() => onMouseUp(col, row)}
            />
        );
    }
}
 
export default Cell;