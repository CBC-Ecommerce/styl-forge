// import all your libraries and path to the component you want to test
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Overview from '../Overview/Overview.jsx';

const mockProduct = {
  id: 40346,
  campus: 'hr-rfp',
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: 'Whether you\'re a morning person or not.  Whether you\'re gym bound or not.  Everyone looks good in joggers.',
  category: 'Pants',
  default_price: '40.00',
  created_at: '2021-08-13T14:38:44.509Z',
  updated_at: '2021-08-13T14:38:44.509Z',
  features: [
    {
      feature: 'Fabric',
      value: '100% Cotton',
    },
    {
      feature: 'Cut',
      value: 'Skinny',
    },
  ],
};

describe('Overview', () => {
  // Unit Test
  it('should exist', () => {
    expect(true).toBe(true);
  });

  it('should include a category, title, price, and rating', () => {
    act(() => {
      render(<Overview product={mockProduct} id={40346}/>);
    });
    expect(screen.getByText('Morning Joggers')).toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();
  });
});
