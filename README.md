
# Optimising Pathfiniding by comparison of different Algorithms 

This project is a web-based program which uses Google Maps API to receive input, paths between input, and outputs the shortest distance between a starting point and an end point. Uses Python with Flask microframework, and HTML with JS implementing JQuery specifically AJAX to transfer data between the JS and Flask framework.



## Features

* #### Shortest Path Calculation
    - Computes the shortest path between two user-specified      locations using the Google Maps API.
    - Outputs the total distance and route details.
* #### Interactive Map Integration
    - Integrates with Google Maps to allow users to select starting and destination points visually.
    - Displays the calculated route directly on the map.
* #### Responsive Web Interface
    - Built using Flask (Python), HTML, and JavaScript (with jQuery and AJAX).
    - Ensures a smooth and responsive user experience for real-time updates.
* #### Dynamic Data Transfer
    - Uses AJAX for seamless communication between the client-side JavaScript and the server-side Flask framework.
    - Eliminates the need for page reloads during interactions.
* #### Real-Time API Integration
    - Fetches accurate, real-time geographical and routing data from Google Maps API.
    - Includes error handling for invalid inputs or unreachable locations.
* #### Local Development Support
    - Easy to set up and run locally using Python.
    - Accessible via http://localhost:5000 after starting the server.

## Prerequisites

Python should already be installed on your system.
You can verify if Python or Python 3 is installed by using one of the following commands:
```bash
  python --version
         OR
  python3 --version
```
## Deployment
Check if npm is installed 
```bash
  npm -v
```
if not installed 
```bash
  Download node.js from https://nodejs.org/
```
Check if Pip is installed 
```bash
  pip --version
       OR
  pip3--version
```
if not installed (For ubuntu bases systems)
```bash
  sudo apt update
  sudo apt install python3-pip
```


Check if Flask is installed 
```bash
  python -m flask --version 
            OR
  python3 -m flask --version
```
if not installed
```bash
  pip install flask
```
Clone the repository
```bash
  git clone https://github.com/Mithilbatra/OptimisingPathfinding-Dijisktra-A-.git
  cd loc-finder
```
Run the Flask Server by executing the Python Code
```bash
  python app.py
            OR
  python3 app.py
```
Access the Application 
```bash
  http://localhost:5000
```
## Screenshots:


Dijisktra Algorithm:
![WhatsApp Image 2024-11-18 at 09 58 23](https://github.com/user-attachments/assets/03dfc861-e3ab-4022-9a45-64104ff7f709)
