from flask import current_app
from flask import Blueprint, request, jsonify
from ai.predictor import predict_credit_score

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({
        "debt": 12450,
        "expenses": 2350,
        "income": 4200,
        "investments": 8920
    })

@bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        required_fields = ["score", "income", "expenses", "debt"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        score = int(data["score"])
        income = float(data["income"])
        expenses = float(data["expenses"])
        debt = float(data["debt"])

        predicted_score = predict_credit_score(score, income, expenses, debt)

        users_db = current_app.config["USERS_DB"]

        return jsonify({
            "predicted_score": predicted_score,
            "message": f"Estimated credit score in 6 months: {predicted_score}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
