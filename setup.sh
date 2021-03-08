# SYMLINKS SETUP

# create link to env pool
if [ ! -h .env ];
  then
    ln -s ../../@env-pool/fixpics/.env .
fi

# create a root links to the packages
if [ ! -h @server ];
  then
    ln -s ./packages/server/ ./@server
fi

if [ ! -h @common ];
  then
    ln -s ./packages/common/ ./@common
fi

if [ ! -h @web ];
  then
    ln -s ./packages/web/ ./@web
fi

if [ ! -h @worker ];
  then
    ln -s ./packages/worker/ ./@worker
fi

# create a storage link in the public server dir
cd __public__ || exit
if [ ! -h __storage__ ];
  then
    ln -s ../__storage__ .
fi

# create links in the server package
cd ..
cd ./packages/server || exit

# env file from the env pool
if [ ! -h .env ];
  then
    ln -s ../../../../@env-pool/fixpics/.env .
fi

if [ ! -h __config__ ];
  then
    ln -s ../../__config__/ .
fi

if [ ! -h __resources__ ];
  then
    ln -s ../../__resources__/ .
fi

if [ ! -h __storage__ ];
  then
    ln -s ../../__storage__/ .
fi

if [ ! -h @common ];
    then
      ln -s ../common ./@common
fi

# create links in the web package

cd ..
cd ./web || exit

if [ ! -h __config__ ];
  then
    ln -s ../../__config__/ .
fi

if [ ! -h __resources__ ];
  then
    ln -s ../../__resources__/ .
fi

if [ ! -h __storage__ ];
  then
    ln -s ../../__storage__/ .
fi

if [ ! -h @common ];
  then
    ln -s ../common ./@common
fi
# create links in the worker package
cd ..
cd ./worker || exit

# env file from the env pool
if [ ! -h .env ];
  then
    ln -s ../../../../@env-pool/fixpics/.env .
fi

if [ ! -h __config__ ];
  then
    ln -s ../../__config__/ .
fi

if [ ! -h __storage__ ];
  then
    ln -s ../../__storage__/ .
fi