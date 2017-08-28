from __future__ import unicode_literals

from django.db import models
import pandas as pd
import datetime

class EModel(models.Model):
    date = models.DateField()

class FModel(models.Model):
	FILTER_CHOICES = (
        ('Country', 'Select City'),
        ('Mumbai', 'Mumbai'),
        ('San_Francisco', 'San_Francisco'),
    )
	city = models.CharField(max_length = 4, choices = FILTER_CHOICES)

	CHOICES = (
        ('Country', 'Select Country'),
        ('IN', 'IN'),
        ('CA', 'CA'),
    )
	country = models.CharField(max_length = 4, choices = CHOICES)
