import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/itemlist').reply(200, {
    itemlist : [
        {
            id: 1,
            collectionStatus: "open",
            tag: "One",
            createdIn: 2017,
            src: 'http://lorempixel.com/70/70/'
        },
        {
            id: 2,
            collectionStatus: "open",
            tag: "Two",
            createdIn: 2017,
            src: 'http://lorempixel.com/70/70/'
        },
        {
            id: 3,
            collectionStatus: "close",
            tag: "Three",
            createdIn: 2015,
            src: 'http://lorempixel.com/70/70/'
        },
        {
            id: 4,
            collectionStatus: "open",
            tag: "Four",
            createdIn: 2016,
            src: 'http://lorempixel.com/70/70/'
        },{
            id: 5,
            collectionStatus: "open",
            tag: "Five",
            createdIn: 2017,
            src: 'http://lorempixel.com/70/70/'
        },
        {
            id: 6,
            collectionStatus: "open",
            tag: "Six",
            createdIn: 2016,
            src: 'http://lorempixel.com/70/70/'
        },
        {
            id: 7,
            collectionStatus: "close",
            tag: "Seven",
            createdIn: 2015,
            src: 'http://lorempixel.com/70/70/'
        },
        {
            id: 8,
            collectionStatus: "open",
            tag: "Eight",
            createdIn: 2017,
            src: 'http://lorempixel.com/70/70/'
        }
    ]
});

mock.onGet('/filters/tags').reply(200, {
    filters: [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight"
    ]
});

