from flask import Flask, render_template, url_for, redirect, session
from config import *
from datetime import timedelta
from sqlalchemy import desc

app = Flask(__name__, template_folder='templates')
app.permanent_session_lifetime = timedelta(hours=12)


@app.route('/')
def main():
    return redirect(url_for('generate_avatar'))


@app.route('/generate_avatar/')
def generate_avatar():
    return render_template('avatar_page.html'), 404


@app.errorhandler(404)
def error(code):
    return render_template('error.html'), 404


if __name__ == '__main__':
    app.run(host=host)
