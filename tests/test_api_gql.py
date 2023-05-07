import os
import utils


def test_get(apikey_empty_weaviate):
    proc_script = utils.load_and_prep_script("./_includes/code/graphql.get.simple.py")
    exec(proc_script)
