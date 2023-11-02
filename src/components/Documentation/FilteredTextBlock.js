import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const FilteredTextBlock = ({ text, startMarker, endMarker, language, includeStartMarker='false' }) => {
  // Filter out lines that are before the start marker, and lines with or after the end marker
  includeStartMarker = includeStartMarker == 'true';
  const lines = text.split('\n');
  let withinMarkers = false;
  let format;
  switch (language) {
    case "java":
      // remove leading indent of 4 spaces
      format = input => input.replace(/^    /, '');
      break
    case "go":
      format = input => input
        // remove leading indent of 2 or 1 tabs
        .replace(input.match(/^\t\t/) ? /^\t\t/ : /^\t/, '')
        // replace remaining tabs with 2 spaces
        .replace(/\t/, "  ")
      break;
    default:
      format = input => input;
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
    .map(format)
    .join('\n');

  return (
    <CodeBlock className={`language-${language}`}>
      {filteredLines}
    </CodeBlock>
  );
};

export default FilteredTextBlock;
