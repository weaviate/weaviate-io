import os
import utils


def test_python_script(apikey_empty_weaviate):
    proc_script = utils.load_and_prep_script("./_includes/code/quickstart.autoschema.endtoend.py")
    exec(proc_script)
