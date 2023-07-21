# Towards Explainable Road Navigation Systems
### Authors:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khalid Alsheeb 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Martim Brandão

### Citation

If you use this work in your research, please cite:

> Khalid Alsheeb, Martim Brandao, "**Towards Explainable Road Navigation Systems**", *IEEE International Conference on Intelligent Transportation Systems (ITSC)*, 2023.

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
<img width="1680" alt="1" src="https://user-images.githubusercontent.com/72269972/216442590-95254237-6780-4784-b78d-f066f420af74.png">

### Getting the shortest path:
<img width="1680" alt="2" src="https://user-images.githubusercontent.com/72269972/216442639-14c43b8c-bc1f-4fb1-bc25-ec4567fad0f5.png">

### Getting the Explanation:
<img width="1680" alt="3" src="https://user-images.githubusercontent.com/72269972/216442691-a4a780ca-c18d-4535-8bb5-d60e83669e0f.png">


## Requirements

The package versions written under website/backend/environment.yml have been tested on macOS Big Sur.

The software has also been tested on Ubuntu 18.04 with Python 3.10.6 and the following package versions:
```
cvxpy==1.3.1
Fiona==1.9.3
Flask==2.2.3
Flask-Cors==3.0.10
folium==0.14.0
gurobipy==10.0.1
ipykernel==6.22.0
matplotlib==3.7.1
matplotlib-inline==0.1.6
numpy==1.23.5
osmnx==1.3.0
pandas==2.0.0
scikit-learn==1.2.2
scip==0.1.12
scipy==1.10.1
```
