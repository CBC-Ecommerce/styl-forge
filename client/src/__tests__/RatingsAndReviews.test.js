/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
// eslint-disable-next-line object-curly-newline
import { render, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StaticStarList from '../RatingsAndReviews/StaticStarList';
import RatingsAndReviews from '../RatingsAndReviews/RatingsAndReviews.jsx';
import ReviewList from '../RatingsAndReviews/ReviewList.jsx';
import ReviewCardBody from '../RatingsAndReviews/ReviewCardBody.jsx';
import ReviewPicture from '../RatingsAndReviews/ReviewPicture.jsx';
import ReviewListCard from '../RatingsAndReviews/ReviewListCard.jsx';
import Helpfulness from '../RatingsAndReviews/Helpfulness.jsx';
import DynamicStarList from '../RatingsAndReviews/DynamicStarList.jsx';

afterEach(cleanup);

describe('StaticStarList and StaticStars components', () => {
  test('Regardless of rating, should always render 5 stars', () => {
    const { container } = render(<StaticStarList ratingInt={0} />);
    const stars = container.getElementsByClassName('fa-star');
    expect(stars.length).toBe(5);
  });
  test('Should generate an array of stars that represents rating value', () => {
    const { container } = render(<StaticStarList ratingInt={2.5} />);
    const wholeStars = container.getElementsByClassName('whole-star');
    const halfStar = container.getElementsByClassName('half-star');
    const emptyStar = container.getElementsByClassName('empty-star');

    expect(wholeStars.length).toBe(2);
    expect(halfStar.length).toBe(1);
    expect(emptyStar.length).toBe(2);
  });
  test('Should render partial stars when given a product id to average', async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        product_id: '1',
        results: [
          {
            rating: 2,
          },
          {
            rating: 3,
          },
          {
            rating: 5,
          },
          {
            rating: 3,
          },
          {
            rating: 4,
          },
        ],
      },
    });
    const { container } = render(<StaticStarList productId={1} />);
    await waitFor(() => {
      const coloredStars = container.getElementsByClassName('whole-star');
      const fractionStar = container.getElementsByClassName('quarter-star');

      expect(coloredStars.length).toBe(3); // rating is 3.4
      expect(fractionStar.length).toBe(1);
    });
  });
});

describe('Ratings And Reviews Main Component', () => {
  test('Should exist and render on the page', () => {
    render(<RatingsAndReviews id={null} reviewList={[]} char={[]} />);
    expect(screen.getByTestId('rr-main')).toBeInTheDocument();
  });
  test('When "More Reviews" is pressed, the rendered list should increase by 2 reviews', () => {
    const reviewList = [
      {
        review_id: 651449,
        rating: 5,
        summary: 'Excepturi vitae fugit quasi culpa eum debitis',
        body: 'Reiciendis et molestias et rerum. Et eos suscipit dolorum ea nemo ad iure atque id.',
        date: '2021-02-25T00:00:00.000Z',
        reviewer_name: 'Kasandra.Kuphal7',
        helpfulness: 29,
        photos: [],
      },
      {
        review_id: 651448,
        rating: 4,
        summary: 'Tempore ipsa officiis laudantium enim rerum delectus quo tenetur.',
        body: 'Non architecto optio et architecto eos dolore. Veniam rerum non sunt',
        date: '2021-04-15T00:00:00.000Z',
        reviewer_name: 'Nakia_Boyle98',
        helpfulness: 22,
        photos: [],
      },
      {
        review_id: 651447,
        rating: 3,
        summary: 'Tempore ipsa officiis laudantium enim rerum delectus quo tenetur.',
        body: 'Non architecto optio et architecto eos dolore. Veniam rerum non sunt',
        date: '2021-04-15T00:00:00.000Z',
        reviewer_name: 'MadeUpUser223',
        helpfulness: 14,
        photos: [],
      },
      {
        review_id: 651446,
        rating: 3,
        summary: 'Tempore ipsa officiis laudantium enim rerum delectus quo tenetur.',
        body: 'Non architecto optio et architecto eos dolore. Veniam rerum non sunt',
        date: '2021-04-15T00:00:00.000Z',
        reviewer_name: 'MadeUpUser224',
        helpfulness: 10,
        photos: [],
      },
    ];

    render(<RatingsAndReviews id={null} reviewList={reviewList} char={[]} />);
    let reviewsRendered = screen.getAllByTestId('r-card');

    expect(reviewsRendered.length).toBe(2);

    const moreReviews = screen.getByRole('button', { name: /More Reviews/i });
    fireEvent.click(moreReviews);

    reviewsRendered = screen.getAllByTestId('r-card');

    expect(reviewsRendered.length).toBe(4);
  });
});

