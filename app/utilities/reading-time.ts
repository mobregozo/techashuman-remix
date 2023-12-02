const AVG_READING_SPEED = 225;

export const readingTime = (text: string) => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / AVG_READING_SPEED);
};
