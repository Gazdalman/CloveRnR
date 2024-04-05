from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, NumberRange
from wtforms import StringField, FloatField, TextAreaField

class CreateSpotForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(min=3,max=50)])
  # address = StringField('address', validators=[DataRequired(), Length(max=100)])
  location = StringField('location', validators=[DataRequired(), Length(max=100)])
  universe = StringField('location', validators=[DataRequired(), Length(max=150)])
  lat = FloatField('lat', validators=[DataRequired(), NumberRange(min=-90,max=90)])
  lng = FloatField('lng', validators=[DataRequired(), NumberRange(min=-180,max=180)])
  description = TextAreaField('description', validators=[Length(max=250)])
  price = FloatField('price', validators=[DataRequired(), NumberRange(min=1,max=99999.99)])
