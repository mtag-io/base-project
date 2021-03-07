FROM kuralabs/python3-dev:latest

ARG WORKER_ENV=DEVELOPMENT
ENV WORKER_ENV="${WORKER_ENV}"

WORKDIR .
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENTRYPOINT ["python3", "/home/python3/run.py"]