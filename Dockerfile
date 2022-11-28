FROM ruby:2.7
WORKDIR /weaviate-io
ADD Gemfile Gemfile.lock run.sh setup.sh ./
RUN bash setup.sh
RUN apt-get update &&\
    apt-get install python3-pip -y &&\
    pip3 install requests pyyaml
ADD . ./
RUN python3 _python/create-roadmap.py

CMD bundle exec jekyll s --watch --livereload --incremental --host=0.0.0.0 --baseurl="" --config "_config.yml,_config_dev.yml" --open-url http://0.0.0.0:4000/

