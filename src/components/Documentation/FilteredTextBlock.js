import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const FilteredTextBlock = ({ text, startMarker, endMarker }) => {
  const lines = text.split('\n');
  let withinMarkers = false;
  const filteredLines = lines
    .filter((line) => {
      if (line.includes(startMarker)) {
        withinMarkers = true;
        return true;
      }

      if (line.includes(endMarker)) {
        withinMarkers = false;
        return false;
      }

      return withinMarkers;
    })
    .join('\n');

  return (
    <CodeBlock className="language-py">
      {filteredLines}
    </CodeBlock>
  );
};

export default FilteredTextBlock;
