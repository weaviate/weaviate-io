import pytest
import utils


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/graphql.get.simple.py",
        "./_includes/code/graphql.additional.py",
        "./_includes/code/graphql.filters.py",
        "./_includes/code/graphql.metadata.py",
        "./_includes/code/graphql.search-operators.py",
        "./_includes/code/graphql.filters.nearText.py",
        "./_includes/code/graphql.filters.nearText.generic.py",
        "./_includes/code/graphql.aggregate.simple.py",
        "./_includes/code/graphql.get.beacon.v3.py",
    ],
)
def test_py(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)
