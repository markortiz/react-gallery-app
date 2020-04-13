This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![](react-gallery-app-demo.gif)

## Get started

This gallery app will display images from [Unsplash](https://unsplash.com).
This app have some of the following features:

* Search images
* Infinite scroll
* Advance search options

### Setup

In the project directory, run:

```bash
yarn install // This will install all dependencies.
```

Before you start the project fill the `*_API_KEY`'s in `.env` file in able to use Unsplash API.

```text
REACT_APP_API_KEY=************ // put you own Unsplash api key here
```

Then you could now run you app by executing this command line:

```bash
yarn start
```

This will run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Run Test

In the project directory, run:

```bash
yarn test
```

## Frontend Architecture

For this project all business logic are in the higher order component which is `App.js` so that all `components` can be reusable on other project or purpose.
I also did not separate into other files the small dumb component that will only use for that specific component.
I put `API_KEY` on environment level for security practice.
