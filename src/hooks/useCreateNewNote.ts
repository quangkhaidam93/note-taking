import axios from "axios";
import { useState } from "react";
import { FetchedNote, Note } from "../types/note";

export function useCreateNewNote(url: string) {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Note>();
  const [error, setError] = useState<any>();

  const dispatchCreateNewNote = async (
    payload: Omit<Note, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);

      const response = await axios.post<FetchedNote>(url, payload);

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

  return { loading, data, error, dispatchCreate: dispatchCreateNewNote };
}
