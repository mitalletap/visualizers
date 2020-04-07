import './Pathfinding.css'
import React, { Component } from 'react';
import Cell from '../Cells/Cell';

import { NodeIndexOutlined, NodeExpandOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;




class Pathfinding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            startRow: 1,
            startCol: 1,
            endRow: 8, 
            endCol: 8,
            previousStartRow: 1,
            previousStartCol: 1,
            previousEndRow: 8,
            previousEndCol: 8,
            mouseDown: false,
            mouseUp: true,
            mouseHold: false,
            holdingStart: false,
            holdingEnd: false,
            maxCols: 25, //70
            maxRows: 15,  //40
            activeMaze: false,
            activeAlgorithm: false,
            active: false,
            pathFound: false,
            simulationComplete: false,
            collapsed: false,
            selectedAlgorithm: "",
            selectedMaze: "",
            destroyingWall: false,
        }
    }

    componentDidMount() {
        const grid = this.createGrid();
        this.setState({ grid: grid });
    }

    createGrid = () => {
        const grid = [];
        for (let col = 0; col < this.state.maxCols; col++){
            const currentCol = [];
            for (let row = 0; row < this.state.maxRows; row++){
                currentCol.push(this.createCell(row, col));
            }
            grid.push(currentCol);
        }
        return grid;
    }

    createCell = (col, row) => {
        return {
            col, row, startCell: row === this.state.startRow && col === this.state.startCol, endCell: row === this.state.endRow && col === this.state.endCol, distance: Infinity, wall: false, visited: false,
            previous: null, neighbors: []
        }
    }

    getCell = (grid, col, row) => {
        const cell = grid[col][row];
        return cell;
    }

    createWall = (grid, col, row) => {
        const newGrid = grid.slice();
        const cell = this.getCell(newGrid, col, row);
        const newCell = {
            ...cell,
            wall: !cell.wall
        };
        newGrid[col][row] = newCell;
        return newGrid;
    }

    setWall = (grid, walls) => {
        var x = 0; 
        while(x < walls.length){
            for(var col = 0; col < this.state.maxCols; col++){
                for(var row = 0; row < this.state.maxRows; row++){
                    if(walls[x].row === grid[col][row] && walls[x].col === grid[col][row] && walls[x].wall === true){
                        grid[col][row].wall = true;
                    }
                }
            }
            x++;
        }
        return grid;
    }

    handleMouseDown(col, row) {
        const { grid, startCell, startRow, startCol, endRow, endCol, previousStartCol, previousStartRow } = this.state;
        var current = this.getCell(grid, col, row);
        if(current.col === startCol && current.row === startRow) {
            this.setState({ holdingStart: true }) //, previousStartCol: col, previousStartRow: row 
        } else if(current.col === endCol && current.row === endRow) {
            this.setState({ holdingEnd: true }) // previousEndCol: col, previousEndRow: row
        } else if(current.wall === false) {
            // document.getElementById(`cell-${current.col}-${current.row}`).className="cell cell-wall";
            document.getElementById(`cell-${current.col}-${current.row}`).classList.add('cell-wall');
            current.wall = true;
        } else if(current.wall === true) {
            // document.getElementById(`cell-${current.col}-${current.row}`).className="cell cell-wall";
            document.getElementById(`cell-${current.col}-${current.row}`).classList.remove('cell-wall');
            current.wall = false;
            this.setState({ destroyingWall: true })
        }
        this.setState({ mouseDown: true, mouseUp: false })
        
    }

    handleMouseEnter(col, row) {
        const { grid, mouseDown, holdingStart, holdingEnd, startCol, startRow, endRow, endCol, destroyingWall } = this.state;
        var current = this.getCell(grid, col, row);


        if(mouseDown === true && holdingStart === true) {
            document.getElementById(`cell-${this.state.startCol}-${this.state.startRow}`).classList.remove('cell-start');
            this.setState({ startRow: current.row, startCol: current.col })
            this.setState({ previousStartCol: startCol, previousStartRow: startRow })
            document.getElementById(`cell-${current.col}-${current.row}`).classList.add('cell-start');



        }else if(mouseDown === true && holdingEnd === true){
            document.getElementById(`cell-${this.state.endCol}-${this.state.endRow}`).classList.remove('cell-end');
            this.setState({ endRow: current.row, endCol: current.col })
            this.setState({ previousEndCol: endCol, previousEndRow: endRow })
            document.getElementById(`cell-${current.col}-${current.row}`).classList.add('cell-end');


        } else if(mouseDown === true) {
            if(current.col === startCol && current.row === startRow) {
                console.log("You have entered the start")
            } else if(current.col === endCol && current.row === endRow) {
                console.log("You have entered the end")
            } else if(destroyingWall === true){
                if(current.wall === true) {
                    document.getElementById(`cell-${current.col}-${current.row}`).classList.remove('cell-wall');
                    current.wall = false;
                    console.log("Removing Wall")
                }
            } else {
                document.getElementById(`cell-${current.col}-${current.row}`).className="cell cell-wall";
                current.wall = true;
                console.log("Adding Wall")
            }
        }
        
    }

    // When the mouse click has been released, it will set the "MOUSE PRESS" state back to its default
    handleMouseUp(col, row) {
        const { grid, mouseDown, holdingStart, holdingEnd, previousStartCol, previousStartRow, startCol, startRow, destroyingWall } = this.state;
        var current = this.getCell(grid, col, row)

        if(holdingStart === true) {
        } else if(holdingEnd === true) {
        } else if(mouseDown === true) {
            if(current.startCell === true) {
                console.log("You have entered the start")
            } else if(current.endCell === true) {
                console.log("You have entered the end")
            } else if(destroyingWall === true){
                document.getElementById(`cell-${current.col}-${current.row}`).classList.remove('cell-wall');
                current.wall = false;
            } else {
                document.getElementById(`cell-${current.col}-${current.row}`).className="cell cell-wall";
                current.wall = true;
            }
        }
        this.setState({ mouseDown: false, mouseUp: true, holdingEnd: false, holdingStart: false, destroyingWall: false })
    }
    

    handleClearPath(grid){
        if(this.state.active === false){
            this.setState({ activeAlgorithm: false })
            const newGrid = [];
            for (let row = 0; row < this.state.maxRows; row++){
                const currentRow = [];
                for (let col = 0; col < this.state.maxCols; col++){
                    const cell = grid[row][col];
                    document.getElementById(`cell-${cell.row}-${cell.col}`).classList.remove('cell-shortest-path'); 
                    document.getElementById(`cell-${cell.row}-${cell.col}`).classList.remove('cell-visited'); 
                    currentRow.push(cell);
                }
                newGrid.push(currentRow);
            }
            this.setState({ grid: newGrid, pathFound: false })
        } else {
            console.log("Please Wait")
        }
    }


    handleClearBoard() {
        console.log("Clearing Board!")
        this.setState({ mouseDown: false, mouseUp: true, holdingStart: false, holdingEnd: false, buildingWall: false });
        console.log(this.state.maxCols, this.state.maxRows)
        var newGrid = [];
        for(var col = 0; col < this.state.maxCols; col++){
            var currentCol = []
            for(var row = 0; row < this.state.maxRows; row++){
                var cell = this.getCell(this.state.grid, col, row);
                if(cell.wall === true){
                    cell.wall = false;
                    document.getElementById(`cell-${cell.col}-${cell.row}`).className="cell ";
                }
                currentCol.push(cell);
            }
            newGrid.push(currentCol);
        }
        this.setState({grid: newGrid});
    }

    drawBorders(col, row){
        var mazeWalls = []

        // TOP BORDER
        for(var i = col - 1; i > 0; i--){
            mazeWalls.push({
                row: i,
                col: 0,
                wall: true
            })
        }
    
        // LEFT BORDER
        for(var i = 0; i < row - 1; i++){
            mazeWalls.push({
                row: 0,
                col: i,
                wall: true
            })
        }
    
        // BOTTOM BORDER
        for(var i = 0; i < col - 1; i++){
            mazeWalls.push({
                row: i,
                col: row - 1,
                wall: true
            })
        }
    
        // RIGHT BORDER
        for(var i = row - 1; i > 0 - 1; i--){
            mazeWalls.push({
                row: col - 1,
                col: i,
                wall: true
            })
        }
        return mazeWalls;
    }



    render() { 
        const { grid } = this.state;
        const min = 1;
        return ( 
            <React.Fragment>
                <div className="grid" style={{ display: "inline"}}>
                    {grid.map((row, rowId) => {
                        return (
                                <div key={rowId} className={"col"}>
                                {row.map((cell, cellId) => {
                                    const { row, col, startCell, endCell, wall, visited, mouseDown } = cell;
                                    return (
                                        <Cell 
                                            key={cellId}
                                            row={col}
                                            col={row}
                                            startCell={startCell}
                                            endCell={endCell}
                                            wall={wall}
                                            visited={visited}
                                            mouseDown={mouseDown}
                                            onMouseDown={(col, row) => this.handleMouseDown(col, row)}
                                            onMouseEnter={(col, row) => this.handleMouseEnter(col, row)}
                                            onMouseUp={(col, row) => this.handleMouseUp(col, row)}
                                        />
                                    );
                                })}
                            </div>
                            
                        );
                    })}
                </div>
                <div>
                    {`MouseUp: ${this.state.mouseUp}`}
                    <br/>
                    {`MouseDown: ${this.state.mouseDown}`}
                    <br/>
                    {`MouseHold: ${this.state.mouseHold}`}
                    <br/>
                    {`HoldingStart: ${this.state.holdingStart}`}
                    <br/>
                    {`HoldingEnd: ${this.state.holdingEnd}`}
                    <br/>
                    {/* {`Start Col-Row: ${this.state.startCol} - ${this.state.startRow}`}
                    <br/>
                    {`Previous Start Col-Row: ${this.state.previousStartCol} - ${this.state.previousStartRow}`}
                    <br/>
                    {`End Col-Row: ${this.state.endCol} - ${this.state.endRow}`}
                    <br/>
                    {`Previous End Col-Row: ${this.state.previousEndCol} - ${this.state.previousEndRow}`} */}
                    <br/>
                    {`DestroyingWall: ${this.state.destroyingWall}`}
                    <br/>
                    <button onClick={() => this.handleClearBoard()}>Celar</button>
                </div>

            </React.Fragment>
         );
    }
}






 
export default Pathfinding;



