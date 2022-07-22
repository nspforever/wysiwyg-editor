import "./Editor.css";

import { Editable, Slate, withReact } from "slate-react";

import { createEditor } from "slate";
import { useCallback, useMemo } from "react";
import Toolbar from "./Toolbar"
import useEditorConfig from "../hooks/useEditorConfig";
import useSelection from "../hooks/useSelection";
import { isLinkNodeAtSelection } from "../utils/EditorUtils";
import LinkEditor from "./LinkEditor";
import { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";


export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [previousSelection, selection, setSelection] = useSelection(editor);
  let selectionForLink = null;

  if (isLinkNodeAtSelection(editor, selection)) {
    selectionForLink = selection;
  } else if (selection == null && isLinkNodeAtSelection(editor, previousSelection)) {
    selectionForLink = previousSelection
  }

  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection)
    },
    [editor.selection, onChange, setSelection]
  );
  const editorRef = useRef(null);

  return (
    <Slate editor={editor} value={document} onChange={onChangeHandler}>
      <Container className={"editor-container"}>
        <Row>
          <Col>
            <Toolbar selection={selection} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="editor" ref={editorRef}>
              {selectionForLink != null ? (
                <LinkEditor editorOffsets={
                    editorRef.current != null
                    ? {
                      x: editorRef.current.getBoundingClientRect().x,
                      y: editorRef.current.getBoundingClientRect().y
                    } : null
                  } />
                ) : null}
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Slate>
  );
};

