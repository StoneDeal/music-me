from flask import Flask, request, redirect, render_template, session, flash
from pyrebase import pyrebase

config = {
    "apiKey": "AIzaSyAhMfFvDLR5sq-kMuntuSIdgcCGoXP3zRc",
    "authDomain": "tune-tracker.firebaseapp.com",
    "databaseURL": "https://tune-tracker.firebaseio.com",
    "projectId": "tune-tracker",
    "storageBucket": "tune-tracker.appspot.com",
    "messagingSenderId": "479687553274"
}
firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
user = auth.sign_in_with_email_and_password("stonedeal23@gmail.com", "GoodPass23")

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route("/", methods=['POST', 'GET'])
def index():
    return render_template('index.html')


@app.route("/artist", methods=['POST', 'GET'])
def artist():
    return render_template('artist.html')



@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        verify = request.form['verify']
        if valid_user(username) == False:
            flash('Please enter a valid username')
            return redirect('/signup')
        user_db_count = User.query.filter_by(username=username).count()
        if user_db_count > 0:
            flash('yikes! "' + username + '" is already taken and password reminders are not implemented')
            return redirect('/signup')
        if valid_pass(password) == False:
            flash('Please enter a valid password')
            return redirect('/signup')
        if password != verify:
            flash('passwords did not match')
            return redirect('/signup')
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        session['user'] = user.username
        return redirect("/blog")
    else:
        return render_template('signup.html')


if __name__ == '__main__':
    app.run()