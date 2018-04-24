from flask import Flask, request, redirect, render_template, session, flash


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
        return render_template('signup.html')


if __name__ == '__main__':
    app.run()