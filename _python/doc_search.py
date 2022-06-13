import os
import markdown
import re
from bs4 import BeautifulSoup


rootdir = '../developers/weaviate/current'


def file_to_string(filename):
    text_file = open(filename)
    data = text_file.read()
    text_file.close()
    return data.split("\n---\n")[1]


def create_markdown(filename):
    file_content = file_to_string(filename)
    html_raw = markdown.markdown(file_content)
    html = BeautifulSoup(html_raw, "lxml")
    return html


def find_between(s, first, last):
    try:
        start = s.index( first ) + len( first )
        end = s.index( last, start )
        return s[start:end]
    except ValueError:
        return ""


def paragraph_to_text(html):
    soup = BeautifulSoup(html, "lxml")
    return soup.text


def create_paragraphs_for_page(filename, html):
    obj = { 'filename': filename, 'paragraphs': [] }
    paragraphs = html.find_all(re.compile('^h[1-6]$'))
    paragraphs.append('<h1>END---END</h1>')
    c = 0
    for _ in paragraphs:
        if c < len(paragraphs) - 1:
            paragraph = find_between(str(html), str(paragraphs[c]), str(paragraphs[c+1]))
            obj['paragraphs'].append({
                'sub_title': str(paragraphs[c].text),
                'content': paragraph_to_text(paragraph).strip()
            })
            c += 1
    return obj


    # print(paragraphs[0], paragraphs[1])

    # print(find_between(str(html), str(paragraphs[0]), str(paragraphs[1])))

    exit(0)

for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        filename, file_extension = os.path.splitext(file)
        #print(os.path.join(subdir, file))
        if file_extension == '.md':
            html = create_markdown(subdir + '/' + file)
            paragraphs_array = create_paragraphs_for_page(subdir + '/' + file, html)
            print(paragraphs_array)