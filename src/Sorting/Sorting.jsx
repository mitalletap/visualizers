import './Sorting.css'
import 'antd/dist/antd.css';

import React, { Component } from 'react';
import { ClearOutlined } from '@ant-design/icons';
import { Layout, Menu, Divider } from 'antd';
import { mergeSortAlgo } from './Algorithms/MergeSort';
import { quickSortAlgo } from './Algorithms/QuickSort';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;


class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            selectedSort: "",
        }
    }


    componentDidMount() {
        this.clearArray();
    }

    clearArray() {
        var array = [];
        for(var i = 0; i < 10; i++) {
            array.push(randomIntFromInterval(5, 800))
        }
        this.setState({ arr: array })
    }

    computeSort() {
        const { arr, selectedSort } = this.state;
        var animations;
        switch (selectedSort) {
            case "Merge":
                // this.computeMergeSort(arr);
                animations = mergeSortAlgo(arr);
                this.animateMerge(animations);
                break;
            case "Quick":
                animations = quickSortAlgo(arr);
                this.animateQuick(animations);
                break;
        }
        console.log(animations)
    }


    animateQuick(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar');
            console.log(animations[i])
            const [barOneIdx, barTwoIdx] = animations[i];
            console.log(barOneIdx, barTwoIdx);
            var bar1Height = arrayBars[barTwoIdx].style.height;
            var bar2Height = arrayBars[barOneIdx].style.height;
                setTimeout(() => {
                    arrayBars[barOneIdx].style.height = bar1Height;
                    arrayBars[barTwoIdx].style.height = bar2Height;
                }, i * 1);



            // const isColorChange = i % 3 !== 2;
            // if (isColorChange) {
            //     const [barOneIdx, barTwoIdx] = animations[i];
            //     console.log(barOneIdx, barTwoIdx);
            //     const barOneStyle = arrayBars[barOneIdx].style;
            //     const barTwoStyle = arrayBars[barTwoIdx].style;
            //     const color = i % 3 === 0 ? '#CA8677' : '#77BBCA';
            //     setTimeout(() => {
            //         barOneStyle.backgroundColor = color;
            //         barTwoStyle.backgroundColor = color;
            //     }, i * 500);
            // } else {
            //     setTimeout(() => {
            //         const [barOneIdx, newHeight] = animations[i];
            //         const barOneStyle = arrayBars[barOneIdx].style;
            //         barOneStyle.height = `${newHeight}px`;
            //     }, i * 500);
            // }
        }
    }



    animateMerge(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                console.log(barOneIdx, barTwoIdx);
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? '#CA8677' : '#77BBCA';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 500);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 500);
            }
        }
    }


    onCollapse = collapsed => {
        this.setState({ collapsed });
    };


    render() { 
        const { arr, selectedSort } = this.state;
        return ( 
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Sider width={"15vw"} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
                                <Divider type="horizontal" />
                                <Menu.Item key="1" onClick={() => this.setState({ selectedSort: "Quick" })}> <ClearOutlined /> <span> Quick Sort </span> </Menu.Item>
                                <Menu.Item key="2" onClick={() => this.setState({ selectedSort: "Merge" })}> <ClearOutlined /> <span> Merge Sort </span> </Menu.Item>
                                <Menu.Item key="3" onClick={() => this.setState({ selectedSort: "Bubble" })}> <ClearOutlined /> <span> Bubble Sort </span> </Menu.Item>
                                <Menu.Item key="4" onClick={() => this.computeSort()}>
                                <ClearOutlined /> <span> Simulate </span> 
                                </Menu.Item>
                                <Menu.Item key="5" onClick={() => this.clearArray()}> <ClearOutlined /> <span> Reset </span> </Menu.Item>
                                <Menu.Item key="5" onClick={() => { console.log(arr) }}> <ClearOutlined /> <span> Print </span> </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{ paddingTop: "10px"}}>
                            <div className="container">
                                <h1> {selectedSort} </h1>
                                {arr.map((value, index) => {
                                    return (
                                        <div className="bar" key={index} style={{ height: `${value}px`}}>
                                        </div>
                                    )
                                })}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </React.Fragment>
         );
    }
}
 
export default Sorting;



function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}