import { useState } from "react";
import { FetchedNote, Note } from "../types/note";
import axios from "axios";

export function useFetchNoteById(url: string) {
  const [data, setData] = useState<Note>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<any>();

  const dispatchFetchNoteBydId = async (id: string) => {
    try {
      setLoading(true);

      const response = await axios.get<FetchedNote>(`${url}/${id}`);

      if (response.data) {
        const { _id, content, title, createdAt, updatedAt } = response.data;

        const newNote: Note = {
          id: _id,
          title: title,
          content: content,
          createdAt: createdAt,
          updatedAt: updatedAt,
        };

        setData(newNote);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, dispatchFetchNoteBydId };
}
