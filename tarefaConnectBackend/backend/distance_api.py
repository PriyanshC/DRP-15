import pgeocode

dist = pgeocode.GeoDistance('GB')


def distance_between(fst: str, snd: str) -> float:
    first = fst.split(" ")[0]
    second = snd.split(" ")[0]
    return dist.query_postal_code(first, second)
