import React from 'react';

export default function Badges() {

    return (
      <span>
        <p align="center">
            <a href="https://github.com/semi-technologies/weaviate">
                <img src="https://img.shields.io/github/license/semi-technologies/weaviate?style=flat-square" alt="LICENSE"/></a>
                &nbsp;
            <a href="https://stackoverflow.com/tags/weaviate/">
                <img src="https://img.shields.io/badge/stackoverflow-%23weaviate-informational?style=flat-square" alt="Weaviate on Stackoverflow badge"/></a>
                &nbsp;
            <a href="https://github.com/semi-technologies/weaviate/issues">
                <img src="https://img.shields.io/badge/github-issues-informational?style=flat-square" alt="Weaviate issues on Github badge"/></a>
                &nbsp;
            {/* TODO - re-introduce below badges once site variables added */}
            <a href="https://github.com/semi-technologies/weaviate/">
                <img src="https://img.shields.io/github/v/release/semi-technologies/weaviate?style=flat-square" alt="Weaviate version badge"/>
            </a>
            {/* <a href="https://app.swaggerhub.com/apis/semi-technologies/weaviate/{{ site.weaviate_version }}">
                <img src="https://img.shields.io/badge/open--api--specs-{{ site.weaviate_version }}-brightgreen?style=flat-square" alt="Weaviate {{ site.weaviate_version }} version badge"/>
            </a>                 */}
            <br/>                            

            {/* Set total pulls to Weaviate + modules as Bob suggested */}
            <img id="totalpulls" src="https://img.shields.io/badge/downloads-loading...-yellow?style=flat-square" alt="Weaviate total Docker pulls badge"></img>
                &nbsp;
            <a href="https://goreportcard.com/report/github.com/semi-technologies/weaviate">
                <img src="https://goreportcard.com/badge/github.com/semi-technologies/weaviate?style=flat-square" alt="Go Report Card"/></a>
                &nbsp;
            <a href="https://weaviate.slack.com/">
                <img src="https://img.shields.io/badge/Slack-@weaviate.svg?logo=slack&style=flat-square" alt="Join Slack"/></a>
                &nbsp;
            <a href="https://twitter.com/intent/follow?screen_name=weaviate_io">
                <img src="https://img.shields.io/twitter/follow/weaviate_io?logo=twitter&style=flat-square" alt="Twitter Follow"/></a>
        </p>
      </span>
    );
  }
