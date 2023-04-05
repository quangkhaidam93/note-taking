import { forwardRef } from "react";
import { Note } from "../../../../types/note";
import { Container } from "./style";

type NoteContentProps = {
  note?: Note;
  editContent: (content: string) => void;
};

const NoteContent = forwardRef<HTMLTextAreaElement, NoteContentProps>(
  ({ note, editContent }, ref) => {
    const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
      editContent(e.currentTarget.value);
    };

    if (!note) return <Container />;

    return (
      <Container>
        <textarea
          key={note.id as React.Key}
          value={note.content}
          onChange={textChangeHandler}
          ref={ref}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
          }}
        />
      </Container>
    );
  }
);

export default NoteContent;
