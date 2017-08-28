import pandas as pd
import numpy as np
from datetime import *
from sklearn.linear_model import LinearRegression
import seaborn as sns
import matplotlib.pyplot as plt
from pymongo import MongoClient

def prediction_g(date):
    filepath = '/home/dipakr/projects/weather-analysis/weathersite/all csv/TempByCountry.csv'
    df = pd.read_csv(filepath)
    malaysia = df[df['Country']=='Malaysia']
    X_param = []
    Y_param = []

    for single_day_of_year, single_avg_temp in zip(malaysia['day_of_year'], malaysia['AverageTemperature']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_avg_temp)])

    regr = LinearRegression()
    regr.fit(X_param, Y_param)
    date = datetime.strptime(date,"%Y-%m-%d")
    date = date.timetuple().tm_yday
    output = regr.predict(date)
    return output




