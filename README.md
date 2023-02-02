# Towards Explainable Road Navigation Systems
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Authors: Khalid Alsheeb and Dr. Martim Brandão

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Year: 2023

## About the project:

### Paper abstract:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Road navigation systems are important systems for pedestrians, drivers, and autonomous vehicles.
Routes provided by such systems can be unintuitive, and may not contribute to an improvement of users' mental models of maps and traffic. Automatically-generated explanations have the potential to solve these problems.
Towards this goal, in this paper we propose algorithms for the generation of explanations for routes, based on properties of the road networks and traffic.
We use a combination of inverse optimization and diverse shortest path algorithms to provide optimal explanations to questions of the type "why is path A fastest, rather than path B (which the user provides)?", and "why does the fastest path not go through waypoint W (which the user provides)?".
We demonstrate the algorithms on real map and traffic data, and conduct an evaluation of the properties of the algorithms.

### Description:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This project is aimed to give explanations for users of navigation apps. It tells the user why did the navigation algorithm not go through a specific path, or a specific waypoint, in its shortest path from source to target nodes.

### Structure:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The project is a website which is split into: front-end & back-end.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The backend side is where the main algorithms are run.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The algorithm directory has all the algorithms used for this project.

## Starting the project:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You need two terminals: one for the frontend and another for the backend.

### Frontend:
- For the Frontend, you would need npm. If you hvae it, in the frontend directory, run:
    ```
    $ npm install
    ```
- This will install all the required dependencies. Afterwards, to run the frontend server, run:
    ```
    $ npm start
    ```
    
### Backend:
- For the backend, having conda will make things easier. To create the conda virtual environment, in the backend directory (in another terminal), run:
    ```
    $ conda env create -f environment.yml
    ```
- Aftwerwards, to start the virtual environment, run:
    ```
    $ conda activate exp_env
    ```
- Finally, to run the backend, run:
    ```
    $ FLASK_APP=app.py FLASK_ENV=development flask run
    ```

- If you have installed everything properly, you will have the fully functional demo available in your browser at:
    ```
    http://localhost:3000
    ```


## Some screen shots of the demo:


### Startup:
<img width="1680" alt="screenshot1" src="https://user-images.githubusercontent.com/72269972/190700298-3faae1a6-4ffc-4357-a5f9-660d5e994bd3.png">


### Getting the shortest path:
<img width="1680" alt="screenshot2" src="https://user-images.githubusercontent.com/72269972/190700439-8b0217d7-d313-468a-989b-ab260c48bfe7.png">


### Getting the Explanation:
<img width="1680" alt="screenshot3" src="https://user-images.githubusercontent.com/72269972/190700478-62a2dd75-43b6-4eb5-8a75-c63401d4b6f6.png">

