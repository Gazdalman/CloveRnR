from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, NumberRange
from wtforms import DateTimeField, TextAreaField

class BookingForm(FlaskForm):
  start = DateTimeField('start', validators=[DataRequired()])
  end = DateTimeField('end', validators=[DataRequired()])
  notes = TextAreaField('notes', validators=[Length(max=255)])
