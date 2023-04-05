import axios from "axios";
import { useState } from "react";

export function useDeleteNoteById(url: string) {
  const [loading, setLoading] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>();

  const dispatchDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${url}/${id}`);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { success, loading, dispatchDelete };
}
