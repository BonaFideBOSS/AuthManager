from typing import Literal

from sqlalchemy import or_, and_, cast, Text


def search_filter(search: str, model, cols: list = None):
    """database search filter builder"""
    filters = []
    search = search.lower()
    for c in model.__table__.c:
        if cols and c.name not in cols:
            continue
        filters.append(cast(getattr(model, c.name), Text).contains(search))
    return or_(*filters)


def sort_filter(col: str, order: Literal['asc', 'desc'], model):
    """database sort filter builder"""
    sort_field = getattr(model, col)
    return sort_field.asc() if order == "asc" else sort_field.desc()


def multiple_match(model, match_cols: list, query: str):
    """Create a filter to match multiple cols"""
    query = query.split(',')
    match_cols = [getattr(model, col) for col in match_cols]
    return or_(*[col.in_(query) for col in match_cols])


def multiple_match_relation(model,
                            model_col: str,
                            relation,
                            match_cols: list,
                            query: str):
    """Create a filter to match multiple related items"""
    query = query.split(',')
    model_col = getattr(model, model_col)
    match_cols = [getattr(relation, col) for col in match_cols]
    return and_(*[or_(*[model_col.any(col == val)
                        for col in match_cols])
                  for val in query])
