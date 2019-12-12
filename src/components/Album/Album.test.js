import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Album } from './Album';

describe('Album.js', () => {
  const photoList = [
    { 
      "id":"jQ6HxTqSgfU",
      "description":null,
      "alt_description":"six assorted Honest cosmetic packs",
      "urls":{ 
        "small":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
        "thumb":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ"
      }
    },
    { 
      "id":"HqJlUs3-aQw",
      "description":null,
      "alt_description":null,
      "urls":{ 
        "small":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
        "thumb":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ"
      }
    },
    { 
      "id":"TKXBzFMw6cc",
      "description":null,
      "alt_description":null,
      "urls":{ 
        "small":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
        "thumb":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ"
      }
    }
  ];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Album />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders all image in the lists', () => {
    const wrapper = mount(<Album images={photoList}/>);
    const infiniteScroll = wrapper.find('.Album .Album-infinite-scroll .Gallery');

    expect(infiniteScroll.children()).toHaveLength(photoList.length);
  });
})