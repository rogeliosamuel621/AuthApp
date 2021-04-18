import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RegisterForm } from '../../src/components/containers/';
import mountComponent from '../utils/mountComponent';
import app from '../utils/mocks/api/app';

describe('<RegisterForm />', () => {
  jest.useFakeTimers(); // mock timeOut message atom component

  let server;

  beforeAll(() => {
    server = app.listen(8000);
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  beforeEach(() => {
    mountComponent(<RegisterForm />);
  });

  test('show & hide incorrect format email message', async () => {
    require('dotenv').config();

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const registerButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'admin@gmail.c' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(registerButton);

    let errorMessage;
    await waitFor(() => {
      errorMessage = screen.queryByText(
        'You should fill the inputs with the correct format'
      ).parentElement;
    });

    const hasShowMessageClass = errorMessage.className.includes('ShowMessage');

    fireEvent.click(errorMessage);

    const hasHideMessageClass = errorMessage.className.includes('HideMessage');

    expect(errorMessage).toBeInTheDocument();
    expect(hasShowMessageClass).toBe(true);
    expect(hasHideMessageClass).toBe(true);
  });

  test('show & hide incorrect format password message', async () => {
    require('dotenv').config();

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const registerButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'admin@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    fireEvent.click(registerButton);

    const errorMessage = screen.queryByText('Password must have at least 6 characters')
      .parentElement;

    const hasShowMessageClass = errorMessage.className.includes('ShowMessage');

    fireEvent.click(errorMessage);

    const hasHideMessageClass = errorMessage.className.includes('HideMessage');

    expect(errorMessage).toBeInTheDocument();
    expect(hasShowMessageClass).toBe(true);
    expect(hasHideMessageClass).toBe(true);
  });

  test('show & hide email already taken message', async () => {
    require('dotenv').config();

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const registerButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'sameEmail@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(registerButton);

    let errorMessage;
    await waitFor(() => {
      errorMessage = screen.queryByText('Wrong credentials').parentElement; // this should be another msg
    });

    const hasShowMessageClass = errorMessage.className.includes('ShowMessage');

    fireEvent.click(errorMessage);

    const hasHideMessageClass = errorMessage.className.includes('HideMessage');

    expect(errorMessage).toBeInTheDocument();
    expect(hasShowMessageClass).toBe(true);
    expect(hasHideMessageClass).toBe(true);
  });
});
