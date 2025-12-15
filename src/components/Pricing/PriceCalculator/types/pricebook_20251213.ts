export const pricebook = {
  Minimums: {
    shared: {
      Low: {
        'NON-HA': 45000000,
        HA: 45000000,
      },
      High: {
        'NON-HA': 400000000,
        HA: 400000000,
      },
    },
    dedicated: {
      Low: {
        'NON-HA': 1300000000,
        HA: 1300000000,
      },
      High: {
        'NON-HA': 2300000000,
        HA: 2300000000,
      },
    },
  },
  'Tier Factors': {
    shared: {
      Low: 1.2,
      High: 1,
    },
    dedicated: {
      Low: 1.15,
      High: 1.5,
    },
  },
  GCP: {
    shared: {
      Base: {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-east1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-east4': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.128836,
          block_store: 1.1,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-east5': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.1263,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-central1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-west1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-west2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.2021,
          block_store: 1.2,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-west3': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.2021,
          block_store: 1.2,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-west4': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.128836,
          block_store: 1.1,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'europe-north1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.1011,
          block_store: 1.1,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'europe-west1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.102625,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'europe-west2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.28844,
          block_store: 1.2,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'europe-west3': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.28844,
          block_store: 1.2,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'australia-southeast1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.419384,
          block_store: 1.352941,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'asia-northeast1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.284228,
          block_store: 1.3,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'asia-east2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.4,
          block_store: 1.1,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'asia-southeast1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.2337,
          block_store: 1.1,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'asia-south1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.201127,
          block_store: 1.2,
          object_store: 1.15,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'southamerica-east1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.5879,
          block_store: 1.5,
          object_store: 1.75,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
    },
    dedicated: {
      Base: {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-central1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
      'us-west1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 212500,
          },
          'Price per 1GiB Backup': {
            object_store: 22000,
          },
        },
      },
    },
  },
  AWS: {
    shared: {
      Base: {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'us-east-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'us-west-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'eu-central-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.206349,
          block_store: 1.19,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-northeast-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.291667,
          block_store: 1.2,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-southeast-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.25,
          block_store: 1.2,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-south-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 0.714767,
          block_store: 1.14,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 69500,
              pq: 52125,
              sq: 55600,
              'rq-8': 48650,
              'rq-1': 41700,
              bq: 45175,
            },
            flat: {
              None: 22240,
              bq: 15290,
              'rq-8': 18765,
              'rq-1': 13900,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 100000,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
    },
    dedicated: {
      Base: {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'us-east-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'us-east-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'us-west-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.0,
          block_store: 1.0,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-northeast-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.291667,
          block_store: 1.2,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-northeast-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.229167,
          block_store: 1.14,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-northeast-3': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.291667,
          block_store: 1.2,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-south-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 0.714767,
          block_store: 1.14,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'eu-north-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.064935,
          block_store: 1.045,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'eu-west-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.197605,
          block_store: 1.1,
          object_store: 1.0,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'eu-west-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.174603,
          block_store: 1.16,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'eu-west-3': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.174603,
          block_store: 1.16,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'eu-central-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.206349,
          block_store: 1.19,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ca-central-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.114583,
          block_store: 1.1,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'sa-east-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.59375,
          block_store: 1.9,
          object_store: 2.075,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-southeast-1': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.25,
          block_store: 1.2,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
      'ap-southeast-2': {
        High: {
          'Price per 1M Dims': {
            hnsw: {
              None: 32500,
              pq: 24375,
              sq: 26000,
              'rq-8': 22750,
              'rq-1': 19500,
              bq: 21125,
            },
            flat: {
              None: 10400,
              bq: 7150,
              'rq-8': 8775,
              'rq-1': 6500,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
        'Regional Factor': {
          compute: 1.25,
          block_store: 1.2,
          object_store: 1.25,
        },
        Low: {
          'Price per 1M Dims': {
            hnsw: {
              None: 40500,
              pq: 30375,
              sq: 32400,
              'rq-8': 28350,
              'rq-1': 24300,
              bq: 26325,
            },
            flat: {
              None: 12960,
              bq: 8910,
              'rq-8': 10935,
              'rq-1': 8100,
            },
          },
          'Price per 1GiB Storage': {
            block_store: 1587500,
          },
          'Price per 1GiB Backup': {
            object_store: 4400,
          },
        },
      },
    },
  },
  metadata: {
    DateCreated: '2025-12-13T10:29:59.858881',
  },
};
