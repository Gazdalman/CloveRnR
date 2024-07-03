from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, NumberRange
from wtforms import DateTimeField, TextAreaField

class BookingForm(FlaskForm):
  start = DateTimeField('start', format='%m-%d-%Y', validators=[DataRequired()])
  end = DateTimeField('end', format='%m-%d-%Y', validators=[DataRequired()])
  notes = TextAreaField('notes', validators=[Length(max=255)])
