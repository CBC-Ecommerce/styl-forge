import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StaticStarList from '../RatingsAndReviews/StaticStarList';
import ReviewList from '../RatingsAndReviews/ReviewList.jsx';
import ReviewCardBody from '../RatingsAndReviews/ReviewCardBody.jsx';

afterEach(cleanup);

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

describe('ReviewList Component', () => {
  test('Should find correct review body content in all children', () => {
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
    render(<ReviewList reviewList={exampleData} />);
    exampleData.forEach((e, i) => {
      expect(screen.getAllByTestId("card")[i]).toHaveTextContent(e.body);
    });
  });
});

describe('ReviewCardBody Component', () => {
  test('"Show More" button does not appear with body texts below 250 characters', () => {
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

// describe('ReviewPicture Component', () => {
//   test('Clicking on a thumbnail picture will trigger a modal popup', () => {

//   });
// });
