import { useEffect, useMemo, useState } from "react";
import {
  getCurrentSubscription,
  getProfile,
  updateProfile,
  uploadProfilePhoto,
} from "../../services/accountApi.js";
import { getProfilePhotoUrl } from "../../utils/profile.js";
import { isSubscriptionActive } from "../../utils/subscription.js";
import { useAuthSession } from "./useAuthSession.js";
import useMyListMovies from "./useMyListMovies.js";

const passwordMask = "***************";
const maxProfilePhotoSize = 2 * 1024 * 1024;

function formatExpiredAt(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildProfile(user, photoPreviewUrl = "") {
  const name = user?.name || "Pengguna Chill";

  return {
    email: user?.email || "-",
    maxUploadSize: "Maksimal 2MB",
    name,
    password: passwordMask,
    photoUrl: getProfilePhotoUrl(user, photoPreviewUrl),
  };
}

function useProfilePage() {
  const { refreshSession, user } = useAuthSession();
  const myList = useMyListMovies(6);
  const [profileUser, setProfileUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [profileStatus, setProfileStatus] = useState("loading");
  const [profileError, setProfileError] = useState("");
  const [profileForm, setProfileForm] = useState({
    name: "",
    password: "",
    photo: null,
  });
  const [profilePhotoPreviewUrl, setProfilePhotoPreviewUrl] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    let isActive = true;

    Promise.allSettled([getProfile(), getCurrentSubscription()]).then(
      ([profileResult, subscriptionResult]) => {
        if (!isActive) {
          return;
        }

        if (profileResult.status === "fulfilled") {
          setProfileUser(profileResult.value);
          setProfileForm({
            name: profileResult.value?.name ?? "",
            password: "",
            photo: null,
          });
        } else {
          setProfileError(
            profileResult.reason?.message || "Gagal mengambil profil",
          );
        }

        if (subscriptionResult.status === "fulfilled") {
          setSubscription(subscriptionResult.value);
        }

        setProfileStatus("succeeded");
      },
    );

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(
    () => () => {
      if (profilePhotoPreviewUrl) {
        URL.revokeObjectURL(profilePhotoPreviewUrl);
      }
    },
    [profilePhotoPreviewUrl],
  );

  const profile = useMemo(
    () => buildProfile(profileUser ?? user, profilePhotoPreviewUrl),
    [profilePhotoPreviewUrl, profileUser, user],
  );
  const activeSubscription = [subscription, profileUser?.subscriptions?.[0]].find(
    isSubscriptionActive,
  );
  const subscriptionData = activeSubscription
    ? {
        expiredAt: formatExpiredAt(
          activeSubscription.endedAt ?? activeSubscription.ended_at,
        ),
        planName: `Akun Premium ${
          activeSubscription.package?.name ?? "Individual"
        }`,
      }
    : null;

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileError("");
    setProfileMessage("");

    if (!file.type.startsWith("image/")) {
      setProfileError("File harus berupa gambar");
      event.target.value = "";
      return;
    }

    if (file.size > maxProfilePhotoSize) {
      setProfileError("Ukuran foto maksimal 2MB");
      event.target.value = "";
      return;
    }

    setProfileForm((currentForm) => ({
      ...currentForm,
      photo: file,
    }));

    setProfilePhotoPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      return URL.createObjectURL(file);
    });

    event.target.value = "";
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setIsSavingProfile(true);

    try {
      const payload = {
        name: profileForm.name.trim(),
        ...(profileForm.password.trim()
          ? { password: profileForm.password.trim() }
          : {}),
      };
      let updatedUser = await updateProfile(payload);

      if (profileForm.photo) {
        updatedUser = await uploadProfilePhoto(profileForm.photo);
      }

      setProfileUser(updatedUser);
      setProfilePhotoPreviewUrl((currentUrl) => {
        if (currentUrl) {
          URL.revokeObjectURL(currentUrl);
        }

        return "";
      });
      setProfileForm({
        name: updatedUser?.name ?? "",
        password: "",
        photo: null,
      });
      await refreshSession();
      setProfileMessage("Profil berhasil disimpan");
    } catch (error) {
      setProfileError(error.message || "Gagal menyimpan profil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  return {
    ...myList,
    isLoading: myList.isLoading || profileStatus === "loading",
    isSavingProfile,
    isSubscribed: Boolean(subscriptionData),
    moviesError: myList.moviesError,
    myListMovies: myList.myListMovies,
    onProfileChange: handleProfileChange,
    onProfilePhotoChange: handleProfilePhotoChange,
    onProfileSubmit: handleProfileSubmit,
    profile,
    profileError,
    profileForm,
    profileMessage,
    subscription: subscriptionData,
  };
}

export default useProfilePage;
