import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { SearchForm } from './SearchForm';

jest.mock('../../store');
import store from "../../store";

describe('SearchForm.js', () => {

  beforeEach(() => {
    store.mockImplementation(() => {
      return [
        { error: '' },
        { searchPhotos: jest.fn() }
      ]
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  xit('can submit form with search query', () => {
    const mockParams = {
      isSearch: true, 
      orientation: null,
      page: 1,
      perPage: 10,
      query: 'any',
    }
    // Mock the global store first.
    const mockState = { error: '' };
    const mockActions = { 
      searchPhotos: () => jest.fn().mockImplementation((params) => {
          expect(params).toEqual(mockParams);
          done();
        })
    };
    store.mockImplementation(() => [ mockState, mockActions ]);

    const wrapper = mount(<SearchForm />);
    const searchForm = wrapper.find('.Search');
    const queryInput =  searchForm.find('.Search-query');
    const submitBtn = searchForm.find('.Search-submit-btn');

    // Add input value to query field.
    queryInput.value = 'Animals';
    expect(queryInput.value).toEqual('Animals');

    // Submit our form.
    searchForm.simulate('submit');
  });
})