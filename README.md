# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: Ajay Venkatraman

Time spent: 7 hours spent in total

Link to project: https://glitch.com/edit/#!/viridian-jungle-lobster

## Required Functionality

The following **required** functionality is complete:

- [ ] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [ ] "Start" button toggles between "Start" and "Stop" when clicked.
- [ ] Game buttons each light up and play a sound when clicked.
- [ ] Computer plays back sequence of clues including sound and visual cue for each button
- [ ] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [ ] User wins the game after guessing a complete pattern
- [ ] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
- [ ] More than 4 functional game buttons
- [ ] Playback speeds up on each turn
- [ ] Computer picks a different pattern each time the game is played
- [ ] Player only loses after 3 mistakes (instead of on the first mistake)
- [ ] Game button appearance change goes beyond color (e.g. add an image)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] Dynamic input acquired from the user for the amount rounds to be played
- [ ] Dynamic input acquired from the user for the amount buttons to be used

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](https://cdn.glitch.global/7076e19d-5584-492e-ad5b-8fea90d1d249/Game%20Win.gif?v=1649721138429)
![](https://cdn.glitch.global/7076e19d-5584-492e-ad5b-8fea90d1d249/Game%20Lose.gif?v=1649721145485)
![](https://cdn.glitch.global/7076e19d-5584-492e-ad5b-8fea90d1d249/Game%20Slider%20Input.gif?v=1649721141054)
![](https://cdn.glitch.global/7076e19d-5584-492e-ad5b-8fea90d1d249/Game%20Button%20Input.gif?v=1649721147484)

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.

   I used w3schools.com, to learn some of the additional functions that I implemented. For quick help, I used stackoverflow.com. To implement the slider functionality, I got help from my mentor.

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

   For most part, I did not encounter any difficulties in creating the foundational portion of the game. When I started to work on the optional components, I had to do additional research & learning and one feature was challenging.

   To make it interesting, I wanted to provide an option to the user to change the amount of rounds they would like to play. Rather than making it an input via a text box, I wanted to add a slider. When the user slides the number of rounds would dynamically change and in turn will help set the pattern and the button clicks.

   I did not know how to implement this idea. As I did earlier for other optional components, I referred to w3schools.com to learn. The site provided me the needed knowledge and the base html, css and js code. I used the code and added the slider, played around and edited its appearance. After several tries, I was stumped as to how to make the slider interact with the rest of the game. I searched for help online and could not figure it out. I reached out to my mentor who made me walk through the logic and then explained what had to be done through the event handler function in the js code.

   To be specific, I ended up creating two functions - one to generate a random pattern based on the amount of rounds and second one to print the round slider's current value and a global variable to hold the round number to be displayed for the user.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

   This project has been an exciting learning journey and has helped me gain some fundamental knowledge of web development. The first question that came to mind was, how do I publish my web app so that others can use it?

   I am now intrigued and want to learn more. I curious to know how to

   - build a web application that is browser agnostic
   - make the app portable to any mobile device
   - identify unique users using the application
   - ensure the data security
   - connect web applications to one another

   Also I am interested to know how to make the web application more rich, visually attractive and user friendly. I want to know if

   - Applications built for different browsers talk to each other
   - There are any specific architecture or framework that needs to be followed when building web apps
   - It is possible to physically know all different libraries to use

   Looking forward to learning more in the SITE program.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)

   Though refactoring is important to make the code simple and efficient, I would spend any additional time in adding more features and enhancing the user experience.

   When I started working on the optional components, I thought outside of the box and I started exploring and learning new skills. As I was testing the code, I started thinking in terms of the user and thought some features will make the app more interesting and fun. To be specific, when playing the sounds, rather than playing some random note, I have set it to A-Major scale.

   Some of the features I thought which would bring value are

   - Dynamically change shapes and colors of the button between rounds to keep it interesting.
   - Automatically increase the difficulty by decreasing the amount of time the user gets to input their guesses as the rounds go higher.
   - Replay the round to train and strengthen the user’s memory capacity.

   Providing a setting option to the user to configure the game will be great. The users should be able to

   - Select the number of buttons to click, allowing for more than 10 buttons
   - Select the color palette of their choice to make it easy to users who are color blind
   - Select difficulty level - auto, easy, medium and hard - which can provide flexibility
   - Select choice of musical scale to cater to the musically inclined

   To improve the aesthetic of the webpage, I would explore using some third party Javascript libraries, like react.js or angular.js.

## Interview Recording URL Link

[My 5-minute Interview Recording](https://youtu.be/Bmu6SS48HiI)

## License

    Copyright Ajay Venkatraman

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
