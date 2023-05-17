// import all your libraries and path to the component you want to it
import React from 'react';
import axios from 'axios';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Overview from '../Overview/Overview.jsx';
import AddToCart from '../Overview/AddToCart.jsx';
import Carousel from '../Overview/Carousel.jsx';

afterEach(() => cleanup());
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

// const mockStyle = {
//   product_id: '40346',
//   results: [
//     {
//       style_id: 240510,
//       name: 'Black',
//       original_price: '40.00',
//       sale_price: null,
//       'default?': true,
//       photos: [{
//         thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
//         url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
//       }],
//     },
//   ],
// };

describe.only('Overview Page', () => {
  // set mock result of axios request before each it and render Overview component
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        results: [
          {
            style_id: 240500,
            name: 'Forest Green & Black',
            original_price: 140.00,
            sale_price: null,
            photos: [{
              thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
              url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
            }],
            skus: [
              {
                1394769: {
                  quantity: 8,
                  size: 'XS',
                },
              },
            ],
          },
        ],
      },
    });
    render(<Overview id={null} product={mockProduct} reviewList={[0, 1]}/>);
  });

  it('should render to screen', async () => {
    expect(screen.getByTestId('Overview')).toBeInTheDocument();
  });

  it('should show product category', async () => {
    await waitFor(() => {
      const overview = screen.getByTestId('Overview');
      expect(overview).toBeInTheDocument();
      const category = screen.getByText('Pants');
      expect(category).toBeInTheDocument();
    });
  });

  it('should show product title', async () => {
    await waitFor(() => {
      const title = screen.getByText('Morning Joggers');
      expect(title).toBeInTheDocument();
    });
  });

  it('should show product price', async () => {
    await waitFor(() => {
      const price = screen.getByTestId('price');
      expect(price).toBeInTheDocument();
    });
  });

  it('should show product star rating', async () => {
    await waitFor(() => {
      const stars = screen.getByTestId('stars');
      expect(stars).toBeInTheDocument();
    });
  });

  it('should show image gallery section', async () => {
    await waitFor(() => {
      const imgGallery = screen.getByTestId('imgGallery');
      expect(imgGallery).toBeInTheDocument();
    });
  });

  it('should show style selector section', async () => {
    await waitFor(() => {
      const stylSelect = screen.getByTestId('stylSelect');
      expect(stylSelect).toBeInTheDocument();
    });
  });

  it('should show add to cart section', async () => {
    await waitFor(() => {
      const add2Cart = screen.getByTestId('add2Cart');
      expect(add2Cart).toBeInTheDocument();
    });
  });
});

describe.only('Add to cart component', () => {
  beforeEach(async () => {
    render(<AddToCart selectedStyle={{
      skus:
      {
        1394769: {
          quantity: 8,
          size: 'XS',
        },
      },
    }}
    />);
  });

  it('should contain size and quantity dropdowns and an add to cart button', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('selectDrop')).toBeInTheDocument();
      expect(screen.getByTestId('qtyDrop')).toBeInTheDocument();
      expect(screen.getByTestId('add2CartBtn')).toBeInTheDocument();
    });
  });

  it('quantity defaults to 1 when size is selected', async () => {
    let qtyDropdown = screen.getByTestId('qtyDrop');
    expect(qtyDropdown.value).toEqual('-');
    const selectDropdown = screen.getByTestId('selectDrop');
    selectDropdown.value = 'XS';
    await userEvent.selectOptions(selectDropdown, 'XS');
    qtyDropdown = screen.getByTestId('qtyDrop');
    expect(qtyDropdown.value).toEqual('1');
  });
  // add tests to check if select size button functions as expected
  // also add test for add to cart button functionality
});

describe.only('Image Carousel component', () => {
  beforeEach(async () => {
    render(<Carousel
      allPics={['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      ]}
      activeImage={0}
      setActiveImage={0}
    />);
  });

  it('should render the carousel', async () => {
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
  });
  // add test for zoom in functionality
  // add test for button functionality including prev, next, and thumbnails
});
