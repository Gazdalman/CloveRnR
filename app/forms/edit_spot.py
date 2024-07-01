from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, NumberRange
from wtforms import StringField, FloatField, TextAreaField

class EditSpotForm(FlaskForm):
  name = StringField('name', validators=[Length(min=3,max=50,message='Name must be between 3 and 50 characters long')])
  address = StringField('address', validators=[Length(max=100,message='Address cannot be more than 100 characters long')])
  city = StringField('location', validators=[Length(max=100,message='City cannot be more than 100 characters long')])
  state = StringField('location', validators=[Length(max=100,message='State cannot be more than 100 characters long')])
  lat = FloatField('lat', validators=[NumberRange(min=-90,max=90,message='Latitude must be between -90 and 90')])
  lng = FloatField('lng', validators=[NumberRange(min=-180,max=180,message='Longitude must be between -180 and 180')])
  description = TextAreaField('description', validators=[Length(max=250,message='Description cannot be more than 250 characters long')])
  price = FloatField('price', validators=[NumberRange(min=1,max=99999.99,message='Price must be between $1 and $100,000')])
