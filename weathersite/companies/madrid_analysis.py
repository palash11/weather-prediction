import numpy as np
import pandas as pd
from datetime import *
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import json
from pymongo import MongoClient

file_name = '/home/dipakr/projects/weather-analysis/weathersite/all csv/weather_madrid_cleaned.csv'
df = pd.read_csv(file_name)

def min_temp(file_name,predict):
    df = pd.read_csv(file_name)
    date = datetime.strptime(predict,"%Y-%m-%d")
    date_a = date.timetuple().tm_yday
    X_param = []
    Y_param = []
    for single_day_of_year, single_min_temperature in zip(df['day_of_year'],df['Min_TemperatureC']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_min_temperature)])
    return X_param,Y_param,date_a

def max_temp(file_name, predict):
    df = pd.read_csv(file_name)
    date = datetime.strptime(predict,"%Y-%m-%d")
    date_a = date.timetuple().tm_yday
    X_param = []
    Y_param = []
    for single_day_of_year, single_max_temperature in zip(df['day_of_year'],df['Max_TemperatureC']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_max_temperature)])
    return X_param,Y_param,date_a

def min_hum(file_name, predict):
    df = pd.read_csv(file_name)
    date = datetime.strptime(predict,"%Y-%m-%d")
    date_a = date.timetuple().tm_yday
    X_param = []
    Y_param = []
    for single_day_of_year, single_min_humidity in zip(df['day_of_year'],df['Min_Humidity']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_min_humidity)])
    return X_param,Y_param,date_a

def max_hum(file_name, predict):
    df = pd.read_csv(file_name)
    date = datetime.strptime(predict,"%Y-%m-%d")
    date_a = date.timetuple().tm_yday
    X_param = []
    Y_param = []
    for single_day_of_year, single_min_humidity in zip(df['day_of_year'],df['Max_Humidity']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_min_humidity)])
    return X_param,Y_param,date_a

def max_wind(file_name, predict):
    df = pd.read_csv(file_name)
    date = datetime.strptime(predict,"%Y-%m-%d")
    date_a = date.timetuple().tm_yday
    X_param = []
    Y_param = []
    for single_day_of_year, single_min_humidity in zip(df['day_of_year'],df['Max_Wind_SpeedKm/h']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_min_humidity)])
    return X_param,Y_param,date_a

def max_press(file_name, predict):
    df = pd.read_csv(file_name)
    date = datetime.strptime(predict,"%Y-%m-%d")
    date_a = date.timetuple().tm_yday
    X_param = []
    Y_param = []
    for single_day_of_year, single_min_humidity in zip(df['day_of_year'],df['Max_Sea_Level_Pressure']):
        X_param.append([float(single_day_of_year)])
        Y_param.append([float(single_min_humidity)])
    return X_param,Y_param,date_a

def prediction(predict):
    X_param_mit,Y_param_mit,date_mit = min_temp(file_name, predict)
    X_param_mat,Y_param_mat,date_mat = max_temp(file_name, predict)
    X_param_mih,Y_param_mih,date_mih = min_hum(file_name, predict)
    X_param_mah,Y_param_mah,date_mah = max_hum(file_name, predict)
    X_param_maw,Y_param_maw,date_maw = max_wind(file_name, predict)
    X_param_map,Y_param_map,date_map = max_press(file_name, predict)
    regr = LinearRegression()
    regr.fit(X_param_mit, Y_param_mit)
    mit_outcome = regr.predict(date_mit)
    regr.fit(X_param_mat, Y_param_mat)
    mat_outcome = regr.predict(date_mat)
    regr.fit(X_param_mih, Y_param_mih)
    mih_outcome = regr.predict(date_mih)
    regr.fit(X_param_mah, Y_param_mah)
    mah_outcome = regr.predict(date_mah)
    regr.fit(X_param_maw, Y_param_maw)
    maw_outcome = regr.predict(date_maw)
    regr.fit(X_param_map, Y_param_map)
    map_outcome = regr.predict(date_map)
    predictions = {}
    predictions['Minimum Temperature'] = mit_outcome
    predictions['Maximum Temperature'] = mat_outcome
    predictions['Minimum Humidity'] = mih_outcome
    predictions['Maximum Humidity'] = mah_outcome
    predictions['Maximum Wind Speed'] = maw_outcome
    predictions['Maximum Sea Pressure'] = map_outcome
    return predictions

def seven_days(date):
    X_param,Y_param,a = min_temp(file_name, date)
    dat = []
    day = []
    pred = []
    regr = LinearRegression()
    regr.fit(X_param, Y_param)
    date_a = datetime.strptime(date,"%Y-%m-%d")
    for i in range(0,8):
        dat.append(date_a +timedelta(days = i))
    for i in dat:
        day.append(i.timetuple().tm_yday)
    for i in day:
        pred.append(float(regr.predict(i)))
    dic = dict(temp = pred)
    json_dic = json.dumps(dic, ensure_ascii=False)
    return json_dic

def seven_max(date):
    X_param,Y_param,a = max_temp(file_name, date)
    dat = []
    day = []
    pred = []
    regr = LinearRegression()
    regr.fit(X_param, Y_param)
    date_a = datetime.strptime(date,"%Y-%m-%d")
    for i in range(0,8):
        dat.append(date_a +timedelta(days = i))
    for i in dat:
        day.append(i.timetuple().tm_yday)
    for i in day:
        pred.append(float(regr.predict(i)))
    dic = dict(temp = pred)
    json_dic = json.dumps(dic, ensure_ascii=False)
    return json_dic

def show_line(X_param, Y_param):
    regr = LinearRegression()
    regr.fit(X_param, Y_param)
    plt.scatter(X_param, Y_param, color = 'blue')
    plt.plot(X_param,regr.predict(X_param),color='red',linewidth=4)
    plt.xticks(())
    plt.yticks(())
    plt.show()
