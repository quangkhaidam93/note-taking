import { Note } from "../../../../types/note";
import NoteItem from "./note_item";
import { Container, EmptyContainer } from "./style";

type SideBarProps = {
  notes: Note[];
  topNode?: Note;
  currentNoteId?: string;
  createNewNote: () => void;
  selectNote: (note: Note) => void;
};

const SideBar: React.FC<SideBarProps> = ({
  notes,
  topNode,
  currentNoteId,
  createNewNote,
  selectNote,
}) => {
  if (notes.length === 0 && !topNode) {
    return (
      <EmptyContainer>
        <div>No Note</div>
        <button onClick={createNewNote}>Create New Note</button>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      {topNode && (
        <NoteItem
          isHighlight={currentNoteId === topNode.id}
          isNewNote={topNode.title.length === 0}
          onClick={() => selectNote(topNode)}
          title={topNode.title}
          updatedAt={topNode.updatedAt}
          content={topNode.content}
        />
      )}
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          isHighlight={currentNoteId === note.id}
          isNewNote={note.title.length === 0}
          onClick={() => selectNote(note)}
          title={note.title}
          updatedAt={note.updatedAt}
          content={note.content}
        />
      ))}
    </Container>
  );
};

export default SideBar;
