from flask import Flask, request, jsonify
from flask_cors import CORS
from ai.predictor import predict_credit_score

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "FinTrack API is live."

# Dashboard summary endpoint (mock)
@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    return jsonify({
        "debt": 12450,
        "expenses": 2350,
        "income": 4200,
        "investments": 8920
    })

# AI prediction route
@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()

    score = int(data.get("score", 600))
    income = float(data.get("income", 0))
    expenses = float(data.get("expenses", 0))
    debt = float(data.get("debt", 0))

    predicted_score = predict_credit_score(score, income, expenses, debt)

    return jsonify({
        "predicted_score": predicted_score,
        "message": f"Estimated credit score in 6 months: {predicted_score}"
    })

if __name__ == "__main__":
    app.run(debug=True)
