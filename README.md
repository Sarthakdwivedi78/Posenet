PoseNet Filter App

A real-time webcam filter application that uses ml5.js and PoseNet to detect human poses and overlay fun augmented reality (AR) filters on the user's face and body.

Live Demo: https://sarthakdwivedi78.github.io/Posenet/

Project Overview

This application captures video from a webcam and processes it in real-time using the PoseNet model to identify the locations of key body joints (like eyes, nose, shoulders, etc.). Based on the detected pose, it can overlay images and draw skeletons, creating interactive filters.

The entire application is built as a single, self-contained index.html file, making it lightweight and easy to deploy on any web host, including GitHub Pages.

Key Features

Real-time Pose Detection: Uses the ml5.js library's implementation of PoseNet to track 17 different keypoints on the human body.

Mirrored Video: The webcam feed is flipped horizontally for a more intuitive "mirror" experience.

6 Interactive Filters: A simple UI allows switching between different filters:

Posture: Draws a live skeleton overlay of the detected pose.

Superstar: Overlays a "Superstar" face filter.

Glasses: Adds a pair of glasses.

Beard: Adds a Santa-style beard.

Turban: Overlays a turban filter.

Joker: Adds a joker face filter.

Technologies Used

HTML5/CSS3: For the basic structure and styling.

p5.js: A JavaScript library for creative coding, used here to handle the canvas, video capture, and drawing.

ml5.js: A friendly interface for machine learning models, used to easily access the pre-trained PoseNet model.

How To Run

Since this is a single-file web application, there is no build step required.

Clone the repository:

git clone [https://github.com/Sarthakdwivedi78/Posenet.git](https://github.com/Sarthakdwivedi78/Posenet.git)


Open the file:
Navigate to the cloned directory and open the index.html file in any modern web browser.

Allow Webcam Access:
The browser will ask for permission to use your webcam. You must Allow this for the application to work.
