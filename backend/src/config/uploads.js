import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const backendRootDir = path.resolve(currentDir, "../..");
const uploadRoot = path.join(backendRootDir, "uploads");
const profileUploadDir = path.join(uploadRoot, "profiles");

const ensureProfileUploadDir = () => {
  mkdirSync(profileUploadDir, { recursive: true });
};

const getProfilePhotoPath = (filename) => `/uploads/profiles/${filename}`;

export { ensureProfileUploadDir, getProfilePhotoPath, profileUploadDir, uploadRoot };
