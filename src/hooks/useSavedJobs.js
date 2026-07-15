import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "talenthub_saved_jobs";

function getInitialSavedJobs() {
  try {
    const storedJobs = localStorage.getItem(STORAGE_KEY);

    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs);

      return Array.isArray(parsedJobs) ? parsedJobs : [];
    }

    const demoJobs = [1, 2, 5];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoJobs));

    return demoJobs;
  } catch (error) {
    console.error("No fue posible recuperar los empleos guardados:", error);
    return [];
  }
}

function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useState(getInitialSavedJobs);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(savedJobIds),
    );
  }, [savedJobIds]);

  const isSaved = useCallback(
    (jobId) => savedJobIds.includes(Number(jobId)),
    [savedJobIds],
  );

  const saveJob = useCallback((jobId) => {
    const numericId = Number(jobId);

    setSavedJobIds((currentIds) =>
      currentIds.includes(numericId)
        ? currentIds
        : [...currentIds, numericId],
    );
  }, []);

  const removeJob = useCallback((jobId) => {
    const numericId = Number(jobId);

    setSavedJobIds((currentIds) =>
      currentIds.filter((id) => id !== numericId),
    );
  }, []);

  const toggleJob = useCallback((jobId) => {
    const numericId = Number(jobId);

    setSavedJobIds((currentIds) =>
      currentIds.includes(numericId)
        ? currentIds.filter((id) => id !== numericId)
        : [...currentIds, numericId],
    );
  }, []);

  const clearSavedJobs = useCallback(() => {
    setSavedJobIds([]);
  }, []);

  return {
    savedJobIds,
    savedCount: savedJobIds.length,
    isSaved,
    saveJob,
    removeJob,
    toggleJob,
    clearSavedJobs,
  };
}

export default useSavedJobs;