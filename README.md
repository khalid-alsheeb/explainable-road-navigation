# Explainable navigation apps. Why not this path/waypoint.
- Author: Khalid Alsheeb
- Year: 2022

## What is this project.
- This is project is aimed to give explanations for users of navigation apps. It tells the user why did the navigation algorithm not go through a specific path, or a specific waypoint, in its shortest path from source to target nodes.

## Structure
- The project is a website which is split into: front-end & back-end.
- The backend side is where the main algorithms are run.
- The algorithm directory has all the algorithms used for this project.

## Starting the project
- You need two terminal: one for the frontend and another for the backend.
- For the Frontend, you would need npm. If you hvae it, in the frontend directory, run:
    ```
    $ npm install
    ```
- This will install all the required dependencies. Afterwards, to run the frontend server, run:
    ```
    $ npm start
    ```
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


## Some screen shots of the demo