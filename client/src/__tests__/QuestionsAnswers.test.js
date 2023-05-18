// import all your libraries and path to the component you want to test
import React from 'react';
import axios from 'axios';
import {
  render, cleanup, screen, act, container, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import QnA from '../QnA/QnA.jsx';
import QnAList from '../QnA/QnAList.jsx';
import QnAListEntry from '../QnA/QnAListEntry.jsx';
import AddAnswer from '../QnA/AddAnswer.jsx';
import AnswerListEntry from '../QnA/AnswerListEntry.jsx';
import AddQuestion from '../QnA/AddQuestion.jsx';
import Photos from '../QnA/Photos.jsx';
import SearchQuestions from '../QnA/SearchQuestions.jsx';

jest.mock('axios');

// Before each test, I want to imitate an axios get request and set the response.

describe('QnA Component', () => {
  test('The QnA Component Should Render', () => {
    render(<QnA id={40444} product={{}} />);
    const QnARender = screen.getByTestId('QnA Test');
    expect(QnARender).toBeInTheDocument();
  });
  test('QnA GET Request retrieves data', async () => {
    axios.get = jest.fn().mockResolvedValue({
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
            },
          },
        ],
      },
    });
    const response = await axios.get('/qa/questions', { params: { product_id: 40444, page: 1, count: 99999 } });

    expect(response.data.product_id).toBe('40444');
    expect(response.data.results.length).toBe(1);
    expect(response.data.results[0].question_id).toBe(329973);
  });
  test('SearchQuestions subcomponent should render', async () => {
    const quests = {
      question_id: 3299977, question_body: 'This is a test', question_helpfulness: 27, reported: false,
    };
    const filterQuestionMock = jest.fn();
    render(<SearchQuestions quests={quests} filterQuestion={filterQuestionMock} />);
    const searchtest = await screen.getByTestId('SearchQuestionTest');
    expect(searchtest).toBeInTheDocument();
  });
  test('AddQuestion subcomponent should render', async () => {
    const grabQuestionsMock = jest.fn();
    const questModalClickerMock = jest.fn();
    render(<AddQuestion product={{}} grabQuestions={grabQuestionsMock} questModalClicker={questModalClickerMock} />);
    const addquestionRender = await screen.getByTestId('question-modal-test');
    expect(addquestionRender).toBeInTheDocument();
  });
  test('QnAList subcomponent should render', async () => {
    const quests = [
      {
        question_id: 329987,
        question_body: 'Tempore dolores quis molestiae.',
        question_date: '2021-03-04T00:00:00.000Z',
        asker_name: 'Kasey.Lebsack',
        question_helpfulness: 24,
        reported: false,
        answers: {
          3082858: {
            id: 3082858,
            body: 'Ullam ad error tempora cumque.',
            date: '2021-01-27T00:00:00.000Z',
            answerer_name: 'Ana.Kuhic',
            helpfulness: 10,
            photos: [
              'https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80',
            ],
          },
          3082859: {
            id: 3082859,
            body: 'Quo qui dolorem reiciendis ea nihil.',
            date: '2020-09-18T00:00:00.000Z',
            answerer_name: 'Karina_Sporer',
            helpfulness: 14,
            photos: [],
          },
          3082860: {
            id: 3082860,
            body: 'Iure natus a rerum est incidunt.',
            date: '2021-02-08T00:00:00.000Z',
            answerer_name: 'Karina.Toy10',
            helpfulness: 2,
            photos: [],
          },
        },
      },
      {
        question_id: 329978,
        question_body: 'Sit veritatis temporibus.',
        question_date: '2021-07-14T00:00:00.000Z',
        asker_name: 'Annamae_Waters',
        question_helpfulness: 24,
        reported: false,
        answers: {
          3082786: {
            id: 3082786,
            body: 'Maxime placeat sunt quis ipsa rerum corrupti.',
            date: '2020-12-20T00:00:00.000Z',
            answerer_name: 'Devyn.Thiel50',
            helpfulness: 14,
            photos: [],
          },
          3082787: {
            id: 3082787,
            body: 'Quis quaerat cumque.',
            date: '2021-07-20T00:00:00.000Z',
            answerer_name: 'Constantin_Corkery94',
            helpfulness: 5,
            photos: [
              'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
              'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            ],
          },
        },
      },
    ];
    const grabQuestionsMock = jest.fn();
    render(<QnAList quests={quests} product={{}} grabQuestions={grabQuestionsMock} />);
    const qnaListRender = screen.getByTestId('QnAList Test');
    expect(qnaListRender).toBeInTheDocument();
  });

  describe('The QnAList Component', () => {
    test('QnAListEntry should render', async () => {
      const numEntry = 2;
      const grabQuestionsMock = jest.fn();
      const quests = [
        {
          question_id: 329987,
          question_body: 'Tempore dolores quis molestiae.',
          question_date: '2021-03-04T00:00:00.000Z',
          asker_name: 'Kasey.Lebsack',
          question_helpfulness: 24,
          reported: false,
          answers: {
            3082858: {
              id: 3082858,
              body: 'Ullam ad error tempora cumque.',
              date: '2021-01-27T00:00:00.000Z',
              answerer_name: 'Ana.Kuhic',
              helpfulness: 10,
              photos: [
                'https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80',
              ],
            },
            3082859: {
              id: 3082859,
              body: 'Quo qui dolorem reiciendis ea nihil.',
              date: '2020-09-18T00:00:00.000Z',
              answerer_name: 'Karina_Sporer',
              helpfulness: 14,
              photos: [],
            },
            3082860: {
              id: 3082860,
              body: 'Iure natus a rerum est incidunt.',
              date: '2021-02-08T00:00:00.000Z',
              answerer_name: 'Karina.Toy10',
              helpfulness: 2,
              photos: [],
            },
          },
        },
        {
          question_id: 329978,
          question_body: 'Sit veritatis temporibus.',
          question_date: '2021-07-14T00:00:00.000Z',
          asker_name: 'Annamae_Waters',
          question_helpfulness: 24,
          reported: false,
          answers: {
            3082786: {
              id: 3082786,
              body: 'Maxime placeat sunt quis ipsa rerum corrupti.',
              date: '2020-12-20T00:00:00.000Z',
              answerer_name: 'Devyn.Thiel50',
              helpfulness: 14,
              photos: [],
            },
            3082787: {
              id: 3082787,
              body: 'Quis quaerat cumque.',
              date: '2021-07-20T00:00:00.000Z',
              answerer_name: 'Constantin_Corkery94',
              helpfulness: 5,
              photos: [
                'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
                'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
              ],
            },
          },
        },
      ];
      render(
        <div>
          {quests.slice(0, numEntry).map((quest) => (
            <QnAListEntry
              quest={quest}
              key={quest.question_id}
              product={{}}
              grabQuestions={grabQuestionsMock}
            />
          ))}
        </div>,
      );
      const QnALE = await screen.getAllByTestId('individual-question-test');
      expect(QnALE.length).toBe(2);
    });
  });
  describe('The QnAListEntry Component', () => {
    test('AddAnswer Modal renders', async () => {
      const grabQuestionsMock = jest.fn();
      const addAnswerClickerMock = jest.fn();
      const quest = {
        question_id: 329978,
        question_body: 'Sit veritatis temporibus.',
        question_date: '2021-07-14T00:00:00.000Z',
        asker_name: 'Annamae_Waters',
        question_helpfulness: 24,
        reported: false,
        answers: {
          3082786: {
            id: 3082786,
            body: 'Maxime placeat sunt quis ipsa rerum corrupti.',
            date: '2020-12-20T00:00:00.000Z',
            answerer_name: 'Devyn.Thiel50',
            helpfulness: 14,
            photos: [],
          },
          3082787: {
            id: 3082787,
            body: 'Quis quaerat cumque.',
            date: '2021-07-20T00:00:00.000Z',
            answerer_name: 'Constantin_Corkery94',
            helpfulness: 5,
            photos: [
              'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
              'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            ],
          },
        },
      };
      render(<AddAnswer
        showAdd
        addAnswerClicker={addAnswerClickerMock}
        quest={quest}
        product={{ name: 'running shoes' }}
      />);

      const AddAnswerRender = await screen.getByTestId('addanswer-modal');
      expect(AddAnswerRender).toBeInTheDocument();
    });
    test('The AnswerListEntry component renders', async () => {
      const ansEntry = 2;
      const grabQuestionsMock = jest.fn();
      const quest = {
        question_id: 329978,
        question_body: 'Sit veritatis temporibus.',
        question_date: '2021-07-14T00:00:00.000Z',
        asker_name: 'Annamae_Waters',
        question_helpfulness: 24,
        reported: false,
        answers: {
          3082786: {
            id: 3082786,
            body: 'Maxime placeat sunt quis ipsa rerum corrupti.',
            date: '2020-12-20T00:00:00.000Z',
            answerer_name: 'Devyn.Thiel50',
            helpfulness: 14,
            photos: [],
          },
          3082787: {
            id: 3082787,
            body: 'Quis quaerat cumque.',
            date: '2021-07-20T00:00:00.000Z',
            answerer_name: 'Constantin_Corkery94',
            helpfulness: 5,
            photos: [
              'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
              'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            ],
          },
        },
      };
      render(
        <div>
          {Object.keys(quest.answers).slice(0, ansEntry).map((key) => (
            <AnswerListEntry key={key} answer={quest.answers[key]} grabQuestions={grabQuestionsMock} />
          ))}
        </div>,
      );
      const ale = await screen.getAllByTestId('answer-individual-test');
      expect(ale.length).toBe(2);
    });
    test('Expect Photos subcomponent to render', async () => {
      const photos = [
        'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
        'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      ];
      render(
        <div className="answer-photo-container">
          {photos.map((photo) => (
            <Photos photo={photo} key={photo} />
          ))}
        </div>,
      );
      const photoRender = await screen.getAllByTestId('photo-test');
      expect(photoRender.length).toBe(2);
    });
  });
  // test('grabQuestions should invoke setQuests and change state', async () => {
  //   render(<QnA id={40444} product={{}} />)
  //   const mockedResponse = {
  //     data: {
  //       results: [
  //         {
  //           question_id: 1,
  //           question_body: 'Example question',
  //           // ... other properties
  //         },
  //       ],
  //     },
  //   };
  //   const getSpy = jest.spyOn(axios, 'get').mockResolvedValue(mockedResponse);

  //   fireEvent.click()
  // });
});
