from flask import Blueprint, send_file, request, redirect
from flask_login import login_required
from os.path import splitext, join
from database.user import createUser, User, getUsers, getUserWeb
from database.login import loginManager
import json

blueprint = Blueprint("usersApi", __name__)


@loginManager.user_loader
def load_user(user_id):
    return User(user_id)


@loginManager.unauthorized_handler
def unauthorized():
    return redirect("/login", 302)


@blueprint.route("/users", methods=["GET", "POST"])
@login_required
def users():
    return send_file("static/html/users.html")


@blueprint.route("/addUser", methods=["GET", "POST"])
@login_required
def addUser():
    return send_file("static/html/users/subpages/addUser.html")


@blueprint.route("/editUser", methods=["GET", "POST"])
@login_required
def editUser():
    return send_file("static/html/users/subpages/editUser.html")


@blueprint.route("/createUser", methods=["GET", "POST"])
@login_required
def createNewUser():
    if request.method == "POST":
        file = None
        user = {}
        user["name"] = request.form.get("name")
        user["username"] = request.form.get("username")
        # Add hash
        user["password"] = request.form.get("password")
        user["email"] = request.form.get("email")
        if "file" not in request.files:
            user["profile_picture"] = None
        else:
            file = request.files["file"]
            if file.filename == "":
                file = None
                user["profile_picture"] = None
            else:
                filename, extension = splitext(file.filename)
                if extension not in (".jpg", ".jpeg", ".png"):
                    raise Exception("Invalid profile picture file format")
                user["profile_picture"] = str(user["username"]) + extension

        response = createUser(user)
        if file:
            file.save(join("static/profilePictures/", user["profile_picture"]))

        return redirect("/addUser", 302)

@blueprint.route("/getUsers", methods=["GET"])
@login_required
def retrieveUsers():
    if request.method == "GET":
        return (json.dumps(getUsers()), 200)
    
@blueprint.route("/getUser", methods=["GET"])
@login_required
def retrieveUser():
    if request.method == "GET":
        username = request.args.get("username")
        return (json.dumps(getUserWeb(username)), 200) 