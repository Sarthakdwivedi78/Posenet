<h1 align="center">
PoseNet Filter App
</h1>

<p align="center">
A real-time webcam filter application that uses ml5.js and PoseNet to detect human poses and overlay fun augmented reality (AR) filters.
</p>

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/HTML5-E34F26%3Fstyle%3Dfor-the-badge%26logo%3Dhtml5%26logoColor%3Dwhite" alt="HTML5 Badge">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/CSS3-1572B6%3Fstyle%3Dfor-the-badge%26logo%3Dcss3%26logoColor%3Dwhite" alt="CSS3 Badge">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/JavaScript-F7DF1E%3Fstyle%3Dfor-the-badge%26logo%3Djavascript%26logoColor%3Dblack" alt="JavaScript Badge">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/p5.js-ED225D%3Fstyle%3Dfor-the-badge%26logo%3Dp5dotjs%26logoColor%3Dwhite" alt="p5.js Badge">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/ml5.js-F9A825%3Fstyle%3Dfor-the-badge%26logo%3Dtensorflow%26logoColor%3Dblack" alt="ml5.js Badge">
</p>

<p align="center">
<a href="https://www.google.com/search?q=https://sarthakdwivedi78.github.io/Posenet/" target="_blank">
<img src="https://www.google.com/search?q=https://placehold.co/800x450/2d3748/ffffff%3Ftext%3DLive%2BApp%2BDemo\n(Click+to+Try!)" alt="Live App Demo">
</a>





<strong><a href="sarthakdwivedi78.github.io/Posenet/" target="_blank">➡️ Click Here for the Live Demo ⬅️</a></strong>
</p>

🚀 Project Overview

This application captures video from a webcam and processes it in real-time using the PoseNet model to identify the locations of key body joints (like eyes, nose, shoulders, etc.). Based on the detected pose, it can overlay images and draw skeletons, creating interactive filters.

The entire application is built as a single, self-contained index.html file, making it lightweight and easy to deploy on any web host, including GitHub Pages.

✨ Key Features

Real-time Pose Detection: Uses the ml5.js library's implementation of PoseNet to track 17 different keypoints on the human body.

Mirrored Video: The webcam feed is flipped horizontally for a more intuitive "mirror" experience.

6 Interactive Filters: A simple UI allows switching between different filters:

🧍 Posture: Draws a live skeleton overlay of the detected pose.

⭐ Superstar: Overlays a "Superstar" face filter.

👓 Glasses: Adds a pair of glasses.

🎅 Beard: Adds a Santa-style beard.

👳 Turban: Overlays a turban filter.

🥸 Joker: Adds a joker face filter.

🛠️ Technologies Used

HTML5/CSS3: For the basic structure and styling.

p5.js: A JavaScript library for creative coding, used here to handle the canvas, video capture, and drawing.

ml5.js: A friendly interface for machine learning models, used to easily access the pre-trained PoseNet model.

🏃‍♂️ How To Run

Since this is a single-file web application, there is no build step required.

Clone the repository:

git clone [https://github.com/Sarthakdwivedi78/Posenet.git](https://github.com/Sarthakdwivedi78/Posenet.git)
cd Posenet


Open the file:
Navigate to the cloned directory and open the index.html file in any modern web browser.

Allow Webcam Access:
The browser will ask for permission to use your webcam. You must Allow this for the application to work.
