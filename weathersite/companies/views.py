from .hungary_analysis import regression,val_grp
from django.http import HttpResponse
from django.shortcuts import render, render_to_response
import datetime
from django.template import Context
from .forms import Example
from django.http import HttpResponseRedirect
from django.template import RequestContext
from .form import EForm
from django.http import JsonResponse
from .madrid_analysis import prediction, seven_days, seven_max
from .global_analysis import prediction_g

def view(request):
    form = EForm()
    forms = Example()
    if request.method == 'POST':
        form = EForm(request.POST)
        forms = Example(request.POST)
        if form.is_valid():
            field1 = request.POST['date']
            ans = request.POST['filter_by']
            if ans == 'Hungary':
                a = regression(field1)
                temp = a[0]
                hum = a[1]
                pre = a[2]
                wind = a[3]
                prec = a[4]
                templ = format(float(temp), '.4f')
                humi =format(float(hum), '.4f')
                press = format(float(pre), '.4f')
                ws = format(float(wind), '.4f')
                precip = str(prec)
                return render(request, 'companies/view/weather_prediction.html', { "form": form, "forms" : forms, "one" : templ, "two" : humi, "three" : press, "four" : ws, "five" : precip})
            if ans == 'Spain':
                out = prediction(field1)
                return render(request, 'companies/view/weather_spain.html', {"form" : form, "forms" : forms, "one" : format(float(out['Minimum Temperature']), '.4f'), "two" : format(float(out['Maximum Temperature']), '.4f'), "three" : format(float(out['Minimum Humidity']), '.4f'), "four" : format(float(out['Maximum Humidity']), '.4f'),
                              "five" : format(float(out['Maximum Wind Speed']), '.4f'), "six" : format(float(out['Maximum Sea Pressure']), '.4f')})
            if ans == 'Malaysia':
                a = prediction_g(field1)
                return render(request, 'companies/view/weather_malaysia.html', { "form": form, "forms": forms, "one" : format(float(a), '.4f')})
    return render(request, 'companies/view/weather_prediction.html', {'form': form, "forms" : forms})

def prin(request,date):
    return HttpResponse(val_grp(date))

def seven(request, date):
    return HttpResponse(seven_days(date))

def max(request,date):
    return HttpResponse(seven_max(date))

def url_redirect(request):
    return HttpResponseRedirect("/weather/")
