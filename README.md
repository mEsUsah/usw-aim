# Advanced Internet and Mobile Computing
Coursework for the study module I attended during my BSc Computing (hons) studies at Univiersity of South Wales 2025-2026.

## Noughts and crosses
Simple game of Noughts and Crossess (aka. Tic-tac-toe) built from the ground up using only the HTML canvas API and vanilla JavaScript.

## Game engine 
This was one of my first attempts at building a game engine from scratch. 

Key objectives of the game engine:
* Make all time based logic based on elapsed time (not frames) to allow for smoother animations on hight FPS screens.
* Make the game cover the entire screen regardless of screen format and orientation.
* Make it possible to dynamically add/remove geometric shapes to game objects
* Make it possible to animate drawing of all shapes on the game objects with options to delay and set length of animation.

The game emgine acchieved all goals, but I was unable to make it decoupled from the game logic in a way that makes it easiliy reusable for other games.

## Prod Setup.
* To run this in a production environment you only have to git clone the project, and host it as static HTML. 
* Set the webroot to the web directory to avoid access to source files and potential sensitive data.

## DDev Installation
My preferred method of developing this project is using [DDev](https://ddev.com/). DDev is Docker-based and makes it a blast to develop on both Unix-based systems (Linux/Mac) and Windows (using WSL).

Install DDev on your system, and run the following commands to get started:

```bash
# Clone the repository
git clone git@github.com:mEsUsah/usw-aim.git
cd usw-aim

# Start DDev environment
ddev start

# Install and build frontend dependencies for development
ddev npm install
ddev npm run dev

# Install and build frontend dependencies for prod environment
ddev npm install
ddev npm run build
```

