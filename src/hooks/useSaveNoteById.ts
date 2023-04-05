import { useState } from "react";
import { FetchedNote, Note } from "../types/note";
import axios from "axios";

export function useSaveNoteById(url: string) {
  const [data, setData] = useState<Note>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<any>();

  const dispatchSaveNote = async (
    id: string,
    payload: { content: string; title: string }
  ) => {
    try {
      setLoading(true);

      const response = await axios.patch<FetchedNote>(`${url}/${id}`, payload);

      if (response.data) {
        const { _id, content, title, createdAt, updatedAt } = response.data;

        const updatedNote: Note = {
          id: _id,
          title: title,
          content: content,
          createdAt: createdAt,
          updatedAt: updatedAt,
        };

        setData(updatedNote);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, dispatchSaveNote };
}
