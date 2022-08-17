import numpy as np
import pandas as pd
from ast import literal_eval

from src.final_functions import variablesToUseFix, getAnytimeAlgorithmData

np.random.seed(0)


variablesToUse = ['noWay', 'isClosed', 'maxSpeed', 'speed']
variablesToUseFix(variablesToUse)

data = pd.read_csv('./data/hundred_original_vs_anytime.csv')
data.nodes = data.nodes.apply(literal_eval)
data.anytime_algorithm_values = data.anytime_algorithm_values.apply(literal_eval)


for index, row in data.iterrows():
    at = row.anytime_algorithm_values
    nodes = row.nodes
    if(at[len(at)-1] == 0.0):
        shortest_path_anytime, desired_path_anytime, explanations_anytime, optimalValues_anytime = getAnytimeAlgorithmData(nodes, variablesToUse)
        data.anytime_algorithm_values.iloc[index] = optimalValues_anytime
    

data.to_csv('fixed_Org_AT.csv', index=False)