describe('ReviewList Component', () => {
  test('Should find correct body text content in all children', () => {
    const exampleData = [
      {
        review_id: 1,
        rating: 3,
        summary: 'Wow so good',
        body: 'This is some body text about the review of a product alksdfjlakdjflk',
        date: '2019-04-30T08:59:00.000Z',
        photos: [],
      },
      {
        review_id: 2,
        rating: 4,
        summary: 'Wow so good x 2',
        body: 'Some other short review, this product so great blah blah blah',
        date: '2019-04-30T08:59:00.000Z',
        photos: [],
      },
    ];
    render(<ReviewList currentList={exampleData} listCount={2} />);
    exampleData.forEach((e, i) => {
      expect(screen.getAllByTestId('r-card')[i]).toHaveTextContent(e.body);
    });
  });
});

describe('ReviewCardBody Component', () => {
  test('"Show More" button does not appear with body texts below 250 characters', () => {
    // eslint-disable-next-line react/jsx-boolean-value
    render(<ReviewCardBody short={true} body={"World's bestestest review that's under 250 characters, let's go!"} pics={[]} />);

    expect(screen.queryByRole('button')).toBe(null);
  });

  test('"Show More" Button changes text to "Show Less" after click', () => {
    render(<ReviewCardBody short={false} body={"Right now I'm trying to get above 250 characters so that I can use the Show More button as an example to expand the container that it's in. This is actually quite a bit to type but I think I'm almost there so just a few more keyboard smashes and I'll be good to go. AHHH CHOO alsdkfjalkdsjflkoqepklzdvna"} pics={[]} />);

    const button = screen.getByRole('button', { name: /Show More/i });
    fireEvent.click(button);

    expect(screen.getByRole('button', { name: /Show Less/i })).toBeInTheDocument();
  });
});

describe('ReviewPicture Component', () => {
  test('Clicking on a thumbnail picture will trigger a modal state', () => {
    const cuteSealPic = 'https://images.app.goo.gl/xFRi1YVUuazGdZW58';
    const setModal = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setModal]);

    render(<ReviewPicture src={cuteSealPic} />);
    const thumbnail = screen.getByTestId('thumbnail');
    fireEvent.click(thumbnail);

    expect(setModal).toHaveBeenCalledWith(true);
  });
});

describe('Review Modal Popup: Full Resolution Thumbnail', () => {
  test('Should appear on thumbnail click and disappear on click away', async () => {
    const exampleReview = {
      review_id: 123,
      rating: 3,
      summary: 'Shmedium product',
      body: 'This is some body text about the review of a product alksdfjlakdjflk',
      date: '2019-04-30T08:59:00.000Z',
      photos: [{ id: 1, url: 'https://images.app.goo.gl/xFRi1YVUuazGdZW58' }],
    };
    render(<ReviewListCard review={exampleReview} />);
    const thumbnail = screen.getByTestId('thumbnail');
    fireEvent.click(thumbnail);

    await waitFor(() => (screen.getByTestId('r-modal')));
    const modal = screen.getByTestId('r-modal');
    const screenOverlay = screen.getByTestId('overlay');

    expect(modal).toBeInTheDocument();
    fireEvent.click(screenOverlay);
    expect(screen.queryByTestId('overlay')).toBe(null);
  });
});

// DEBUG THIS TEST -------------------------------------------------
describe('Helpfullness Component', () => {
  test('Should update "Yes" count when helpful is clicked', async () => {
    axios.put = jest.fn().mockResolvedValueOnce({
      data: {
        review_id: 1111,
        helpful: 4,
      },
    });
    const setCount = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setCount]);

    const setClicked = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce((localStorage) => {
      localStorage = Storage;
      Storage.prototype.setItem = jest.fn().mockResolvedValueOnce({
        data: {
          count: 4,
        },
      });
      return ([4, setClicked]);
    });

    render(<Helpfulness review_id={1111} helpful={3} />);
    const yesBtn = screen.getByRole('button', { name: 'Yes (3)' });

    fireEvent.click(yesBtn);
    await waitFor(() => {
      // const updatedYes = screen.getByRole('button', { name: 'Yes (4)' });
      // expect(updatedYes).toBeInTheDocument();
      window.location.reload();
      expect(setCount).toHaveBeenCalledWith(4);
    });
  });
  // test('Should only be able to mark helpful once, even after page refresh', () => {

  // });
});

describe('Dynamic Start List Component', () => {
  test('Should send back a user rating input through a callback', () => {
    const mockCB = jest.fn((rating) => (rating));

    render(<DynamicStarList overallResults={mockCB} />);
    const stars = screen.getAllByRole('button');
    fireEvent.click(stars[1]);

    expect(mockCB).toHaveBeenCalledTimes(1);
    expect(mockCB).toHaveBeenCalledWith(2);
  });
});
