// import all your libraries and path to the component you want to test
import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QnA from '../QnA/QnA.jsx';

// Before each test, I want to imitate an axios get request and set the response.

describe('Questions GET Request', () => {
  test('it should fetch data from API', async () => {
    // Creates a mock function that simulates the behavior of a real function in a controlled manner
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

    expect(quests).toEqual([]); // Should pull the updated state
  });
  test('it should render up to two questions on start', () => {
    const mockValue = {
      data: {
        product_id: '5',
        results: [],
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockValue);
    const input = { params: { product_id: 5, page: 1, count: 99999 } };

    const response = await axios.get('/qa/questions', input);

    expect() // expect the dom to render two questions initially. Length 2

    expect() // expect up to two answers per question initially. length 2

    // Click show more questions. Expect the dom to render two additional questions length === 4

    // Click show more answers. Expect the dom to render the remaining answers. answers.length === result.length. How do I do a test for clicking? Also expect button to disappear after all answers showing
  });
});

describe('Question buttons should work', () => {
  test('clicking helpful to increase count', () => {
    // Clicking helpful should send put request
    // Count on the DOM should be updated
  });
  test('should generate modal to add answer', () => {
    // Clicking add answer should render modal to add answer
      // Should render three inputs and one button for url link
  });
});

