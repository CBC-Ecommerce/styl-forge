// import all your libraries and path to the component you want to test
/* global afterEach, describe, test, expect, jest,  */
import React from 'react';
import {
  render, screen, fireEvent, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import RelatedProducts from '../RelatedItems/RelatedProducts.jsx';
import RelatedProList from '../RelatedItems/RelatedProList.jsx';
import YourOutfitList from '../RelatedItems/YourOutfitList.jsx';
import Card from '../RelatedItems/Card.jsx';
import Carousel from '../RelatedItems/Carousel.jsx';
import ComparisonModal from '../RelatedItems/ComparisonModal.jsx';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
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

  // ************** FIX THIS TEST**************
  // test('should invoke setRelatedIdList function ', async () => {
  //   const setRelatedIdList = jest.fn();
  //   jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setRelatedIdList]);

  //   const mockAxiosVal = {
  //     data: [40346, 40350, 40349, 40348],
  //   };
  //   axios.get.mockImplementation(() => Promise.resolve(mockAxiosVal));
  //   await act(async () => {
  //     render(<RelatedProducts id={40347} setId={() => {}} />);

  //   });
  //   window.location.reload();
  //   expect(setRelatedIdList).toHaveBeenCalledTimes(1);
  // });
});

// left arrow is present

describe('YourOutfitList Component', () => {
  const setId = jest.fn();

  test('should render a card with text "Add to outfits"', () => {
    render(<YourOutfitList id={40347} setId={setId} />);
    const addOutfits = screen.getByText('Add to Outfits');
    const plus = screen.getByText('+');
    expect(addOutfits).toBeInTheDocument();
    expect(plus).toBeInTheDocument();
  });

  const mockLocalStorage = () => {
    const setItemMock = jest.fn();
    const getItemMock = jest.fn();

    beforeEach(() => {
      Storage.prototype.setItem = setItemMock;
      Storage.prototype.getItem = getItemMock;
    });

    afterEach(() => {
      setItemMock.mockRestore();
      getItemMock.mockRestore();
    });

    return { setItemMock, getItemMock };
  };
  // ************** FIX THIS TEST**************
  // test('clicking the add to outfits card should invoke localStorage getItem and setItem', async () => {
  //   const localStorageMock = {
  //     getItem: jest.fn(),
  //     setItem: jest.fn(),
  //     removeItem: jest.fn(),
  //   };

  //   global.localStorage = localStorageMock;
  //   const { getItemMock } = mockLocalStorage();
  //   getItemMock.mockReturnValue([1, 2, 3]);
  //   render(<YourOutfitList id={40346} setId={setId} />);
  //   const addOutfits = screen.getByText('Add to Outfits');
  //   fireEvent.click(addOutfits);
  //   await waitFor(() => {
  //     expect(getItemMock).toHaveBeenCalled();
  //     // expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  //   });
  // });
});

describe('Card', () => {
  const productInfo = {
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
    category: 'Kicks',
    name: 'Heir Force Ones',
    id: 40346,
    features: [
      { feature: 'Lenses', value: 'Ultrasheen' },
      { feature: 'UV Protection', value: null },
    ],
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

  test('clicking the card will invoke setId function', () => {
    render(<Card id={40346} setId={setId} productInfo={productInfo} related={related} />);
    const card = screen.getByAltText('related product');
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
  const idList = [40346, 40350, 40349, 40348, 40351];
  const id = 40344;

  test('should render a list of 4 cards when related is true', async () => {
    render(<Carousel
      idList={idList}
      setId={setId}
      related={related}
      id={id}
      crossClickHandler={crossClickHandler}
    />);
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(4);
  });

  test('should render a list of 4 cards when related is false', async () => {
    related = false;
    render(<Carousel
      idList={idList}
      setId={setId}
      related={related}
      id={id}
      crossClickHandler={crossClickHandler}
    />);
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(4);
  });
  // ************** FIX THIS TEST**************
  // test('should update startIndex and endIndex when right arrow is clicked', async () => {
  //   const setStartIndex = jest.fn();
  //   jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setStartIndex]);
  //   const mockValue = {
  //     name: 'Heir Force Ones',
  //     category: 'Kicks',
  //     features: [],
  //   };
  //   axios.get = jest.fn().mockResolvedValueOnce(mockValue);
  //   render(<Carousel
  //     idList={idList}
  //     setId={setId}
  //     related={related}
  //     id={id}
  //     crossClickHandler={crossClickHandler}
  //   />);

  //   const rightArrow = screen.getByTestId('rightArrow');
  //   fireEvent.click(rightArrow);
  //   expect(setStartIndex).toHaveBeenCalledWith(1);
  // });

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

describe('ComparisonModal Component', () => {
  const productInfo = {
    name: 'Heir Force Ones',
    category: 'Kicks',
    features: [
      {
        feature: 'Mid-Sole',
        value: 'ControlSupport Arch Bridge',
      },
      {
        feature: 'Material',
        value: 'Double Stitch',
      },
    ],
  };
  const mockAxiosVal = {
    data: {
      name: 'Morning Joggers',
      category: 'Pants',
      features: [
        {
          feature: 'Sole',
          value: 'true',
        },
        {
          feature: 'Material',
          value: 'FullControlSkin',
        },
      ],
    },
  };
  const setShowModal = jest.fn();

  test('should render the compared product name and the current product name', async () => {
    axios.get.mockImplementation(() => Promise.resolve(mockAxiosVal));
    await act(async () => {
      render(<ComparisonModal productInfo={productInfo} id={null} setShowModal={setShowModal} />);
    });

    const comparedProName = screen.getByText('Heir Force Ones');
    const currentProName = screen.getByText('Morning Joggers');
    expect(comparedProName).toBeInTheDocument();
    expect(currentProName).toBeInTheDocument();
  });

  test('should render features once; features shared by both products should appear once', async () => {
    axios.get.mockImplementation(() => Promise.resolve(mockAxiosVal));
    await act(async () => {
      render(<ComparisonModal productInfo={productInfo} id={null} setShowModal={setShowModal} />);
    });

    const duplicateFeature = screen.getAllByText('Material');
    const nonDuplicateFeature = screen.getAllByText('Sole');
    expect(duplicateFeature.length).toBe(1);
    expect(nonDuplicateFeature.length).toBe(1);
  });

  test("should display the value if product's feature has a specific value; should display checkmark if the value is 'true'", async () => {
    axios.get.mockImplementation(() => Promise.resolve(mockAxiosVal));
    await act(async () => {
      render(<ComparisonModal productInfo={productInfo} id={null} setShowModal={setShowModal} />);
    });

    const specificValue = screen.getByText('ControlSupport Arch Bridge');
    const factValue = screen.queryByText('true');
    const checkmark = screen.getByText('&#10003;');
    expect(specificValue).toBeInTheDocument();
    expect(factValue).toBeNull();
    expect(checkmark).toBeInTheDocument();
  });
  // ************** FIX THIS TEST**************
  test('should close comparison modal if close button is clicked', async () => {
    axios.get.mockImplementation(() => Promise.resolve(mockAxiosVal));
    await act(async () => {
      render(<ComparisonModal productInfo={productInfo} id={null} setShowModal={setShowModal} />);
    });

    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);
    const feature = screen.queryByText('Material');
    expect(feature).not.toBeInTheDocument();
  });
});
