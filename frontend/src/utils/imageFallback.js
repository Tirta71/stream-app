export const fallbackMediaImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='960' viewBox='0 0 640 960'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23202427'/%3E%3Cstop offset='1' stop-color='%23181a1c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='960' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23c1c2c4' font-family='Arial,sans-serif' font-size='64' font-weight='700'%3ECHILL%3C/text%3E%3C/svg%3E";

export function replaceBrokenImage(event, alternateImage) {
  const image = event.currentTarget;
  const alternateImageUrl =
    typeof alternateImage === "string" ? alternateImage.trim() : "";

  if (alternateImageUrl && image.src !== alternateImageUrl) {
    image.src = alternateImageUrl;
    return;
  }

  if (image.src !== fallbackMediaImage) {
    image.src = fallbackMediaImage;
  }
}
