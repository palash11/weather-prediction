from django import forms
import datetime
from .models import FModel

class Example(forms.Form):
	FILTER_CHOICES = (
        ('Country', 'Select City'),
        ('Mumbai', 'Mumbai'),
        ('San Francisco', 'San Francisco'),
    )
	city = forms.ChoiceField(label = 'City',choices = FILTER_CHOICES, widget=forms.Select(attrs={'class':'c'}))

	CHOICES = (
        ('Country', 'Select country code'),
        ('IN', 'IN'),
        ('CA', 'CA'),
    )
	country = forms.ChoiceField(label = 'Country Code', choices = CHOICES, widget=forms.Select(attrs={'class':'c'}))
