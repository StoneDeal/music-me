
    
console.log("test")
/*
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
*/
document.getElementById("signup-submit").addEventListener("click", function(){
    var firebaseRef = firebase.database().ref();
    var username = $('#username').val();
    var password = $('#password').val();
    var verify = $('#verify').val();

    if (validUser(username) == false){

        window.location.replace('http://127.0.0.1:5000/signup');
    }
    /*user_db_count = User.query.filter_by(username=username).count()
    if user_db_count > 0:
            flash('yikes! "' + username + '" is already taken and password reminders are not implemented')
            return redirect('/signup')
    */
    if (validPass(password) == false){

        window.location.replace('http://127.0.0.1:5000/signup');
    }
    if (password != verify){

        window.location.replace('http://127.0.0.1:5000/signup');
    }
    /*
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    session['user'] = user.username
    return redirect("/blog")
    */
});


function validUser(string){

    var errorCount = 0;

    if (string == ''){
       errorCount++;
    }
    for (i=0; i<string.length; i++){
        if (string.charAt(i) == ' '){
            errorCount++;
        }
    }
    if (string.length > 20 || string.length < 4){
        errorCount++;
    }
    if (errorCount == 0){
        return true;
    }
    else {
        return false;
    }
}

function validPass(string){
    var errorCount = 0

    if (string == ''){
        errorCount++;
     }
    for (i=0; i<string.length; i++){
        if (string.charAt(i) == ' '){
            errorCount++;
        }
    }
    if (string.length > 20 || string.length < 4){
        errorCount++;
    }
    if (errorCount == 0){
        return true;
    }
    else {
        return false;
    }
}



/*
$(document).ready(function() {
    $('submit-button').submit(render);
  });
*/