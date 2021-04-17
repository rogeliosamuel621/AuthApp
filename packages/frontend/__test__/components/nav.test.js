import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { Nav } from '../../src/components/containers/';
import MockComponent from '../utils/MockComponent';

describe('<Nav />', () => {
  test('Show drop dawn menu', () => {
    const navComponent = render(
      <MockComponent Component={<Nav authenticate={true} profilePic="none" />} />
    );

    const nullDropDawnMenu = screen.queryByText('My profile')?.parentElement;
    const button = screen.getByAltText('arrow dawn image');

    fireEvent.click(button);

    const dropDawnMenu = screen.getByText('My profile')?.parentElement;

    expect(nullDropDawnMenu).toBe(undefined);
    expect(dropDawnMenu).toBeInTheDocument();
  });

  test('Hide drop dawn menu', () => {
    const navComponent = render(
      <MockComponent Component={<Nav authenticate={true} profilePic="none" />} />
    );

    const button = screen.getByAltText('arrow dawn image');

    fireEvent.click(button); // open
    fireEvent.click(button); // close

    const nullDropDawnMenu = screen.queryByText('My profile')?.parentElement;

    expect(nullDropDawnMenu).toBe(undefined);
  });
});
