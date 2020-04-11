import './Pathfinding.css'
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import Cell from '../Cells/Cell';

import { NodeIndexOutlined, NodeExpandOutlined, ClearOutlined, SmileOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Divider, Typography, Modal } from 'antd';
import { dijkstra, getShortestPath } from './Algorithms/Dijkstra'
import { astar } from './Algorithms/AStar'
import { recursiveDivisionMaze } from './Mazes/RecusiveDivision'
import { recursiveDivisionRandomizerMaze } from './Mazes/RecursiveDivisionRandomizer'
import { smilyFaceMaze } from './Mazes/Patterns'
import { wait } from '@testing-library/react';

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
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
            maxCols: 45, //47
            maxRows: 27,  //27
            activeMaze: false,
            activeAlgorithm: false,
            pathFound: false,
            simulationComplete: false,
            collapsed: false,
            selectedAlgorithm: "",
            selectedMaze: "",
            destroyingWall: false,
            visibelModal: true
        }
    }

    componentDidMount() {
        const grid = this.createGrid();
        this.setState({ grid: grid });
    }

    handleOk = e => {
        this.setState({
          visibelModal: false,
        });
    };

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

    getCell = (grid, col, row) => {
        const cell = grid[col][row];
        return cell;
    }

    setWall = (grid, walls) => {
        var x = 0; 
        while(x < walls.length){
            for(var col = 0; col < this.state.maxCols; col++){
                for(var row = 0; row < this.state.maxRows; row++){
                    if(walls[x].row === grid[col][row] && walls[x].col === grid[col][row] ){
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
        const { grid, mouseDown, holdingStart, holdingEnd, startCol, startRow, endRow, endCol, destroyingWall, previousEndCol, previousEndRow, previousStartCol, previousStartRow } = this.state;
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
            } else if(current.col === endCol && current.row === endRow) {
            } else if(destroyingWall === true){
                if(current.wall === true) {
                    document.getElementById(`cell-${current.col}-${current.row}`).classList.remove('cell-wall');
                    current.wall = false;
                }
            } else {
                document.getElementById(`cell-${current.col}-${current.row}`).className="cell cell-wall";
                current.wall = true;
            }
        }
        
    }
    
    // When the mouse click has been released, it will set the "MOUSE PRESS" state back to its default
    handleMouseUp(col, row) {
        const { grid, mouseDown, holdingStart, holdingEnd, previousStartCol, previousStartRow, startCol, startRow, destroyingWall } = this.state;
        var current = this.getCell(grid, col, row)

        if(holdingStart === true) {
            this.setState({ startCol: row, startRow: col })
        } else if(holdingEnd === true) {
        } else if(mouseDown === true) {
            if(current.startCell === true) {
            } else if(current.endCell === true) {
            } else if(destroyingWall === true){
                document.getElementById(`cell-${current.col}-${current.row}`).classList.remove('cell-wall');
                grid[col][row].wall = false;
            } else {
                document.getElementById(`cell-${current.col}-${current.row}`).className="cell cell-wall";
                grid[col][row].wall = true;
            }
        }
        this.setState({ mouseDown: false, mouseUp: true, holdingEnd: false, holdingStart: false, destroyingWall: false })
        this.updateGrid();
    }
    
    handleClearBoard() {
        const { grid, startCol, endCol, startRow, endRow } = this.state;
        if(this.state.activeAlgorithm === false || this.state.activeMaze === false) {
            var newGrid = [];
            for(var col = 0; col < this.state.maxCols; col++){
                var currentCol = []
                for(var row = 0; row < this.state.maxRows; row++){
                    var cell = this.getCell(this.state.grid, col, row);
                    cell.wall = false;
                    cell.visited = false;
                    cell.startCell = false;
                    cell.endCell = false;
                    document.getElementById(`cell-${cell.col}-${cell.row}`).className="cell ";
                    if(cell.col === startCol && cell.row === startRow){
                        cell.startCell = true;
                        document.getElementById(`cell-${cell.col}-${cell.row}`).className="cell cell-start";
                    } else if(cell.col === endCol && cell.row === endRow) {
                        cell.endCell = true;
                        document.getElementById(`cell-${cell.col}-${cell.row}`).className="cell cell-end";
                    }
                    currentCol.push(cell);
                }
                newGrid.push(currentCol);
            }
            this.setState({ grid: newGrid, mouseDown: false, mouseUp: true, holdingStart: false, holdingEnd: false, buildingWall: false, activeAlgorithm: false, activeMaze: false, selectedAlgorithm: "", selectedMaze: "", simulationComplete: false });
        }
    }

    drawBorders(col, row){
        // 20 10
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
        for(var i = 0; i < row; i++){
            mazeWalls.push({
                row: 0,
                col: i,
                wall: true
            })
        }

        // BOTTOM BORDER        
        for(var i = 0; i < col; i++){
            mazeWalls.push({
                row: i,
                col: row - 1,
                wall: true
            })
        }

        // RIGHT BORDER        
        for(var i = row - 1; i >= 0; i--){
            mazeWalls.push({
                row: col - 1,
                col: i,
                wall: true
            })
        }
        return mazeWalls;
    }

    updateGrid(){
        const { grid } = this.state;
        var newGrid = [];
        for(var col = 0; col < this.state.maxCols; col++){
            var currentCol = [];
            for(var row = 0; row < this.state.maxRows; row++){
                var cell = this.createCell(row, col);
                if(grid[col][row].wall === true) {
                    cell.wall = true;
                }
                currentCol.push(cell);
            }
            newGrid.push(currentCol);
        }

        this.setState({ grid: newGrid })
    }

    // Switch case to vizualize multiple algorithms
    visualizeAlgorithm(algorithm) {
        // this.updateGrid();
        const { grid, startRow, startCol, endRow, endCol } = this.state;
        var start = grid[startRow][startCol];
        var end = grid[endRow][endCol];
        var visited = [];
        var shortestPath;
        switch(algorithm){
            case 'Dijkstra':
                visited = dijkstra(grid, start, end);
                shortestPath = getShortestPath(end);
                this.animateDijkstra(visited, shortestPath);
                break;
            case 'AStar':
                visited = astar(grid, start, end);
                this.animateShortestPath(visited);
                break;
            default:
                console.log("Algorithm Not Found");
                break;
        }
    }    
    
    visualizeMaze(maze) {
        const { grid, maxRows, maxCols } = this.state;
        const visited = this.drawBorders(maxCols, maxRows);
        var newVisited;
        var newGrid = [];
        switch(maze){
            case 'Recursive Division':
                newVisited = recursiveDivisionMaze(maxCols, maxRows);
                break;
            case "Recursive Division Random":
                newVisited = recursiveDivisionRandomizerMaze(grid, maxRows, maxCols);
                break;
            case 'Smily':
                newVisited = smilyFaceMaze(grid);
                break;
            default:
                console.log("Maze Not Found");
        }
        // var waitTime = 
        var waitTime = this.animateMaze(visited.concat(newVisited));
        setTimeout(() => {
            newGrid = this.setWall(grid, visited.concat(newVisited));
            this.setState({ grid: newGrid })
            this.setState({ activeMaze: false })
        }, 10 * waitTime);

    }

    // Animates every "CELL" that is apart of the shortest path.
    // Also re-animates the start and end
    animateShortestPath(shortestPath) {
        for (let i = 0; i < shortestPath.length; i++){
            setTimeout(() => {
                const cell = shortestPath[i];
                document.getElementById(`cell-${cell.col}-${cell.row}`).classList.add('cell-shortest-path');
            }, 50 * i);
        }
        var endCell = shortestPath[shortestPath.length - 1];
        if(endCell !== undefined){ 
            this.setState({ pathFound: true });
        }
        this.setState({ simulationComplete: true, activeAlgorithm: false })
    }

    // Animates all every "CELL" that is not apart of the shortest path, the start, or the end
    animateDijkstra(visited, shortestPath) {
        for (let i = 0; i <= visited.length; i++){
            if(i === visited.length) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const cell = visited[i];
                document.getElementById(`cell-${cell.col}-${cell.row}`).classList.add('cell-visited');
            }, 10 * i);
        }
        
        
    }

    animateMaze(visited) {
        for(var i = 0; i < visited.length - 1; i++){
            const cell = visited[i];
            if(cell.wall === true){
                setTimeout(() => {
                    document.getElementById(`cell-${cell.col}-${cell.row}`).classList.add('cell-wall');
                }, 10 * i);
            }
        }
        return i;
    }
