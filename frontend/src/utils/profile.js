import { apiBaseUrl } from "../services/apiClient.js";

const fallbackProfileSeed = "ChillProfile";

function getFallbackProfilePhotoUrl(name = fallbackProfileSeed) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    name || fallbackProfileSeed,
  )}`;
}

function resolveApiAssetUrl(assetUrl) {
  if (!assetUrl) {
    return "";
  }

  if (/^(blob:|data:|https?:\/\/)/i.test(assetUrl)) {
    return assetUrl;
  }

  try {
    const apiUrl = new URL(apiBaseUrl);

    return new URL(assetUrl, apiUrl.origin).toString();
  } catch {
    return assetUrl;
  }
}

function getProfilePhotoUrl(user, previewUrl = "") {
  const name = user?.name || fallbackProfileSeed;
  const photoUrl = user?.photoUrl ?? user?.photo_url;

  return (
    resolveApiAssetUrl(previewUrl) ||
    resolveApiAssetUrl(photoUrl) ||
    getFallbackProfilePhotoUrl(name)
  );
}

export { getFallbackProfilePhotoUrl, getProfilePhotoUrl, resolveApiAssetUrl };
