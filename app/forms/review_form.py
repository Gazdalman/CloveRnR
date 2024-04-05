from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, NumberRange
from wtforms import IntegerField, TextAreaField

class ReviewForm(FlaskForm):
  stars = IntegerField('stars', validators=[DataRequired(), NumberRange(min=1,max=5)])
  text = TextAreaField('text', validators=[Length(max=255)])
  