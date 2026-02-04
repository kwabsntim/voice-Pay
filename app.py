from flask import Flask,render_template


app=Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/payment')
def payment():
    return render_template('payment.html')

@app.route('/success')
def success():
    return render_template('success.html')