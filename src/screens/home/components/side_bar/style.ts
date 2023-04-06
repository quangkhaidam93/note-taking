import styled from "styled-components";

export const Container = styled.div`
  width: 20%;
  overflow-x: scroll;
`;

export const EmptyContainer = styled.div`
  width: 20%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoteItemContainer = styled.div<{ isHighlight: boolean }>`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid black;
  background-color: ${(props) => (props.isHighlight ? "khaki" : "")};
`;

export const NoteTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
`;

export const NoteDate = styled.div`
  font-style: italic;
  color: gray;
`;

export const NoteContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
