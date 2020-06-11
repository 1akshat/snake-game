# Instruction

You need to create a snake game that can be played my 2 (or more) player simultaneously.

## Submission

Game URL: **\_**

_(You can host your frontend on netlify, heroku or any other place you like.)_

- You can look at this [page](https://create-react-app.dev/docs/deployment/) for deployment.

## Mandatory Features

- There will be a frontend and a backend.
- You can use the `snake-game` code from the Live Lectures classes.
- There should be two snakes on a same board and each player can control their snake.
- You can decide whether the board is going to have a single food that both snakes compete to eat, or multiple food items on the board randomly.
- You need to take care of the fact that if one of the snake touches the other snake, which one dies and how.
- You can also have a time based competitive play, or let the player play until one of them dies.
- You should make the board slightly bigger than usual as two players will try to play on the same board.
- You can make as many items customizable as much as possible.
- **Make sure that the game is playable, and has low latency.**
- You frontend/backend has to be hosted somewhere.
  - We won't be looking at the source code directly, though the code will be reviewed.

## Stack

- For the frontend, you have to use **React**.
- For the backend, you have to use **Node**.

## Instructions for Snake Game

- If you don't know the mechanics of the game, here's a [link](https://playsnake.org/). Remember, your game doesn't have to be a copy of this. Only the mechanics are important.
- The game should be playable using the 4 arrow keys.
- The game should be able to display a score.
- The UX/UI is totally up to you.

## Project Requirements

- The purpose of the exercise is to write good code and have good design.
  - Don't try to finish the implementation. If your game is one large component, you will get 0 points. **Even if your game works.**
- Hence, write readable and maintainable code. It will be reviewed.
- Each component should have relevant tests.
  - As many unit tests and/or integration tests. You can use Enzyme as well if you want.
  - At least one E2E test. You can use [Cypress](https://www.cypress.io/).
- Use React `hooks` and `Context` APIs for the most part.
- Feel free to use utility libraries like `lodash` or `ramda`. However, any library accomplishing major work of the assignment is prohibited. However, **Try not to use any more utility libraries.** Try to code the utilities yourself.

## Restrictions

- You can use `socket.io` and any other library that you want. However, don't add too many extra libraries.
- Don't copy paste code from anywhere on the web. We have plagiarism detectors and if we find that you have violated this policy, your candidature will be cancelled immediately without any further deliberation.
- **Try not to use any more utility libraries.** Try to code the utilities yourself.
