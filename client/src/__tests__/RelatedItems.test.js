// import all your libraries and path to the component you want to test
/* global afterEach, describe, test, expect, jest,  */
import React from 'react';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RelatedProducts from '../RelatedItems/RelatedProducts.jsx';
import RelatedProList from '../RelatedItems/RelatedProList.jsx';
import YourOutfitList from '../RelatedItems/YourOutfitList.jsx';
import Card from '../RelatedItems/Card.jsx';
import Carousel from '../RelatedItems/Carousel.jsx';

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

describe('RelatedProList', () => {
  test('should render a list of 4 cards"', async () => {
    const setId = jest.fn();
    render(<RelatedProList
      relatedIdList={[40346, 40350, 40349, 40348]}
      id={40347}
      setId={setId}
    />);
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(4);
  });
});

describe('YourOutfitList Component', () => {
  const setId = jest.fn();

  test('should render a card with text "Add to outfits"', () => {
    render(<YourOutfitList id={40347} setId={setId} />);
    const addOutfits = screen.getByText('Add to Outfits');
    const plus = screen.getByText('+');
    expect(addOutfits).toBeInTheDocument();
    expect(plus).toBeInTheDocument();
  });

  // ************** FIX THIS TEST**************
  test('clicking the add to outfits card should invoke localStorage getItem and setItem', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    render(<YourOutfitList id={40346} setId={setId} />);
    const addOutfits = screen.getByText('Add to Outfits');
    fireEvent.click(addOutfits);
    expect(global.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(global.localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe('Card', () => {
  const productInfo = {
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    category: 'Kicks',
    name: 'Heir Force Ones',
    id: 40348,
    features: [],
    original_price: '729.00',
    sale_price: '219.00',
  };
  const crossClickHandler = jest.fn();
  const setId = jest.fn();
  let related = true;

  test('Card componnet should render product name, category and image', () => {
    render(<Card
      id={40346}
      setId={setId}
      productInfo={productInfo}
      crossClickHandler={crossClickHandler}
    />);
    const cardName = screen.getByText('Heir Force Ones');
    const category = screen.getByText('Kicks');
    const image = screen.getByRole('img');
    expect(cardName).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  // ************** FIX THIS TEST**************
  test('clicking the card will invoke setId function', () => {
    render(<Card id={40346} setId={setId} productInfo={productInfo} related={related} />);
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    expect(setId).toHaveBeenCalledTimes(1);
  });

  test('clicking the star will create a comparison modal', () => {
    render(<Card id={40346} setId={setId} productInfo={productInfo} related={related} />);
    const star = screen.getByTestId('star');
    fireEvent.click(star);
    const compModal = screen.getByTestId('compModal');
    expect(compModal).toBeInTheDocument();
  });

  test('clicking the cross will invoke crossClickHandler function', () => {
    related = undefined;
    render(<Card
      id={40346}
      setId={setId}
      productInfo={productInfo}
      crossClickHandler={crossClickHandler}
    />);
    const cross = screen.getByTestId('cross');
    fireEvent.click(cross);
    expect(crossClickHandler).toHaveBeenCalledTimes(1);
  });
});

describe('Carousel component', () => {
  const crossClickHandler = jest.fn();
  const setId = jest.fn();
  let related = true;
  test('should render a list of 4 cards when related is true', async () => {
    render(<Carousel
      idList={[40346, 40350, 40349, 40348]}
      setId={setId}
      related={related}
      id={40344}
      crossClickHandler={crossClickHandler}
    />);
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(4);
  });

  test('should render a list of 4 cards when related is false', async () => {
    related = false;
    render(<Carousel
      idList={[40346, 40350, 40349, 40348]}
      setId={setId}
      related={related}
      id={40344}
      crossClickHandler={crossClickHandler}
    />);
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(4);
  });
  // ************** FIX THIS TEST**************
  test('should update startIndex and endIndex when right arrow is clicked', () => {
    const setStartIndex = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setStartIndex]);
    // render(<Carousel
    //   idList={[40346, 40350, 40349, 40348, 40351]}
    //   setId={setId}
    //   related={related}
    //   id={40344}
    //   crossClickHandler={crossClickHandler}
    // />);
    // const rightArrow = screen.getByTestId('rightArrow');
    // fireEvent.click(rightArrow);
    // expect(setStartIndex).toHaveBeenCalledWith(1);
  });

  test('axios.get should be called 2*n time where n is the length of idList', async () => {
    const mockValue = {
      name: 'Heir Force Ones',
      category: 'Kicks',
      features: [],
    };
    axios.get = jest.fn().mockResolvedValueOnce(mockValue);
    render(<Carousel
      idList={[40346, 40350, 40349, 40348, 40351]}
      setId={setId}
      related={related}
      id={40344}
      crossClickHandler={crossClickHandler}
    />);
    expect(axios.get).toHaveBeenCalledTimes(10);
  });
});
