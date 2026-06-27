import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addMyList,
  getMyList,
  removeMyList,
} from "../../services/accountApi.js";
import {
  myListUpdatedEventName,
  notifyMyListUpdated,
} from "../../utils/myListEvents.js";

function getSeriesFilmId(item) {
  return item?.seriesFilmId ?? item?.series_film_id ?? item?.seriesFilm?.id;
}

function createMyListIdSet(items) {
  return new Set(
    (Array.isArray(items) ? items : [])
      .map(getSeriesFilmId)
      .filter(Boolean)
      .map(String),
  );
}

let cachedMyListIds = null;
let pendingMyListRequest = null;

function fetchMyListIds() {
  if (cachedMyListIds) {
    return Promise.resolve(cachedMyListIds);
  }

  if (pendingMyListRequest) {
    return pendingMyListRequest;
  }

  pendingMyListRequest = getMyList()
    .then((items) => {
      cachedMyListIds = createMyListIdSet(items);

      return cachedMyListIds;
    })
    .finally(() => {
      pendingMyListRequest = null;
    });

  return pendingMyListRequest;
}

function updateCachedMyListIds(updater) {
  const currentIds = new Set(cachedMyListIds ?? []);
  const nextIds = updater(currentIds);

  cachedMyListIds = new Set(nextIds);

  return cachedMyListIds;
}

function useMyListToggle(seriesFilmId) {
  const normalizedId = seriesFilmId ? String(seriesFilmId) : "";
  const [myListIds, setMyListIds] = useState(
    () => new Set(cachedMyListIds ?? []),
  );
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const isInMyList = useMemo(
    () => Boolean(normalizedId && myListIds.has(normalizedId)),
    [myListIds, normalizedId],
  );

  const loadMyListIds = useCallback(() => {
    if (!normalizedId) {
      return undefined;
    }

    let isActive = true;

    fetchMyListIds()
      .then((ids) => {
        if (!isActive) {
          return;
        }

        setMyListIds(new Set(ids));
        setStatus("succeeded");
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        setError(requestError.message || "Gagal mengambil daftar saya");
        setStatus("failed");
      });

    return () => {
      isActive = false;
    };
  }, [normalizedId]);

  useEffect(() => {
    const cleanupRequest = loadMyListIds();
    const handleMyListUpdated = () => {
      setError("");

      if (cachedMyListIds) {
        setMyListIds(new Set(cachedMyListIds));
        setStatus("succeeded");
        return;
      }

      setStatus("loading");
      loadMyListIds();
    };

    window.addEventListener(myListUpdatedEventName, handleMyListUpdated);

    return () => {
      cleanupRequest?.();
      window.removeEventListener(myListUpdatedEventName, handleMyListUpdated);
    };
  }, [loadMyListIds]);

  const toggleMyList = useCallback(async () => {
    if (!normalizedId || status === "saving") {
      return;
    }

    setStatus("saving");
    setError("");

    try {
      if (isInMyList) {
        await removeMyList(normalizedId);
        const nextIds = updateCachedMyListIds((currentIds) => {
          currentIds.delete(normalizedId);

          return currentIds;
        });
        setMyListIds(new Set(nextIds));
      } else {
        await addMyList(normalizedId);
        const nextIds = updateCachedMyListIds((currentIds) => {
          currentIds.add(normalizedId);

          return currentIds;
        });
        setMyListIds(new Set(nextIds));
      }

      setStatus("succeeded");
      notifyMyListUpdated();
    } catch (requestError) {
      setError(requestError.message || "Gagal memperbarui daftar saya");
      setStatus("failed");
    }
  }, [isInMyList, normalizedId, status]);

  return {
    error,
    isInMyList,
    isSaving: status === "saving",
    status,
    toggleMyList,
  };
}

export default useMyListToggle;
