import { useSearchParams } from "react-router-dom";
import useMyListMovies from "./useMyListMovies.js";

const profileData = {
  email: "tirta4132@gmail.com",
  maxUploadSize: "Maksimal 2MB",
  name: "Tirta Samara",
  password: "***************",
  photoUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=ChillProfile",
};

function useProfilePage() {
  const [searchParams] = useSearchParams();
  const myList = useMyListMovies();
  const isSubscribed = searchParams.get("premium") === "true";

  return {
    ...myList,
    isSubscribed,
    myListMovies: myList.myListMovies.slice(0, 6),
    profile: profileData,
    subscription: isSubscribed
      ? {
          expiredAt: "31 Desember 2023",
          planName: "Akun Premium Individual",
        }
      : null,
  };
}

export default useProfilePage;
