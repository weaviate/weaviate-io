const parseCode = (text) => {
  // if the code start $, then trim it out
  if (text.startsWith('$ '))
    return text.substring(2);

  return text;
}

const generateClipboardButtons = () => {
  // Grab all code elements
  let codeElements = document.querySelectorAll('pre code');

  codeElements.forEach((codeElement, index) => {
    const code = parseCode(codeElement.innerText);

    // Create a span that will act as a button for copy
    let span = document.createElement('span');
    span.classList.add('clip-btn');
    span.classList.add('material-icons');
    span.textContent = 'content_copy';
    span.title = 'Copy to clipboard';

    // Add a click event that performs copy to clipboard
    span.addEventListener('click', () => {
      window.navigator.clipboard.writeText(code);
    });

    codeElement.parentElement.appendChild(span);
  });
};

window.addEventListener('load', generateClipboardButtons);