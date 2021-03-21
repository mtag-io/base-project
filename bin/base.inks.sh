#!/bin/bash

# SYMLINKS SETUP

ROOT="$(dirname "../" "$0")"
UPPER=$(cd ../../../ && pwd)

# ************ LINK ENV FILE *************
# create link to env pool in root and server
if [ -n "$1" ];
  then
    ENV="../../@env-pool"
  else
    ENV="$1"
fi

if [ ! -h .env ];
  then
    ln -s "$UPPER"/"$ENV"/base-project/.env .
fi

if [ ! -h "$ROOT"/packages/server/.env ];
  then
    ln -s "$UPPER"/"$ENV"/base-project/.env "$ROOT"/packages/server/.env
fi

# ************ LINK PACKAGES TO ROOT *************
# create a root links to the packages
if [ ! -h "$ROOT"/@server ];
  then
    ln -s "$ROOT"/packages/server/ "$ROOT"/@server
fi

if [ ! -h "$ROOT"/@common ];
  then
    ln -s "$ROOT"/packages/commloc/ "$ROOT"/@commloc
fi

if [ ! -h "$ROOT"/@web ];
  then
    ln -s "$ROOT"/packages/web/ "$ROOT"/@web
fi

# ************ LINK STORAGE IN PUBLIC *************
# create a storage link in the public server dir
if [ ! -h "$ROOT"/__public__/__storage__ ];
  then
    ln -s  "$ROOT"/__storage__ "$ROOT"/__public__/__storage__
fi

# ************ LINK IN SERVER *************
# create links in the server package

if [ ! -h "$ROOT"/packages/server/__config__ ];
  then
    ln -s "$ROOT"/__config__/ "$ROOT"/packages/server/__config__
fi

if [ ! -h "$ROOT"/packages/server/__resources__ ];
  then
    ln -s "$ROOT"/__resources__/ "$ROOT"/packages/server/__resources__
fi

if [ ! -h "$ROOT"/packages/server/__storage__ ];
  then
    ln -s "$ROOT"/__storage__/ "$ROOT"/packages/server/__storage__
fi

if [ ! -h "$ROOT"/packages/server/@common ];
    then
      ln -s "$ROOT"/packages/common/ "$ROOT"/packages/server/@common
fi

# ************ LINK IN WEB *************
# create links in the web package

if [ ! -h "$ROOT"/packages/web/__config__ ];
  then
    ln -s "$ROOT"/__config__/ "$ROOT"/packages/web/__config__
fi

if [ ! -h "$ROOT"/packages/web/__resources__ ];
  then
    ln -s "$ROOT"/__resources__/ "$ROOT"/packages/web/__resources__
fi

if [ ! -h "$ROOT"/packages/web/__storage__ ];
  then
    ln -s "$ROOT"/__storage__/ "$ROOT"/packages/web/__storage__
fi

if [ ! -h "$ROOT"/packages/web/@common ];
  then
    ln -s "$ROOT"/packages/common/ "$ROOT"/packages/web/@common
fi
