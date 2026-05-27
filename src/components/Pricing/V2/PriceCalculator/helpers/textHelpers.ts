export const numToThousands = (text: string) => {
  const num = parseInt(text);
  if (isNaN(num)) return text;

  const thousands = Math.round(num / 1000);
  const formattedThousands =
    thousands >= 1000 ? thousands.toLocaleString() : thousands.toString();
  return `${formattedThousands}K`;
};

export const addCommas = (text: string) => {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addNumSize = (text: string) => {
  const num = parseInt(text);
  if (isNaN(num)) return text;

  if (num >= 1000000) {
    const mb = num / 1000000;
    return `${mb} MB`;
  }

  if (num >= 1024) {
    const kb = num / 1024;
    return `${kb} KB`;
  }

  return `${num} Bytes`;
};
