from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileRequired
from wtforms import FileField, BooleanField
from wtforms.validators import DataRequired, Length, ValidationError
from app.api.aws_helper import ALLOWED_IMG_EXTENSIONS

class SpotImageForm(FlaskForm):
  image = FileField('image', validators=[FileAllowed(ALLOWED_IMG_EXTENSIONS), DataRequired()])
  preview = BooleanField('preview', default=False)
