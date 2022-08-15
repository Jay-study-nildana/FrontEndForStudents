import AnotherComponent from './AnotherComponent';
import { create } from 'react-test-renderer';
import * as React from 'react';

describe('My first snapshot test',()=>{
    test('testing app button', () => {
    let tree = create(<AnotherComponent />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
  })