import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { Nav } from '../../src/components/containers/';
import MockComponent from '../utils/MockComponent';

describe('<Nav />', () => {
  test('Show drop dawn menu', () => {
    const navComponent = render(
      <MockComponent Component={<Nav authenticate={true} profilePic="none" />} />
    );

    const nullDropDawnMenu = navComponent.queryByText('My profile')?.parentElement;
    const button = navComponent.getByAltText('arrow dawn image');

    fireEvent.click(button);

    const dropDawnMenu = navComponent.getByText('My profile').parentElement;

    expect(nullDropDawnMenu).toBe(undefined);
    expect(dropDawnMenu).toBeInTheDocument();
  });

  test('Hide drop dawn menu', () => {
    const navComponent = render(
      <MockComponent Component={<Nav authenticate={true} profilePic="none" />} />
    );

    const button = navComponent.getByAltText('arrow dawn image');

    fireEvent.click(button); // open
    fireEvent.click(button); // close

    const nullDropDawnMenu = navComponent.queryByText('My profile')?.parentElement;

    expect(nullDropDawnMenu).toBe(undefined);
  });
});
