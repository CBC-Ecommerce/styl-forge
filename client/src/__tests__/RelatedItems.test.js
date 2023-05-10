// import all your libraries and path to the component you want to test
/* global afterEach, describe, test, expect */
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from '../RelatedItems/RelatedProducts.jsx';
import RelatedProList from '../RelatedItems/RelatedProList.jsx';

afterEach(() => {
  cleanup();
});

describe('RelatedProducts', () => {
  test('should render a heading named "RELATED PRODUCTS"', () => {
    render(<RelatedProducts id={40347} />);
    const heading = screen.getByText('RELATED PRODUCTS');
    expect(heading).toBeInTheDocument();
  });

  test('should render a heading named "YOUR OUTFITS"', () => {
    render(<RelatedProducts id={40347} />);
    const heading = screen.getByText('YOUR OUTFITS');
    expect(heading).toBeInTheDocument();
  });
});

// describe('RelatedProList', () => {
//   test('should render a list of cards"', async () => {
//     const { container } = render(<RelatedProList relatedIdList={[40346, 40350, 40349, 40348]} />);
//     // const cards = container.getElementsByClassName('card');
//     await expect(container.getElementsByClassName('card').length).toBe(4);
//   });
// });
