import React from 'react'
import Pathfinding from '../Pathfinding/Pathfinding';
import ReactTestRenderer from 'react-test-renderer/shallow'

describe('testing pathfinding.js', () => {

    it('snapshot tests the pathfinding component', () => {

        const renderer = new ReactTestRenderer();
        renderer.render(<Pathfinding />)
        const result = renderer.getRenderOutput();
        expect(result.props.children).toMatchSnapshot();
    })

    it('component did mount runs successfully', async () => {

        const component = new Pathfinding();
        await component.componentDidMount();
        expect(component.state.grid).not.toBe(null)

    })


})