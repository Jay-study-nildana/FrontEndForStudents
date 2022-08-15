import { render, screen } from '@testing-library/react';
import App from './App';
import { create } from 'react-test-renderer'

describe('My first snapshot test',()=>{
  test('testing app button', () => {
  let tree = create(<App />)
  expect(tree.toJSON()).toMatchSnapshot();
})
})
