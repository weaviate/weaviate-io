import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const FilteredTextBlock = ({ text, startMarker, endMarker, language, includeStartMarker='false' }) => {
  // Filter out lines that are before the start marker, and lines with or after the end marker
  includeStartMarker = includeStartMarker == 'true';
  const lines = text.split('\n');
  let withinMarkers = false;
  let replace;
  switch (language) {
    case "java":
      // remove leading indent of 4 spaces
      replace = input => input.replace(/^    /, '');
      break
    case "go":
      // remove leading indent of 4 or 2 spaces
      replace = input => {
        if (input.match(/^    /)) {
          return input.replace(/^    /, '');
        }
        return input.replace(/^  /, '');
      }
      break;
    default:
      replace = input => input;
  }

  const filteredLines = lines
    .filter((line) => {
      if (line.includes(startMarker)) {
        withinMarkers = true;
        return includeStartMarker;
      }

      if (line.includes(endMarker)) {
        withinMarkers = false;
        return false;
      }

      return withinMarkers;
    })
    .map(replace)
    .join('\n');

  return (
    <CodeBlock className={`language-${language}`}>
      {filteredLines}
    </CodeBlock>
  );
};

export default FilteredTextBlock;
