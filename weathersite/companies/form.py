from .models import EModel
import datetime
from django import forms
from functools import partial
from django.forms.widgets import Select

class EForm(forms.Form):
	DateInput = partial(forms.DateInput, {'class': 'datepicker', 'placeholder': 'Select the date...'})
	date = forms.DateField(widget=DateInput())
	FILTER_CHOICES = (
        ('Country', 'Select Country'),
        ('Hungary', 'Hungary'),
        ('Spain', 'Spain'),
        ('Malaysia', 'Malaysia'),
    )
	filter_by = forms.ChoiceField(label = 'Country',choices = FILTER_CHOICES)
