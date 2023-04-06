import { forwardRef } from "react";
import { Note } from "../../../../types/note";
import { Container, ContentEditor, Date } from "./style";
import dayjs from "dayjs";

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
        <Date>{dayjs(note.updatedAt).format("D MMMM YYYY - HH:mm")}</Date>
        <ContentEditor
          key={note.id as React.Key}
          value={note.content}
          onChange={textChangeHandler}
          ref={ref}
          style={{}}
        />
      </Container>
    );
  }
);

export default NoteContent;
