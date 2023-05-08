import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StaticStarList from '../RatingsAndReviews/StaticStarList';

describe('StaticStarList and StaticStars components', () => {
  // Unit Test
  test('Regardless of rating, should always render 5 stars', () => {
    const { container } = render(<StaticStarList ratingInt={0} />);
    const stars = container.getElementsByClassName('fa-star');
    expect(stars.length).toBe(5);
  });
  // Unit Test
  test('Should generate an array of stars that represents rating value', () => {
    const { container } = render(<StaticStarList ratingInt={2.5} />);
    const wholeStars = container.getElementsByClassName('whole-star');
    const halfStar = container.getElementsByClassName('half-star');
    const emptyStar = container.getElementsByClassName('empty-star');
    expect(wholeStars.length).toBe(2);
    expect(halfStar.length).toBe(1);
    expect(emptyStar.length).toBe(2);
  });
  // Integration Test (Need to debug)
  // test('Should render whole stars when given a product_id', () => {
  //   axios.get.mockResolvedValueOnce({
  //     data: {
  //       results: [
  //         {
  //           rating: 2,
  //         },
  //         {
  //           rating: 3,
  //         },
  //         {
  //           rating: 5,
  //         },
  //         {
  //           rating: 3,
  //         },
  //         {
  //           rating: 4,
  //         },
  //       ],
  //     },
  //   });
  //   render(<StaticStarList productId={40344} />);
  //   const coloredStars = await waitForElement(() => {
  //     getElementsByClassName('whole-star');
  //   })
  //   expect(coloredStars.length).toBe(4);
  // });
});
