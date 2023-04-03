import NoteContent from "./components/note_content";
import SideBar from "./components/side_bar/side_bar";
import { Container } from "./styles";

const HomeScreen = () => {
  return (
    <Container>
      <SideBar />
      <NoteContent />
    </Container>
  );
};

export default HomeScreen;
