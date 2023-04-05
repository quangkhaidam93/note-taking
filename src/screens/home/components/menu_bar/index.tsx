type MenuBarProps = {
  createNewNote: () => void;
};

const MenuBar: React.FC<MenuBarProps> = ({ createNewNote }) => {
  return (
    <div style={{ height: 40, backgroundColor: "green" }}>
      <button onClick={createNewNote}>New Note</button>
    </div>
  );
};

export default MenuBar;
