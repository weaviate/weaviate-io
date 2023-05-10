import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const FilteredTextBlock = ({ text, startMarker, endMarker, language }) => {
  // Filter out lines that are before the start marker, and lines with or after the end marker
  const lines = text.split('\n');
  let withinMarkers = false;
  const filteredLines = lines
    .filter((line) => {
      if (line.includes(startMarker)) {
        withinMarkers = true;
        return false;
      }

      if (line.includes(endMarker)) {
        withinMarkers = false;
        return false;
      }

      return withinMarkers;
    })
    .join('\n');

  return (
    <CodeBlock className={`language-${language}`}>
      {filteredLines}
    </CodeBlock>
  );
};

export default FilteredTextBlock;
