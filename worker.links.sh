#!/bin/bash

# WORKER SPECIFIC SYMLINKS SETUP

ROOT="$(dirname "$0")"
UPPER=$(cd ../ && pwd)

# ************ LINK ENV FILE *************
# create link to env pool in root and worker
if [ ! -h "$ROOT"/packages/worker/.env ];
  then
    ln -s "$UPPER"/@env-pool/base-project/.env "$ROOT"/packages/worker/.env
fi

# ************ LINK PACKAGES TO ROOT *************
# create a root links to the packages
if [ ! -h "$ROOT"/@worker ];
  then
    ln -s "$ROOT"/packages/worker/ "$ROOT"/@worker
fi

# ************ LINK IN WORKER *************
# create links in the worker package

if [ ! -h "$ROOT"/packages/worker/__config__ ];
  then
    ln -s "$ROOT"/__config__/ "$ROOT"/packages/worker/__config__
fi

if [ ! -h "$ROOT"/packages/worker/__storage__ ];
  then
    ln -s "$ROOT"/__storage__/ "$ROOT"/packages/worker/__storage__
fi