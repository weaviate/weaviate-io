// Auto-generated from product_team/pricing/data/pricebook-20260415_165400.json
// Source of truth: product_team GeneratePriceBook notebook — do not hand-edit.
// Adds the Mid tier (Plus) and hfresh.Auto rates vs. the 2025-12-13 book.
export const pricebook = {
  "Minimums": {
    "shared": {
      "Low": {
        "NON-HA": 45000000,
        "HA": 45000000
      },
      "Mid": {
        "NON-HA": 280000000,
        "HA": 280000000
      },
      "High": {
        "NON-HA": 400000000,
        "HA": 400000000
      }
    },
    "dedicated": {
      "Low": {
        "NON-HA": 1300000000,
        "HA": 1300000000
      },
      "High": {
        "NON-HA": 2300000000,
        "HA": 2300000000
      }
    }
  },
  "Tier Factors": {
    "shared": {
      "Low": 1.2,
      "Mid": 1,
      "High": 1
    },
    "dedicated": {
      "Low": 1.15,
      "High": 1.5
    }
  },
  "AWS": {
    "shared": {
      "Base": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "us-east-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "us-west-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 0.954545
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "eu-central-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 1.206349,
          "block_store": 1.19,
          "object_store": 1.022727
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-northeast-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 1.291667,
          "block_store": 1.2,
          "object_store": 1.136364
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-southeast-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 1.25,
          "block_store": 1.2,
          "object_store": 1.136364
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-south-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 25300
          },
          "Price per 1GiB Offloaded": {
            "object_store": 25300
          }
        },
        "Regional Factor": {
          "compute": 0.714767,
          "block_store": 1.14,
          "object_store": 1.090909
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100000
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      }
    },
    "dedicated": {
      "Base": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "us-east-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "us-east-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1.045455
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "us-west-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 0.954545
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-northeast-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.291667,
          "block_store": 1.2,
          "object_store": 1.136364
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-northeast-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.229167,
          "block_store": 1.14,
          "object_store": 1.090909
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-northeast-3": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.291667,
          "block_store": 1.2,
          "object_store": 1.136364
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-south-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 0.714767,
          "block_store": 1.14,
          "object_store": 1.090909
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "eu-north-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.064935,
          "block_store": 1.045,
          "object_store": 1.045455
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "eu-west-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.197605,
          "block_store": 1.1,
          "object_store": 1.045455
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "eu-west-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.174603,
          "block_store": 1.16,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "eu-west-3": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.174603,
          "block_store": 1.16,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "eu-central-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.206349,
          "block_store": 1.19,
          "object_store": 1.022727
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ca-central-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.114583,
          "block_store": 1.1,
          "object_store": 1.090909
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "sa-east-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.59375,
          "block_store": 1.9,
          "object_store": 1.772727
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-southeast-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.25,
          "block_store": 1.2,
          "object_store": 1.090909
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "ap-southeast-2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.25,
          "block_store": 1.2,
          "object_store": 1.136364
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      },
      "me-central-1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        },
        "Regional Factor": {
          "compute": 1.231092,
          "block_store": 1.21,
          "object_store": 1.090909
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 1587500
          },
          "Price per 1GiB Backup": {
            "object_store": 4400
          },
          "Price per 1GiB Offloaded": {
            "object_store": 4400
          }
        }
      }
    }
  },
  "GCP": {
    "shared": {
      "Base": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-east1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-east4": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.128836,
          "block_store": 1.1,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-east5": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.1263,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-central1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.2021,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west3": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.2021,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west4": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.128836,
          "block_store": 1.1,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-north1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.1011,
          "block_store": 1.1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-west1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.102625,
          "block_store": 1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-west2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.28844,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-west3": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.28844,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "australia-southeast1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.419384,
          "block_store": 1.352941,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-northeast1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.284228,
          "block_store": 1.3,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-east2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.4,
          "block_store": 1.1,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-southeast1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.2337,
          "block_store": 1.1,
          "object_store": 1
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-south1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.201127,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "southamerica-east1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.5879,
          "block_store": 1.5,
          "object_store": 1.75
        },
        "Mid": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 69500,
              "pq": 52125,
              "sq": 44480,
              "rq-8": 42395,
              "rq-1": 35445,
              "bq": 37530
            },
            "hfresh": {
              "Auto": 32665
            },
            "flat": {
              "None": 9938,
              "bq": 9522,
              "rq-8": 5908,
              "rq-1": 5421
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      }
    },
    "dedicated": {
      "Base": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-east1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-east4": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.128836,
          "block_store": 1.1,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-east5": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.1263,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-central1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.2021,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west3": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.2021,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "us-west4": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.128836,
          "block_store": 1.1,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-north1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.1011,
          "block_store": 1.1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-west1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.102625,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-west2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.28844,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "europe-west3": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.28844,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "australia-southeast1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.419384,
          "block_store": 1.352941,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-northeast1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.284228,
          "block_store": 1.3,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-east2": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.4,
          "block_store": 1.1,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-southeast1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.2337,
          "block_store": 1.1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "asia-south1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.201127,
          "block_store": 1.2,
          "object_store": 1.15
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      },
      "southamerica-east1": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        },
        "Regional Factor": {
          "compute": 1.5879,
          "block_store": 1.5,
          "object_store": 1.75
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 212500
          },
          "Price per 1GiB Backup": {
            "object_store": 22000
          },
          "Price per 1GiB Offloaded": {
            "object_store": 22000
          }
        }
      }
    }
  },
  "AZURE": {
    "shared": {},
    "dedicated": {
      "Base": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      },
      "eastus": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1,
          "block_store": 1,
          "object_store": 1
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      },
      "northeurope": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1.117438,
          "block_store": 1,
          "object_store": 0.657895
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      },
      "switzerlandnorth": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1.558719,
          "block_store": 1.427273,
          "object_store": 0.723684
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      },
      "canadacentral": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1.11032,
          "block_store": 1.1,
          "object_store": 0.723684
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      },
      "canadaeast": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1.11032,
          "block_store": 1.2,
          "object_store": 0.723684
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      },
      "westeurope": {
        "Low": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 40500,
              "pq": 30375,
              "sq": 25920,
              "rq-8": 24705,
              "rq-1": 20655,
              "bq": 21870
            },
            "hfresh": {
              "Auto": 19035
            },
            "flat": {
              "None": 5792,
              "bq": 5548,
              "rq-8": 3442,
              "rq-1": 3159
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        },
        "Regional Factor": {
          "compute": 1.195122,
          "block_store": 1.181818,
          "object_store": 0.657895
        },
        "High": {
          "Price per 1M Dims": {
            "hnsw": {
              "None": 32500,
              "pq": 24375,
              "sq": 20800,
              "rq-8": 19825,
              "rq-1": 16575,
              "bq": 17550
            },
            "hfresh": {
              "Auto": 15275
            },
            "flat": {
              "None": 4648,
              "bq": 4452,
              "rq-8": 2762,
              "rq-1": 2535
            }
          },
          "Price per 1GiB Storage": {
            "block_store": 100375
          },
          "Price per 1GiB Backup": {
            "object_store": 16720
          },
          "Price per 1GiB Offloaded": {
            "object_store": 16720
          }
        }
      }
    }
  },
  "Query Agent": {
    "Price Query Agent": {
      "monthly_fee": 30000000,
      "free_requests": 4000,
      "free_request_cycle": "monthly",
      "model_unit_price": 100
    }
  },
  "Embedding Service": {
    "Price per 1M Tokens": {
      "Snowflake arctic-embed 1.5": 25000,
      "Snowflake arctic-embed 2.0": 40000,
      "ModernVBERT colmodernvbert:": 65000
    }
  },
  "metadata": {
    "DateCreated": "2026-04-15T16:54:00.997063"
  }
};
