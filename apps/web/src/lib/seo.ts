export function buildPageTitle(pageTitle: string, siteName = 'YouthConnect') {
  return `${pageTitle} | ${siteName}`;
}

export function buildMetadataDescription(description: string) {
  return description.length > 160 ? `${description.slice(0, 157)}...` : description;
}
