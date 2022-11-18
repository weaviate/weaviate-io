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

    // Create a button with a span for the copy icon
    let btn = document.createElement('button');
    btn.classList.add('clip-btn');
    btn.title = 'Copy to clipboard';
    // Add a copy icon inside
    btn.innerHTML += '<i class="fa-regular fa-copy"></i>';

    // Add a click event that performs copy to clipboard
    btn.addEventListener('click', () => {
      window.navigator.clipboard.writeText(code);
    });

    codeElement.parentElement.appendChild(btn);
  });
};

window.addEventListener('load', generateClipboardButtons);
