// import all your libraries and path to the component you want to test
import React from 'react';
import axios from 'axios';
import {
  render, cleanup, screen, act, container,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import QnA from '../QnA/QnA.jsx';
import QnAList from '../QnA/QnAList.jsx';
import QnAListEntry from '../QnA/QnAListEntry.jsx';
import AddAnswer from '../QnA/AddAnswer.jsx';
import AnswerListEntry from '../QnA/AnswerListEntry.jsx';

// Before each test, I want to imitate an axios get request and set the response.

describe('Renders the QnA Component, GET Request Pulls Data', () => {
  const mockValue = {
    data: {
      product_id: '40444',
      results: [
        {
          question_id: 329973,
          question_body: 'Et cum ut est itaque ullam natus molestiae dolores qui.',
          question_date: '2021-06-10T00:00:00.000Z',
          asker_name: 'Glenna.Watsica31',
          question_helpfulness: 12,
          reported: false,
          answers: {
            3082739: {
              id: 3082739,
              body: 'Illo quo in quia dolore consequatur non iste.',
              date: '2021-05-27T00:00:00.000Z',
              answerer_name: 'Constantin_Buckridge93',
              helpfulness: 11,
              photos: [],
            },
            3082740: {
              id: 3082740,
              body: 'Placeat sunt aut asperiores laudantium iure numquam et dolorem.',
              date: '2021-04-20T00:00:00.000Z',
              answerer_name: 'Keegan.Torphy83',
              helpfulness: 4,
              photos: [],
            },
            3082741: {
              id: 3082741,
              body: 'Nobis illum in.',
              date: '2021-03-09T00:00:00.000Z',
              answerer_name: 'Harrison_Johnston',
              helpfulness: 15,
              photos: [],
            },
            5990500: {
              id: 5990500,
              body: 'Tell me more, tell me more.',
              date: '2023-02-06T00:00:00.000Z',
              answerer_name: 'jack789',
              helpfulness: 0,
              photos: [],
            },
          },
        },
        {
          question_id: 329974,
          question_body: 'Quas quam nisi iste aut nobis quia laborum quidem.',
          question_date: '2021-05-29T00:00:00.000Z',
          asker_name: 'Hattie_Kuphal',
          question_helpfulness: 10,
          reported: false,
          answers: {
            3082744: {
              id: 3082744,
              body: 'Non placeat animi totam suscipit at aut odit.',
              date: '2021-03-06T00:00:00.000Z',
              answerer_name: 'Mathias_McGlynn70',
              helpfulness: 9,
              photos: [
                'https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
              ],
            },
            3082745: {
              id: 3082745,
              body: 'Pariatur provident iusto officiis aut.',
              date: '2020-12-07T00:00:00.000Z',
              answerer_name: 'Makayla_Beer',
              helpfulness: 1,
              photos: [
                'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              ],
            },
            3082747: {
              id: 3082747,
              body: 'Sed rerum sit voluptates sint officiis quas dolores odio distinctio.',
              date: '2020-10-06T00:00:00.000Z',
              answerer_name: 'Althea_Haag',
              helpfulness: 9,
              photos: [],
            },
            3082748: {
              id: 3082748,
              body: 'Aspernatur aperiam et quam autem atque.',
              date: '2021-04-07T00:00:00.000Z',
              answerer_name: 'Mozelle69',
              helpfulness: 9,
              photos: [
                'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80',
              ],
            },
            3082749: {
              id: 3082749,
              body: 'Vero illo sunt sit aliquam et debitis.',
              date: '2020-08-26T00:00:00.000Z',
              answerer_name: 'Brittany64',
              helpfulness: 15,
              photos: [
                'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
                'https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
              ],
            },
            5990505: {
              id: 5990505,
              body: "C'est vrai? Dis m'en plus.",
              date: '2023-02-06T00:00:00.000Z',
              answerer_name: 'Jean-Yves',
              helpfulness: 0,
              photos: [],
            },
          },
        },
        {
          question_id: 644980,
          question_body: "How can a loving god allow such clothing to exist? I just don't get it.",
          question_date: '2023-02-06T00:00:00.000Z',
          asker_name: 'PhilosophizerPrime',
          question_helpfulness: 3,
          reported: false,
          answers: {
            5990502: {
              id: 5990502,
              body: 'Maybe try Buddhism?',
              date: '2023-02-06T00:00:00.000Z',
              answerer_name: 'tummy-man',
              helpfulness: 3,
              photos: [],
            },
          },
        },
        {
          question_id: 329975,
          question_body: 'Et quia perspiciatis aut est minus repellendus earum.',
          question_date: '2021-03-16T00:00:00.000Z',
          asker_name: 'Craig_McKenzie',
          question_helpfulness: 3,
          reported: false,
          answers: {
            3082752: {
              id: 3082752,
              body: 'Quidem accusantium architecto.',
              date: '2021-02-17T00:00:00.000Z',
              answerer_name: 'Lonny_Hansen',
              helpfulness: 13,
              photos: [],
            },
            3082753: {
              id: 3082753,
              body: 'Omnis sint tempore eaque eum quasi et occaecati.',
              date: '2021-01-07T00:00:00.000Z',
              answerer_name: 'Shirley_Jones',
              helpfulness: 18,
              photos: [
                'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
                'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
              ],
            },
            3082754: {
              id: 3082754,
              body: 'Maiores et est a ex.',
              date: '2021-06-18T00:00:00.000Z',
              answerer_name: 'Blanche.Toy13',
              helpfulness: 5,
              photos: [
                'https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
              ],
            },
            3082756: {
              id: 3082756,
              body: 'Ex sunt consequatur voluptatibus ipsam sed.',
              date: '2020-12-30T00:00:00.000Z',
              answerer_name: 'Lorena.Waters',
              helpfulness: 18,
              photos: [
                'https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              ],
            },
            3082757: {
              id: 3082757,
              body: 'Modi ea earum.',
              date: '2021-04-09T00:00:00.000Z',
              answerer_name: 'Abigail_Strosin44',
              helpfulness: 11,
              photos: [],
            },
          },
        },
      ],
    },
  };
  const input = { params: { product_id: 40444, page: 1, count: 99999 } };
  let response;

  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue(mockValue);
    response = await axios.get('/qa/questions', input);
  });
  afterEach(cleanup);

  test('axios.get is called with correct parameters', () => {
    expect(axios.get).toHaveBeenCalledWith('/qa/questions', input);
  });
  test('server request is returning correct number of result', () => {
    expect(response.data.results.length).toEqual(4);
  });
});

describe('The QnA Component', () => {
  beforeEach(() => {
    render(<QnA id={40444} product={{}} />);
  });
  test('Renders the QnA Component', () => {
    const QnARender = screen.getByTestId('QnA Test');
    expect(QnARender).toBeInTheDocument();
  });
  // test('Renders two questions at start', () => {
  //   const IndQuestion = screen.getByTestId('individual-question-test');
  //   expect(IndQuestion.length).toBe(2);
  // });
  // Why doesn't this render furter components?
  // I think to render the subcomponents, I need to specify it and also the props along with them.
});

describe('The QnAList Component', () => {
  beforeEach(() => {
    render(<QnAList
      product={{}}
      quests={[
        {
          question_id: 329973,
          question_body: 'Et cum ut est itaque ullam natus molestiae dolores qui.',
          question_date: '2021-06-10T00:00:00.000Z',
          question_helpfulness: 12,
        },
        {
          question_id: 329974,
          question_body: 'Test Question #2',
          question_date: '2021-06-10T00:00:00.000Z',
          question_helpfulness: 10,
        },
      ]}
    />);
  });
  test('QnAList Component is rendered', () => {
    const QnAListRender = screen.getByTestId('QnAList Test');
    expect(QnAListRender).toBeInTheDocument();
  });
});

// describe('Questions GET Request', () => {
//   test('it should fetch data from API', async () => {
//     // Creates a mock function that simulates the behavior of a real function in a controlled manner
//     const mockValue = {
//       data: {
//         product_id: '5',
//         results: [],
//       },
//     };
//     axios.get = jest.fn().mockResolvedValue(mockValue);
//     const input = { params: { product_id: 5, page: 1, count: 99999 } };

//     const response = await axios.get('/qa/questions', input);

//     expect(axios.get).toHaveBeenCalledWith('/qa/questions', input);

//     expect(response.data).toEqual({ product_id: '5', results: [] });

//     expect(quests).toEqual([]); // Should pull the updated state
//   });
//   test('it should render up to two questions on start', () => {
//     const mockValue = {
//       data: {
//         product_id: '5',
//         results: [],
//       },
//     };
//     axios.get = jest.fn().mockResolvedValue(mockValue);
//     const input = { params: { product_id: 5, page: 1, count: 99999 } };

//     const response = await axios.get('/qa/questions', input);

//     expect() // expect the dom to render two questions initially. Length 2

//     expect() // expect up to two answers per question initially. length 2

//     // Click show more questions. Expect the dom to render two additional questions length === 4

//     // Click show more answers. Expect the dom to render the remaining answers. answers.length === result.length. How do I do a test for clicking? Also expect button to disappear after all answers showing
//   });
// });

// describe('Question buttons should work', () => {
//   test('clicking helpful to increase count', () => {
//     // Clicking helpful should send put request
//     // Count on the DOM should be updated
//   });
//   test('should generate modal to add answer', () => {
//     // Clicking add answer should render modal to add answer
//       // Should render three inputs and one button for url link
//   });
// });
