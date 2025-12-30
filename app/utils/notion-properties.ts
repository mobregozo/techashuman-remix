/**
 * Safe property accessors for Notion database properties
 * Handles deep nested property access with error handling
 */

export function getStringProperty(
  properties: any,
  propertyName: string
): string | null {
  try {
    const prop = properties[propertyName];
    if (!prop) return null;

    if (prop.rich_text && Array.isArray(prop.rich_text)) {
      return prop.rich_text[0]?.plain_text ?? null;
    }

    if (prop.title && Array.isArray(prop.title)) {
      return prop.title[0]?.plain_text ?? null;
    }

    return null;
  } catch {
    return null;
  }
}

export function getNumberProperty(
  properties: any,
  propertyName: string
): number | null {
  try {
    const prop = properties[propertyName];
    if (!prop) return null;

    if (prop.number !== undefined) {
      return prop.number;
    }

    if (prop.formula?.number !== undefined) {
      return prop.formula.number;
    }

    return null;
  } catch {
    return null;
  }
}

export function getDateProperty(
  properties: any,
  propertyName: string
): string | null {
  try {
    const prop = properties[propertyName];
    if (!prop?.date?.start) return null;
    return prop.date.start;
  } catch {
    return null;
  }
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(dateString));
}
