import React from 'react';
import { render } from '@testing-library/react';
import MockComponent from './MockComponent';

function mountComponent(component) {
  render(<MockComponent Component={component} />);
}

export default mountComponent;