b
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() { 
        const { grid } = this.state;
        return ( 

            <React.Fragment>
                <Modal
                    title="Welcome to the Pathfinding Visualizer!"
                    visible={this.state.visibelModal}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                >
                    <p>It is the MVP of this visualizer, so try it out! I plan to incorporate more features and algorithms in the future.</p>
                    <p>Simply drag and drop the starting and ending nodes, select the algorithm on the left, and click "Simulate"! 
                        You can also draw on the canvas to create and destroy obstructions!</p>
                </Modal>
                 <Layout style={{ minHeight: '100vh' }}>
                    {/* <Header> <h1 className="site-header">PATHFINDING VISUALIZER</h1></Header> */}
                    <Layout>
                        <Sider width={"15vw"} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultSelectedKeys={[]}>
                                {/* <SubMenu key="sub1" title={<React.Fragment> <NodeIndexOutlined /> <span> Pathfinding </span></React.Fragment>}> */}
                                    <Divider type="horizontal" />
                                    <Menu.Item key="1" onClick={() => this.setState({ selectedAlgorithm: 'Dijkstra' })}> Dijkstra </Menu.Item>
                                    {/* <Menu.Item key="2" onClick={() => this.setState({ selectedAlgorithm: 'AStar' })}> A* </Menu.Item>
                                    <Menu.Item key="3"> Other</Menu.Item> */}
                                    <Divider type="horizontal" />
                                {/* </SubMenu> */}
                                {/* <SubMenu key="sub2" title={<React.Fragment> <NodeExpandOutlined /> <span> Maze </span> </React.Fragment>}>
                                    <Menu.Item key="4" onClick={() => this.setState({ selectedMaze: 'Recursive Division' })}> Recursive Division </Menu.Item>
                                    <Menu.Item key="5" onClick={() => this.setState({ selectedMaze: 'Recursive Backtracking' })}> Recursive Backtracking </Menu.Item>
                                        <SubMenu key="sub3" title={<React.Fragment> <SmileOutlined /> <span> Randomize </span> </React.Fragment>}>
                                        <Menu.Item key="6" onClick={() => this.setState({ selectedMaze: 'Smily' })}> Smily Face </Menu.Item>
                                        <Menu.Item key="7" onClick={() => this.setState({ selectedMaze: 'Recursive Backtracking' })}> Recursive Backtracking </Menu.Item>
                                    </SubMenu>
                                </SubMenu> 
                                <Divider type="horizontal" /> */}

                                <Menu.Item key="8" 
                                    disabled={this.state.selectedAlgorithm === "" || this.state.activeAlgorithm === true || this.state.activeMaze === true } onClick={() => { this.setState({ activeAlgorithm: true}); this.visualizeAlgorithm(this.state.selectedAlgorithm)}}>
                                    <ClearOutlined /> <span> {this.state.selectedAlgorithm === "" ? "Choose an Algorithm" : `Simulate ${this.state.selectedAlgorithm}` } </span>
                                </Menu.Item>

                                {/* <Menu.Item key="9" 
                                    disabled={this.state.selectedMaze === "" || this.state.activeMaze === true} onClick={() => { this.setState({ activeMaze: true }); this.visualizeMaze(this.state.selectedMaze) }}>
                                    <ClearOutlined /> <span> {this.state.selectedMaze === "" ? "Choose an Maze" : `Simulate ${this.state.selectedMaze}` } </span>
                                </Menu.Item> */}

                                <Menu.Item key="10" 
                                    disabled={this.state.activeAlgorithm === true || this.state.activeMaze === true} onClick={() => {this.handleClearBoard() }}><ClearOutlined /> <span> Reset </span>
                                </Menu.Item>

                                <Divider type="horizontal" />
                            </Menu>
                        </Sider>
                        <Content style={{ paddingTop: "10px"}}>
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
                        </Content>
                    </Layout>
                </Layout>
                
                

            </React.Fragment>
         );
    }
}

export default Pathfinding;



