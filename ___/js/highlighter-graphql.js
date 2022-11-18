/**
 * Highlight.js GraphQL syntax highlighting definition
 *
 * @see https://github.com/isagalaev/highlight.js
 *
 * @package: highlightjs-graphql
 * @author:  David Peek <mail@dpeek.com>
 */

 function hljsDefineGraphQL(hljs) {
    return {
      aliases: ["gql"],
      keywords: {
        keyword:
          "query mutation subscription|10 input schema implements type interface union scalar fragment|10 enum on ...",
        literal: "ID ID! String Float Int Boolean",
        variable: "true false null"
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.NUMBER_MODE,
        {
          className: "keyword",
          begin: "[^\\w][A-Z][a-z]",
          end: "\\W",
          excludeEnd: true
        },
        {
          className: "keyword",
          begin: ":\\s\\[",
          end: "[\\]!]{1,3}",
          excludeBegin: true,
          excludeEnd: true
        },
        {
          className: "type",
          begin: "[^\\w](?!ID)[A-Z][A-Z]",
          end: "\\W",
          excludeEnd: true
        },
        {
          className: "name",
          begin: "\\$",
          end: "\\W",
          excludeEnd: true
        },
        {
          className: "meta",
          begin: "@",
          end: "\\W",
          excludeEnd: true
        }
      ],
      illegal: /([;<']|BEGIN)/
    };
}