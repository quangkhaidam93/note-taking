import { Note } from "../../../../types/note";
import { Container, EmptyContainer } from "./style";

type SideBarProps = {
  notes: Note[];
  topNode?: Note;
  createNewNote: () => void;
  selectNote: (note: Note) => void;
};

const SideBar: React.FC<SideBarProps> = ({
  notes,
  topNode,
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
        <div style={{ padding: 12, borderBottom: "1px solid black" }}>
          {topNode.title.length === 0 ? "New Note" : topNode.title}
        </div>
      )}
      {notes.map((note) => (
        <div
          style={{ padding: 12, borderBottom: "1px solid black" }}
          onClick={() => selectNote(note)}
        >
          {note.title.length === 0 ? "New Note" : note.title}
        </div>
      ))}
    </Container>
  );
};

export default SideBar;
