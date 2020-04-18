import React from 'react';
import Dijkstra from '../Pathfinding/Algorithms/Dijkstra';
import renderer from 'react-test-renderer/shallow'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('testing dijkstra.js', () => {

    it('snapshot tests the main application', () => {
        console.log(JSON.stringify(Dijkstra));


    })
})