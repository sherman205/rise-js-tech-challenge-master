## Welcome to the Rise Developer Challenge!

I chose to implement the `knowledge-check-blocks` interactive block. 

I have also:

- extended the REST API for `knowledge-check-blocks` by adding a second item to `db.knowledgeCheckBlocks` to account for more than one knowledge check. I have accounted for this logic in the UI by being able to cycle through to the next knowledge check question after completing the previous one.
- persisted the knowledge check block's UI state through the REST API by adding a PUT endpoint to update the knowledge check block to keep track of the user's progress. To do this, I've added extra db fields such as `id`, `isCurrentKnowledgeCheck`, `isSubmitted`, and `isSelected`.
- wrote the React app to be mobile responsive and be cross-browser friendly.

## How to develop

Start up the REST API (`/server`) in a terminal window:

1. `cd server`
2. `npm install`
3. `npm start`

REST API for knowledge-check-blocks served through `http://localhost:5000/knowledge-check-blocks`

Start the React front end (`/client`) in another terminal window:

1. `cd client`
2. `npm install`
3. `npm start`

React app served through `http://localhost:3000/`

### The coding challenge

Your goal is to implement one of Rise's interactive blocks (see [this Rise course](https://rise.articulate.com/share/QNNxptM9l1O6nA-l3BNQdOO-_6dW8prV) for more details).

At a minimum, your implementation should:
1. populate your interactive block's configuration from the provided REST API (see [`/server`](/server))
1. use `react` for your UI components
1. persist your interactive block's UI state by extending the provided REST API

What you choose to implement from there is up to you. :)

### Implementation notes:

- your interactive block implementation should live in the [`/client`](/client) directory and have its own `package.json`, `node_modules`, etc.
- feel free to bootstrap your solution with [create-react-app](https://github.com/facebookincubator/create-react-app) (or whatever tools you prefer)
- the beginnings of a REST API lives in [`/server`](/server) and is reachable at http://localhost:5000
  - the REST API currently uses variables as a makeshift in-memory database

### Getting started

To get the REST API up and running on your dev machine:

1. `cd server`
1. `yarn install` (or `npm install`)
1. `yarn start` (or `npm start`)
