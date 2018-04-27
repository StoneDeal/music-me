from flask import Flask, request, redirect, render_template, session, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://tune-tracker:TunePass18@localhost:8889/tune-tracker'
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)
app.secret_key = 'y44tkGcys&zP3BJ'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))
    artists = db.relationship('Artist', backref='owner')
    
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username

class Artist(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    mbid = db.Column(db.String(120))
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, mbid, owner):
        self.mbid = mbid
        self.owner = owner

@app.route("/", methods=['POST', 'GET'])
def index():
    return render_template('index.html')


@app.route("/artist", methods=['POST', 'GET'])
def artist():
    return render_template('artist.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        users = User.query.filter_by(username=username)
        if users.count() == 1:
            user = users.first()
            if password == user.password:
                session['user'] = user.username
                flash('welcome back, '+user.username)
                return redirect("/")
        flash('bad username or password')
        return redirect("/login")


def valid_user(string):
    error_count = 0

    if string == '':
        error_count += 1
    for char in string:
        if char == ' ':
            error_count += 1
    u_len = len(string)
    if u_len > 20 or u_len < 3:
        error_count += 1
    if error_count == 0:
        return True
    else:
        return False

def valid_pass(string):
    error_count = 0

    for char in string:
        if char == ' ':
            error_count += 1
    p_len = len(string)
    if p_len > 20 or p_len < 3:
        error_count += 1
    if error_count == 0:
        return True
    else:
        return False    


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
        return redirect("/")
    else:
        return render_template('signup.html')


@app.route("/logout", methods=['POST'])
def logout():
    del session['user']
    return redirect("/signup")


if __name__ == '__main__':
    app.run()