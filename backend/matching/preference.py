from datetime import timedelta

from matching import weights


def compare_preferences(p1, p2):

    score = 0

    # Sleep Time (15)
    sleep_diff = abs(
        timedelta(
            hours=p1.sleep_time.hour,
            minutes=p1.sleep_time.minute
        ) -
        timedelta(
            hours=p2.sleep_time.hour,
            minutes=p2.sleep_time.minute
        )
    )

    if sleep_diff <= timedelta(minutes=30):
        score += weights.SLEEP_TIME

    # Wake Time (10)
    wake_diff = abs(
        timedelta(
            hours=p1.wake_up_time.hour,
            minutes=p1.wake_up_time.minute
        ) -
        timedelta(
            hours=p2.wake_up_time.hour,
            minutes=p2.wake_up_time.minute
        )
    )

    if wake_diff <= timedelta(minutes=30):
        score += weights.WAKE_UP_TIME

    # Study Habit
    if p1.study_habit == p2.study_habit:
        score += weights.STUDY_HABIT

    # Cleanliness
    if p1.cleanliness == p2.cleanliness:
        score += weights.CLEANLINESS

    # Food
    if (
        p1.food_preference == p2.food_preference
        or p1.food_preference == "Any"
        or p2.food_preference == "Any"
    ):
        score += weights.FOOD

    # Smoking
    if p1.smoking == p2.smoking:
        score += weights.SMOKING

    # Drinking
    if p1.drinking == p2.drinking:
        score += weights.DRINKING

    # Personality
    if p1.personality == p2.personality:
        score += weights.PERSONALITY

    # Budget
    budget_diff = abs(
        float(p1.budget) -
        float(p2.budget)
    )

    if budget_diff <= 1000:
        score += weights.BUDGET

    return score