const URL = "http://127.0.0.1:5000";

export async function getEntriesByCollectionIds(ids) {
  try {
    const promises = ids.map((id) =>
      fetch(`${URL}/collections/${id}/contents`).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum: ${response.status} id: ${id}`);
        }
        return response.json();
      })
    );
    const results = await Promise.all(promises);
    console.log("Tüm öğeler başarıyla çekildi:", results);
    return results;
  } catch (error) {
    console.error("Öğeleri çekerken bir hata oluştu:", error);
    throw error;
  }
}

export async function getEntriesByCollectionId(collectionId) {
  try {
    const res = await fetch(`${URL}/collections/${collectionId}/contents`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Öğeleri çekerken bir hata oluştu:", error);
    throw error;
  }
}

export async function getEntryById(entryId) {
  try {
    const res = await fetch(`${URL}/entries/${entryId}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Öğeleri çekerken bir hata oluştu:", error);
    throw error;
  }
}

export async function createEntry(
  userId,
  title,
  content,
  coverImg = "",
  moodId,
  entryMoodScore,
  collectionId
) {
  try {
    const res = await fetch(`${URL}/entries/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        title: title,
        content: content,
        cover_image: coverImg,
        mood_id: moodId,
        entry_mood_score: entryMoodScore,
        collection_id: collectionId,
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Öğeleri çekerken bir hata oluştu:", error);
    throw error;
  }
}

export async function updateEntry(
  entryId,
  userId,
  title,
  content,
  coverImg = "",
  moodId,
  entryMoodScore,
  collectionId
) {
  try {
    const res = await fetch(`${URL}/entries/${entryId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        title: title,
        content: content,
        cover_image: coverImg,
        mood_id: moodId,
        entry_mood_score: entryMoodScore,
        collection_id: collectionId,
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Öğeleri çekerken bir hata oluştu:", error);
    throw error;
  }
}
