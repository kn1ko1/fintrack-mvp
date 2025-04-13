from flask import Blueprint, request, jsonify, current_app

bp = Blueprint("entries", __name__, url_prefix="/api")

@bp.route("/entries", methods=["POST"])
def add_entry():
    data = request.get_json()
    required = ["name", "amount", "type", "frequency"]
    if not all(field in data for field in required):
        return jsonify({"error": "Missing fields"}), 400

    entry = {
        "name": data["name"],
        "amount": float(data["amount"]),
        "type": data["type"],  # "income" or "expense"
        "frequency": data["frequency"]
    }

    entries = current_app.config.setdefault("ENTRIES", [])
    entries.append(entry)
    return jsonify({"message": "Entry added", "entry": entry}), 201


@bp.route("/entries", methods=["GET"])
def get_entries():
    entries = current_app.config.get("ENTRIES", [])
    return jsonify(entries)
