import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Main } from '../../src/pages/';
import MockComponent from '../utils/MockComponent';

describe('<Main />', () => {
  test('test1', () => {
    const component = render(<MockComponent Component={Main} />);

    component.debug();

    expect(
      component.getByText(
        'A web application where you can login in different ways'
      )
    ).toBeInTheDocument();
  });
});
