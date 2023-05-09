// import all your libraries and path to the component you want to test
import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QnA from '../QnA/QnA.jsx';

describe('Questions GET Request', () => {
  test('it should fetch data from API', async () => {
    const mockValue = {
      data: {
        product_id: '5',
        results: [],
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockValue);
    const input = { params: { product_id: 5, page: 1, count: 99999 } };

    const response = await axios.get('/qa/questions', input);

    expect(axios.get).toHaveBeenCalledWith('/qa/questions', input);

    expect(response.data).toEqual({ product_id: '5', results: [] });
  });
});
