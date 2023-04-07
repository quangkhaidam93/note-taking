import { useCallback, useEffect, useRef, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import { Note } from "../../types/note";
import MenuBar from "./components/menu_bar";
import NoteContent from "./components/note_content";
import SideBar from "./components/side_bar/side_bar";
import { Container, NoteSection } from "./styles";
import { useFetchNoteList } from "../../hooks/useFetchNoteList";
import { useCreateNewNote } from "../../hooks/useCreateNewNote";
import { useDeleteNoteById } from "../../hooks/useDeleteNoteById";
import { useSaveNoteById } from "../../hooks/useSaveNoteById";
import debounce from "lodash.debounce";
import { useFetchNoteById } from "../../hooks/useFetchNoteById";

const API_URL = "http://localhost:3000/api/notes";

const HomeScreen = () => {
  const {
    data: fetchedNoteList,
    error: fetchNoteListError,
    loading: fetchNoteListLoading,
  } = useFetchNoteList(API_URL);
  const { data: newNote, dispatchCreate } = useCreateNewNote(API_URL);
  const { dispatchSaveNote } = useSaveNoteById(API_URL);
  const { dispatchDelete } = useDeleteNoteById(API_URL);
  const { dispatchFetchNoteBydId, data: fetchedNote } =
    useFetchNoteById(API_URL);
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>();
  const [topNoteInSidebar, setTopNoteInSideBar] = useState<Note>();
  const noteContentRef = useRef<HTMLTextAreaElement>(null);
  const prevNoteList = usePrevious<Note[] | undefined>(noteList);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (noteList && prevNoteList && noteList?.length > prevNoteList?.length) {
      focusNoteContent();
    }
  }, [noteList]);

  useEffect(() => {
    if (fetchNoteListError) {
      alert("Fetch notes failed");
    }

    if (fetchedNoteList && fetchedNoteList.length > 0) {
      setTopNoteInSideBar(fetchedNoteList[0]);
      setCurrentNote(fetchedNoteList[0]);
      fetchedNoteList.shift();

      setNoteList(fetchedNoteList);
    }
  }, [fetchedNoteList, fetchNoteListError]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (currentNote) {
      intervalRef.current = setInterval(() => {
        dispatchFetchNoteBydId(currentNote.id);
      }, 1000);
    }
  }, [currentNote?.id]);

  useEffect(() => {
    if (fetchedNote && fetchedNote.id === currentNote?.id) {
      setCurrentNote(fetchedNote);
    }
  }, [fetchedNote]);

  const focusNoteContent = () => {
    noteContentRef.current?.focus();
    if (currentNote) {
      const end = currentNote?.content.length;
      noteContentRef.current?.setSelectionRange(end, end);
    }
  };

  const createNewNote = () => {
    dispatchCreate({ content: "", title: "" });
  };

  const deleteNote = (id: string) => {
    dispatchDelete(id);

    let newNoteList = [...noteList];

    if (topNoteInSidebar && topNoteInSidebar.id === id) {
      setTopNoteInSideBar(newNoteList[0]);
      setCurrentNote(newNoteList[0]);
      newNoteList.splice(0, 1);
    } else {
      const removedIndex = noteList.findIndex((note) => note.id === id);
      newNoteList.splice(removedIndex, 1);
      setCurrentNote(topNoteInSidebar);
    }

    setNoteList(newNoteList);
  };

  useEffect(() => {
    if (newNote) {
      if (noteList.length === 0 && !topNoteInSidebar) {
        setCurrentNote(newNote);
        setTopNoteInSideBar(newNote);
        return;
      }

      const newNoteList = [topNoteInSidebar, ...noteList];

      setNoteList(newNoteList as Note[]);
      setCurrentNote(newNote);
      setTopNoteInSideBar(newNote);
    }
  }, [newNote]);

  const selectNote = (selectedNote: Note) => {
    if (currentNote && currentNote.content.length === 0) {
      deleteNote(currentNote.id);

      setTopNoteInSideBar(selectedNote);
    }
    setCurrentNote(selectedNote);
    dispatchFetchNoteBydId(selectedNote.id);
  };

  const debounceSaveNote = useCallback(
    debounce((payload: { id: string; content: string; title: string }) => {
      dispatchSaveNote(payload.id, {
        content: payload.content,
        title: payload.title,
      });

      intervalRef.current = setInterval(() => {
        dispatchFetchNoteBydId(payload.id);
      }, 1000);
    }, 1000),
    []
  );

  const editContentOfCurrentNote = (newContent: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (currentNote!.id !== topNoteInSidebar!.id) {
      let newNoteList = [...noteList] as Note[];

      const removeIndex = noteList.findIndex(
        (note) => note.id === currentNote!.id
      );

      newNoteList.splice(removeIndex, 1);
      newNoteList = [topNoteInSidebar!, ...newNoteList];

      setNoteList(newNoteList);
    }

    const firstLine = newContent.split("\n")[0];

    const newNote = { ...currentNote } as Note;

    newNote.content = newContent;
    newNote.title = firstLine;

    setCurrentNote(newNote);
    setTopNoteInSideBar(newNote);
    debounceSaveNote({
      id: newNote.id,
      content: newNote.content,
      title: newNote.title,
    });
  };

  return (
    <Container>
      {fetchNoteListLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MenuBar
            disabledNewNote={currentNote?.content.length === 0}
            createNewNote={createNewNote}
            deleteNote={
              currentNote ? () => deleteNote(currentNote.id) : () => {}
            }
          />
          <NoteSection>
            <SideBar
              currentNoteId={currentNote?.id}
              notes={noteList}
              selectNote={selectNote}
              createNewNote={createNewNote}
              topNode={topNoteInSidebar}
            />
            <NoteContent
              ref={noteContentRef}
              note={currentNote}
              editContent={editContentOfCurrentNote}
            />
          </NoteSection>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
