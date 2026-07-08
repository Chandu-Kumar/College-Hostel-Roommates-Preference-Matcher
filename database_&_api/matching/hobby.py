def hobby_score(
    hobbies1: list[str],
    hobbies2: list[str]
):

    set1 = set(hobbies1)
    set2 = set(hobbies2)

    common = set1.intersection(set2)

    total = set1.union(set2)

    if len(total) == 0:
        return 0

    similarity = len(common) / len(total)

    return similarity