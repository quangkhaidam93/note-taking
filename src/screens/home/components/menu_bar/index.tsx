import { deleteIcon, newNoteIcon } from "../../../../assets/icons";
import { ActionIcon, AppTitle, MenuBarContainer } from "./style";

type MenuBarProps = {
  createNewNote: () => void;
  deleteNote: () => void;
  disabledNewNote: boolean;
};

const MenuBar: React.FC<MenuBarProps> = ({
  disabledNewNote,
  createNewNote,
  deleteNote,
}) => {
  return (
    <MenuBarContainer>
      <AppTitle>Note Taking App</AppTitle>
      <ActionIcon
        src={newNoteIcon}
        alt="new-note-icon"
        onClick={disabledNewNote ? () => {} : createNewNote}
      />
      <ActionIcon src={deleteIcon} onClick={deleteNote} />
    </MenuBarContainer>
  );
};

export default MenuBar;
