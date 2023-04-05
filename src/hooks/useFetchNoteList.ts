import axios from "axios";
import { useEffect, useState } from "react";
import { FetchedNote, Note } from "../types/note";

export function useFetchNoteList(url: string) {
  const [data, setData] = useState<Note[]>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);

        const response = await axios.get<FetchedNote[]>(url);

        if (response.data && response.data.length > 0) {
          const fetchedNoteList: Note[] = response.data.map((note) => ({
            id: note._id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          }));
          setData(fetchedNoteList);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
}
