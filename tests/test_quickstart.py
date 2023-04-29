import os
import utils


def test_client_instantiation(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script(
        # "_includes/code/wcs.client.instantiation.mdx"
        "./_includes/code/quickstart.autoschema.endtoend.py"
    )
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====

    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    assert "classes" in test_namespace["schema"].keys()

