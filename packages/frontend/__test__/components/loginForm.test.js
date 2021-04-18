import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { LoginForm } from '../../src/components/containers/';
import mountComponent from '../utils/mountComponent';

describe('<LoginForm />', () => {
  beforeEach(() => {
    mountComponent(<LoginForm />);
  });
  test('show & hide incorrect format password message', () => {
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

    expect(errorMessage).toBeInTheDocument();
    expect(hasShowMessageClass).toBe(true);
    expect(hasHideMessageClass).toBe(true);
  });
});
