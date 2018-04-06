from flask import Flask, request, redirect, render_template, session, flash
import pyrebase

config = {
    apiKey: "AIzaSyAhMfFvDLR5sq-kMuntuSIdgcCGoXP3zRc",
    authDomain: "tune-tracker.firebaseapp.com",
    databaseURL: "https://tune-tracker.firebaseio.com",
    projectId: "tune-tracker",
    storageBucket: "tune-tracker.appspot.com",
    messagingSenderId: "479687553274"
}
firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
user = auth.sign_in_with_email_and_password("stonedeal23@gmail.com", "GoodPass23")

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route("/", methods=['POST', 'GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()