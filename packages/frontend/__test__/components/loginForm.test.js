import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import MockComponent from '../utils/MockComponent';
import { LoginForm } from '../../src/components/containers/';

describe('<LoginForm />', () => {
  test('show password must have at least 6 characters msg', () => {
    const loginForm = render(<MockComponent Component={<LoginForm />} />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getAllByText('Login')[1];

    fireEvent.change(emailInput, { target: { value: 'admin@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Password must have at least 6 characters')
      .parentElement.parentElement;

    expect(errorMessage).toBeInTheDocument();
  });

  test('hide password must have at least 6 characters msg', () => {
    const loginForm = render(<MockComponent Component={<LoginForm />} />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getAllByText('Login')[1];

    fireEvent.change(emailInput, { target: { value: 'admin@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Password must have at least 6 characters')
      .parentElement;

    const hasShowMessageClass = errorMessage.className.includes('ShowMessage');

    fireEvent.click(errorMessage);

    const hasHideMessageClass = errorMessage.className.includes('HideMessage');

    expect(hasShowMessageClass).toBe(true);
    expect(hasHideMessageClass).toBe(true);
  });
});
