import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import { Note } from "../../types/note";
import MenuBar from "./components/menu_bar";
import NoteContent from "./components/note_content";
import SideBar from "./components/side_bar/side_bar";
import { Container, NoteSection } from "./styles";

const dummyNotes: Note[] = [
  {
    id: "1",
    content: "note 1",
    title: "note 1",
    updatedAt: "",
    createdAt: "",
  },
  {
    id: "2",
    content: "note 2",
    title: "note 2",
    updatedAt: "",
    createdAt: "",
  },
  {
    id: "3",
    content: "note 3",
    title: "note 3",
    updatedAt: "",
    createdAt: "",
  },
];

const HomeScreen = () => {
  const [noteList, setNoteList] = useState<Note[]>([...dummyNotes]);
  const [currentNote, setCurrentNote] = useState<Note>();
  const [topNoteInSidebar, setTopNoteInSideBar] = useState<Note>();
  const noteContentRef = useRef<HTMLTextAreaElement>(null);
  const prevNoteList = usePrevious<Note[]>(noteList);

  useEffect(() => {
    setTopNoteInSideBar(noteList[0]);
    setCurrentNote(noteList[0]);
    const newNoteList = [...noteList];
    newNoteList.shift();
    setNoteList(newNoteList);
  }, []);

  useEffect(() => {
    if (noteList && noteList?.length > prevNoteList?.length) {
      focusNoteContent();
    }
  }, [noteList]);

  const focusNoteContent = () => {
    noteContentRef.current?.focus();
  };

  const createNewNote = () => {
    const newNote: Note = {
      id: "abc",
      content: "",
      title: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newNoteList = [topNoteInSidebar, ...noteList];

    setNoteList(newNoteList as Note[]);
    setCurrentNote(newNote);
    setTopNoteInSideBar(newNote);
  };

  const selectNote = (selectedNote: Note) => {
    setCurrentNote(selectedNote);
  };

  const editContentOfCurrentNote = (newContent: String) => {
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
  };

  return (
    <Container>
      <MenuBar createNewNote={createNewNote} />
      <NoteSection>
        <SideBar
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
    </Container>
  );
};

export default HomeScreen;
