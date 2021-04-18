import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, prettyDOM, screen, waitFor } from '@testing-library/react';
import mountComponent from '../utils/mountComponent';
import { MyInfo } from '../../src/components/containers';

describe('<MyInfo />', () => {
  test('Should be in the document', () => {
    mountComponent(
      <MyInfo
        isFBUser={false}
        email="admin@gmail.com"
        name="Admin"
        phone="123456789"
        profilePic="#"
        loader={false}
      />
    );

    const myInfoDashboard = screen.getByText('Personal info')?.parentElement
      .childNodes[1];
    const myInfoFields = myInfoDashboard.childNodes[1];

    expect(myInfoDashboard).toBeInTheDocument();
    expect(myInfoFields.childNodes.length).toBe(5); // all fields information
  });

  test('Should render default image', () => {
    mountComponent(
      <MyInfo
        isFBUser={false}
        email="admin@gmail.com"
        name="Admin"
        phone="123456789"
        loader={false}
      />
    );

    const profilePic = screen.getByAltText('ProfilePic');

    expect(profilePic.src).toBe('http://localhost/test-file-stub'); //default image
  });

  test('Should render loader', () => {
    mountComponent(
      <MyInfo
        isFBUser={false}
        email="admin@gmail.com"
        name="Admin"
        phone="123456789"
        loader={true}
      />
    );

    const myInfoDashboard = screen.getByText('Personal info').parentElement.childNodes[1];
    const myInfoFields = myInfoDashboard.childNodes[1];

    expect(myInfoFields.childNodes.length).toBe(1); //loader
  });
});
