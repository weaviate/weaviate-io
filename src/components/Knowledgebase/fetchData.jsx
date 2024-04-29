const fetchKnowledgeCards = async () => {
  try {
    const response = await fetch('http://localhost:8080/notion-data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map((card) => ({
      id: card.id,
      title: card.properties['Column 3'].rich_text[0]?.plain_text || 'No Title',
      text:
        card.properties['Column 5'].rich_text[0]?.plain_text ||
        'No Description',
      category:
        card.properties['Column 2'].rich_text[0]?.plain_text || 'Uncategorized',
      type: card.properties['Column 1'].rich_text[0]?.plain_text || 'General',
      photo: card.properties['Column 4'].rich_text[0]?.plain_text,
      tags: card.properties['Column 11'].rich_text[0]?.plain_text.split(', '),
      link: card.properties['Column 7'].rich_text[0]?.plain_text,
      doclink: card.properties['Column 9'].rich_text[0]?.plain_text,
      videolink: card.properties['Column 10'].rich_text[0]?.plain_text,
      bloglink: card.properties['Column 8'].rich_text[0]?.plain_text,
      longText: card.properties['Column 6'].rich_text[0]?.plain_text,

      // Add other necessary transformations based on your Notion setup
    }));
  } catch (error) {
    console.error('Failed to fetch cards:', error);
    return [];
  }
};

export default fetchKnowledgeCards;
