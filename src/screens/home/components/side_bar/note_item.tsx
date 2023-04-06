import dayjs from "dayjs";
import { NoteContent, NoteDate, NoteItemContainer, NoteTitle } from "./style";

type NoteItemProps = {
  isHighlight: boolean;
  isNewNote: boolean;
  title?: string;
  updatedAt: string;
  content: string;
  onClick: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({
  title,
  isNewNote,
  isHighlight,
  updatedAt,
  content,
  onClick,
}) => {
  const lines = content.split("\n");

  lines.splice(0, 1);

  const realContent = lines.join("\n");

  return (
    <NoteItemContainer onClick={onClick} isHighlight={isHighlight}>
      <NoteTitle>{isNewNote ? "New Note" : title}</NoteTitle>
      <NoteDate>{dayjs(updatedAt).format("DD/MM/YY HH:mm")}</NoteDate>
      <NoteContent>{realContent}</NoteContent>
    </NoteItemContainer>
  );
};

export default NoteItem;
