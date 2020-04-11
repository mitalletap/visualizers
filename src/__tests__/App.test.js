import React from 'react';
import App from '../App';
import ReactTestRenderer from 'react-test-renderer/shallow'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Button, Menu } from 'antd'
import { Pathfinding } from '../Pathfinding/Pathfinding'

describe('testing app.js', () => {

    it('snapshot tests the main application', () => {
      const renderer = new ReactTestRenderer();
      renderer.render(<App />)
      const result = renderer.getRenderOutput();
      expect(result.props.children).toMatchSnapshot();
    })
  })









