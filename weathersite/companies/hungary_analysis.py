import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsClassifier
import datetime
from datetime import datetime
from django.http import HttpResponse
from datetime import *
import json
from pymongo import MongoClient

#LinearRegression
def regression(date):
	#Temperature
	filepath = '/home/dipakr/projects/weather-analysis/weathersite/all csv/pd11_max.csv'
        df = pd.read_csv(filepath)
	predictor = df['Ordinal']
	target = df['Temperature (C)']
	predictor_one = np.array(predictor)
	predictor_new = predictor_one.reshape(len(predictor_one),1)
	target_one = np.array(target)
	target_new = target_one.reshape(len(target_one),1)
	model = LinearRegression()
	model.fit(predictor_new, target_new)
	date_a = datetime.strptime(date, "%Y-%m-%d")
	ordinal = date_a.toordinal()
	values = np.array(ordinal)
	a = np.atleast_1d(values)
	v = values.reshape(len(a),1)
	target_predict = model.predict(v)


	#humidity
	target_h = df['Humidity']
	predictor_one_h = np.array(predictor)
	predictor_new_h = predictor_one_h.reshape(len(predictor_one_h),1)
	target_one_h = np.array(target_h)
	target_new_h = target_one_h.reshape(len(target_one_h),1)
	model.fit(predictor_new_h, target_new_h)
	values_h = np.array(ordinal)
	a_h = np.atleast_1d(values_h)
	v_h = values.reshape(len(a_h),1)
	target_predict_h = model.predict(v_h)

	#wind speed
	target_w = df['Wind Speed (km/h)']
	predictor_one_w = np.array(predictor)
	predictor_new_w = predictor_one_w.reshape(len(predictor_one_w),1)
	target_one_w = np.array(target_w)
	target_new_w = target_one_w.reshape(len(target_one_w),1)
	model.fit(predictor_new_w, target_new_w)
	values_w = np.array(ordinal)
	a_w = np.atleast_1d(values_w)
	v_w = values.reshape(len(a_w),1)
	target_predict_w = model.predict(v_w)

	#pressure
	target_p = df['Pressure (millibars)']
	predictor_one_p = np.array(predictor)
	predictor_new_p = predictor_one_p.reshape(len(predictor_one_p),1)
	target_one_p = np.array(target_p)
	target_new_p = target_one_p.reshape(len(target_one_p),1)
	model.fit(predictor_new_p, target_new_p)
	values_p = np.array(ordinal)
	a_p = np.atleast_1d(values_p)
	v_p = values.reshape(len(a_p),1)
	target_predict_p = model.predict(v_p)

	#precip type
	target_pr = df['Precip Type']
	predictor_one_pr = np.array(predictor)
	predictor_new_pr = predictor_one_pr.reshape(len(predictor_one_pr),1)
	target_one_pr = np.array(target_pr)
	target_new_pr = target_one_pr.reshape(len(target_one_pr),1)
	knn = KNeighborsClassifier()
	knn.fit(predictor_new_pr, target_new_pr)
	values_pr = np.array(ordinal)
	a_pr = np.atleast_1d(values_pr)
	v_pr = values_pr.reshape(len(a_pr),1)
	target_predict_pr = knn.predict(v_pr)
	ty = int(target_predict_pr[0])
	if ty == 0:
		precip = 'Rain'
	else:
		precip = 'Snow'

	li = [target_predict, (target_predict_h * 100), target_predict_p, target_predict_w, precip]
	return li
	

def val_grp(date):
	dat = []
	b_ordinal = []
	pred = []
	filepath = '/home/dipakr/projects/weather-analysis/weathersite/all csv/pd11_max.csv'
        df = pd.read_csv(filepath)
	predictor = df['Ordinal']
	target = df['Temperature (C)']
	predictor_one = np.array(predictor)
	predictor_new = predictor_one.reshape(len(predictor_one),1)
	target_one = np.array(target)
	target_new = target_one.reshape(len(target_one),1)
	model = LinearRegression()
	model.fit(predictor_new, target_new)
	date_a = datetime.strptime(date, "%Y-%m-%d")
	for i in range(0,8):
		dat.append(date_a +timedelta(days = i))
	for i in dat:
		b_ordinal.append(i.toordinal())
	for i in b_ordinal:
		pred.append(float(model.predict(i)))
	dic = dict(temp = pred)
	json_dic = json.dumps(dic, ensure_ascii=False)
	return json_dic


