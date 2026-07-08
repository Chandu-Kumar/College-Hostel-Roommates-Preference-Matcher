from matching.preference import compare_preferences
from matching.hobby import hobby_score
from matching import weights


def calculate_match_score(
    preference1,
    preference2,
    hobbies1,
    hobbies2
):

    preference_score = compare_preferences(
        preference1,
        preference2
    )

    hobby_similarity = hobby_score(
        hobbies1,
        hobbies2
    )

    hobby_marks = hobby_similarity * weights.HOBBIES

    total_score = preference_score + hobby_marks

    return round(total_score, 2)