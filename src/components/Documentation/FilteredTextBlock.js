import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const FilteredTextBlock = ({ text, startMarker, endMarker, language, includeStartMarker='false' }) => {
  // Filter out lines that are before the start marker, and lines with or after the end marker
  includeStartMarker = includeStartMarker == 'true';
  const lines = text.split('\n');
  const universalStartMarker = 'START-ANY';
  const universalEndMarker = 'END-ANY';
  let withinMarkers = false;
  let format;
  switch (language) {
    case "java":
      // remove leading indent of 4 spaces
      format = input => input.replace(/^    /, '');
      break
    case "go":
      const spacesPerTab = 2;
      const spaces = ' '.repeat(spacesPerTab);

      format = input => input
      // Replace newline + n tabs with n spaces
      .replace(/\n[\t]+/g, match =>
        match.replace(/\t/g, spaces)
      )
      // Replace any remaining tabs with n spaces
      .replace(/\t/g, spaces)
      break;
    default:
      format = input => input;
  }

  const filteredLines = lines
    .filter((line) => {
      if (line.includes(startMarker) || (line.includes(universalStartMarker))) {
        withinMarkers = true;
        return includeStartMarker;
      }

      if (line.includes(endMarker) || (line.includes(universalEndMarker))) {
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
