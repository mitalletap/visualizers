import './DataStructures.css'

import React, { Component } from 'react';
import { createDisplay, handlePush, handlePop } from './Stack/Stack'
import Node from './Node/Node';
import { ClearOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Divider, Typography, Modal, Input, message, Switch } from 'antd';

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

class Pathfinding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStructure: "",
            activeStructure: false,
            value: "", 
            arr: [],
            originalString: "",
            reversedString: "",
            pushedStack: "",
            currentIndex: 0,
            active: false

        }
    }

    componentDidMount() {
        
    }



    computeEquation(string) {
        if(string.length <= 25) {
            var arr = createDisplay(string);
            this.setState({ value: string, arr: arr.reverse(), currentIndex: arr.length, originalString: string, active: true })    
        } else {
            message.warning('Your submission must be less than 26 characters');
        }
    }

    pushIndex(index) {
        const { arr, pushedStack, originalString, reversedString } = this.state;
        handlePush(arr, index);
        var newString = originalString.substring(1);
        var newPushed = pushedStack.concat(originalString[0])
        var newReversed = reversedString.substring(0)
        this.setState({ currentIndex: index - 1, originalString: newString, pushedStack: newPushed, reversedString: newReversed })
    }

    popIndex(index) {
        const { arr, pushedStack, originalString, reversedString } = this.state;
        handlePop(arr, index);
        var newPushed = pushedStack.substring(0, pushedStack.length - 1)
        var newString = arr[index] + originalString;
        var newReversed = reversedString.concat(arr[index]);
        this.setState({ currentIndex: index + 1, originalString: newString, pushedStack: newPushed, reversedString: newReversed }) 
    }

    clearStack() {
        var val = this.state.value;
        this.setState({ arr: [], active: false, pushedStack: [] , originalString: val, reversedString: "" })
    }

    render() { 
        const { value, arr, originalString, currentIndex } = this.state;
        return ( 

            <React.Fragment>
                <Modal
                    title="Welcome to the Data Structure Visualizer!"
                    visible={this.state.visibelModal}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                >
                    <p>It is the MVP of this visualizer, so try it out! I plan to incorporate more features and algorithms in the future.</p>
                    <p>Simply drag and drop the starting and ending nodes, select the algorithm on the left, and click "Simulate"! 
                        You can also draw on the canvas to create and destroy obstructions!</p>
                </Modal>
                 <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Sider width={"15vw"} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultSelectedKeys={[]}>
                                    <Divider type="horizontal" />
                                    <Menu.Item key="1" onClick={() => this.setState({ selectedAlgorithm: 'Dijkstra' })}> Stacks </Menu.Item>
                                    <Menu.Item key="2" onClick={() => this.setState({ selectedAlgorithm: 'Dijkstra' })}> Queues </Menu.Item>
                                    <Divider type="horizontal" />
                                <Menu.Item key="8" 
                                    disabled={this.state.selectedAlgorithm === "" || this.state.activeAlgorithm === true || this.state.activeMaze === true } onClick={() => { this.setState({ activeAlgorithm: true}); this.visualizeAlgorithm(this.state.selectedAlgorithm)}}>
                                    <ClearOutlined /> <span> {this.state.selectedAlgorithm === "" ? "Choose an Algorithm" : `Simulate ${this.state.selectedAlgorithm}` } </span>
                                </Menu.Item>

                                <Menu.Item key="10" 
                                    disabled={this.state.activeAlgorithm === true || this.state.activeMaze === true} onClick={() => {this.handleClearBoard() }}><ClearOutlined /> <span> Reset </span>
                                </Menu.Item>

                                <Divider type="horizontal" />
                            </Menu>
                        </Sider>
                        <Content style={{ paddingTop: "10px"}} className="content">
                            
                            <div className="information">
                                <div style={{}}>
                                    <h1>Stack Contains: </h1>
                                    {this.state.pushedStack.length > 0 ? this.state.pushedStack : ''}
                                </div>
                                <div style={{paddingLeft: "20px"}}>
                                    <h1>Original String: </h1>
                                    {this.state.originalString.length > 0 ? this.state.originalString : ''}
                                </div>
                                {/* <div style={{paddingLeft: "20px"}}>
                                    <h1>Reversed String: </h1>
                                    {this.state.reversedString.length > 0 ? this.state.reversedString : ''}
                                </div> */}
                            </div>


                            <div className="stack">
                                {arr.map((index, indexId) => {
                                    return (
                                        <Node index={indexId + 1} visited={indexId >= currentIndex ? true : false} currentIndex={indexId === this.state.currentIndex} letter={index}/>
                                    )
                                })}
                            </div>

                            <div className="user-input">
                                <Search placeholder="Enter Valid Equation" enterButton="Visualize Stack" onSearch={(value) => this.computeEquation(value)} style={{ width: "300px"}}/>
                                <Divider type="vertical" />
                                <Button onClick={() => this.pushIndex( this.state.currentIndex )} disabled={(this.state.currentIndex === 0 ? true : false) || (this.state.active === false)}> Push </Button>
                                <Button onClick={() => this.popIndex( this.state.currentIndex )} disabled={(this.state.currentIndex === value.length ? true : false) || (this.state.active === false)}> Pop </Button>
                                <Button onClick={() => this.clearStack( )} disabled={this.state.arr.length === 0}> Clear Stack </Button>
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked style={{ marginLeft: "20px"}}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
                
                

            </React.Fragment>
         );
    }
}

export default Pathfinding;



