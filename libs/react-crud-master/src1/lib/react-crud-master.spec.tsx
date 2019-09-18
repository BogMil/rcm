import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ReactCrudMaster from './react-crud-master';

describe(' ReactCrudMaster', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<ReactCrudMaster />);
    expect(baseElement).toBeTruthy();
  });
});
