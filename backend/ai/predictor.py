def predict_credit_score(score, income, expenses, debt):
    """
    Predicts a future credit score based on current financial state.
    """
    surplus = income - expenses
    improvement = max(0, (surplus * 0.05) - (debt * 0.01))
    future_score = min(850, score + improvement * 6)  # Assume 6 months growth
    return round(future_score)
