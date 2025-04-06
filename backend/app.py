from flask import Flask, request, jsonify
from flask_cors import CORS
from ai.predictor import predict_credit_score  # ✅ Import AI logic
from api.routes import bp as api_bp

app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(api_bp)

@app.route("/")
def home():
    return "FinTrack API is running"

if __name__ == "__main__":
    app.run(debug=True)