# SYMLINKS SETUP

# create link to env pool
if [ ! -h .env ];
  then
    ln -s ../../@env-pool/fixpics/.env .
fi

# create a root links to the packages
if [ ! -h @server ];
  then
    ln -sf ./packages/server/ ./@server
fi

if [ ! -h @common ];
  then
    ln -sf ./packages/common/ ./@common
fi

if [ ! -h @web ];
  then
    ln -sf ./packages/web/ ./@web
fi

if [ ! -h @worker ];
  then
    ln -sf ./packages/worker/ ./@worker
fi

# create a storage link in the public server dir
cd __public__ || exit
if [ ! -h __storage__ ];
  then
    ln -sf ../__storage__ .
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
    ln -sf ../../__config__/ .
fi

if [ ! -h __resources__ ];
  then
    ln -sf ../../__resources__/ .
fi

if [ ! -h __storage__ ];
  then
    ln -sf ../../__storage__/ .
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
    ln -sf ../../__config__/ .
fi

if [ ! -h __resources__ ];
  then
    ln -sf ../../__resources__/ .
fi

if [ ! -h __storage__ ];
  then
    ln -sf ../../__storage__/ .
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
    ln -sf ../../__config__/ .
fi

if [ ! -h __storage__ ];
  then
    ln -sf ../../__storage__/ .
fi