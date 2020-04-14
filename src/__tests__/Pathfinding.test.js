import React from 'react'
import Pathfinding from '../Pathfinding/Pathfinding';
import ReactTestRenderer from 'react-test-renderer/shallow'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('testing pathfinding.js', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Pathfinding />);
    })
    
    it('snapshot tests the pathfinding component', () => {

        const renderer = new ReactTestRenderer();
        renderer.render(<Pathfinding />)
        const result = renderer.getRenderOutput();
        expect(result.props.children).toMatchSnapshot();
    })

    it('component did mount runs successfully', async () => {
        const instance = await wrapper.instance();
        expect(instance.grid).not.toBe(null);
    })

})