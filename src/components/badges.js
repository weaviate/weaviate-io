import React from 'react';

export default function Badges() {
    return (
      <span>
        <p align="center">
            <a href="https://hub.docker.com/r/semitechnologies/weaviate" alt="Docker pulls">
                <img src="https://img.shields.io/docker/pulls/semitechnologies/weaviate.svg?style=flat-square&logo=docker" /></a>
                &nbsp;
            <a href="https://github.com/semi-technologies/weaviate" alt="LICENSE">
                <img src="https://img.shields.io/github/license/semi-technologies/weaviate?style=flat-square" /></a>
                &nbsp;
            <a href="https://goreportcard.com/report/github.com/semi-technologies/weaviate" alt="Go Report Card">
                <img src="https://goreportcard.com/badge/github.com/semi-technologies/weaviate?style=flat-square" /></a>
                &nbsp;
            {/* <a href="https://github.com/semi-technologies/weaviate/actions" alt="Build Status">
                <img src="https://img.shields.io/travis/com/semi-technologies/weaviate/master?logo=travis&style=flat-square" /></a>
                &nbsp; */}
            <a href="https://weaviate.slack.com/" alt="Join Slack">
                <img src="https://img.shields.io/badge/Slack-@weaviate.svg?logo=slack&style=flat-square" /></a>
                &nbsp;
            <a href="https://twitter.com/intent/follow?screen_name=weaviate_io" alt="Twitter Follow">
                <img src="https://img.shields.io/twitter/follow/weaviate_io?logo=twitter&style=flat-square" /></a>
        </p>
      </span>
    );
  }