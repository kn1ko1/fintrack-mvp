from flask import Flask
from flask_cors import CORS
from api.routes import bp as api_bp
from api.users import bp as user_bp
from entries import bp as entries_bp

app = Flask(__name__)
app.register_blueprint(entries_bp)
CORS(app)

# Simulated user database added to config
# Simulated user database added to config
app.config["USERS_DB"] = {}

# Register API blueprints
app.register_blueprint(api_bp)
app.register_blueprint(user_bp)

@app.route("/")
def home():
    return "FinTrack API is running"

if __name__ == "__main__":
    app.run(debug=True)
