// import all your libraries and path to the component you want to test
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Overview from '../Overview/Overview.jsx';
// import * as mocks from '../__mocks__/axios.js';

jest.mock('axios');

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

const mockStyle = {
  product_id: '40346',
  results: [
    {
      style_id: 240510,
      name: 'Black',
      original_price: '40.00',
      sale_price: null,
      'default?': true,
      photos: [{
        thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      }],
    },
  ],
};

const mockReview = {
    "product": "40346",
    "page": 0,
    "count": 5,
    "results": [
        {
            "review_id": 1279314,
            "rating": 2,
            "summary": "summary",
            "recommend": true,
            "response": null,
            "body": "Aidan and Nam were here",
            "date": "2023-03-27T00:00:00.000Z",
            "reviewer_name": "Andrew",
            "helpfulness": 4,
            "photos": []
        },
      ]
}

describe('Overview', () => {
  // Unit Test

  it('should include a category', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: mockReview }));
    await act(async () => {
      render(<Overview product={mockProduct} id={40346}/>);
    });
    expect(screen.getByText('Pants')).toBeInTheDocument();
  });

  // it('should include a title', () => {
  //   act(() => {
  //     render(<Overview product={mockProduct} id={40346}/>);
  //   });
  //   expect(screen.getByText('Morning Joggers')).toBeInTheDocument();
  // });

  // it('should include a price', () => {
  //   act(() => {
  //     render(<Overview product={mockProduct} id={40346}/>);
  //   });
  //   expect(screen.getByText('$40.00')).toBeInTheDocument();
  // });
});
