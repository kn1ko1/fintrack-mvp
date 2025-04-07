from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import Bcrypt
import jwt
import datetime

SECRET_KEY = "your-secret-key"  # TODO: Move to environment config later
bcrypt = Bcrypt()
bp = Blueprint('users', __name__, url_prefix='/api')


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    users_db = current_app.config.setdefault("USERS_DB", {})

    if users_db.get(email):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    users_db[email] = {"email": email, "password": hashed_pw}

    return jsonify({"message": "User registered successfully"}), 201


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    users_db = current_app.config.get("USERS_DB", {})
    user = users_db.get(email)

    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token})


@bp.route("/me", methods=["GET"])
def get_user():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

        users_db = current_app.config.get("USERS_DB", {})
        user = users_db.get(payload["email"])

        if user:
            return jsonify({"email": user["email"]})
        else:
            return jsonify({"error": "User not found"}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except Exception:
        return jsonify({"error": "Invalid token"}), 401
