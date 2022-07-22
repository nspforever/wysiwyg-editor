import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Editor, Transforms } from "slate";
import isUrl from "is-url";

export default function LinkEditor({ editorOffsets, selectionForLink }) {
  const linkEditorRef = useRef(null);
  const editor = useSlateStatic();
  const [linkNode, path] = Editor.above(editor, {
    at: selectionForLink,
    match: (n) => n.type === "link",
  });
  const [linkURL, setLinkURL] = useState(linkNode.url);

  useEffect(() => {
    setLinkURL(linkNode.url);
  }, [linkNode]);

  const onLinkURLChange = useCallback(
    (event) => setLinkURL(event.target.value),
    [setLinkURL]
  );

  const onApply = useCallback(
    (event) => {

      Transforms.setNodes(editor, { url: linkURL }, { at: path });
    },
    [editor, linkURL, path]
  );

  useEffect(() => {
    const linkEditorEl = linkEditorRef.current;
    if (linkEditorEl === null) {
      return;
    }

    const linkDOMNode = ReactEditor.toDOMNode(editor, linkNode);
    const {
      x: nodeX,
      height: nodeHeight,
      y: nodeY,
    } = linkDOMNode.getBoundingClientRect();

    linkEditorEl.style.display = "block";
    linkEditorEl.style.top = `${nodeY + nodeHeight - editorOffsets.y}px`
    linkEditorEl.style.left = `${nodeX - editorOffsets.x}px`
  }, [editor, editorOffsets.x, editorOffsets.y, linkNode]);

  if (editorOffsets == null) {
    return null;
  }

  return (
    <Card ref={linkEditorRef} className={"link-editor"}>
      <Card.Body>
        <Form.Control
          size="sm"
          type="text"
          value={linkURL}
          onChange={onLinkURLChange}
        />
        <Button
          className={"link-editor-btn"}
          size="sm"
          variant="primary"
          disabled={!isUrl(linkURL)}
          onClick={onApply}
        >
          Apply
        </Button>
      </Card.Body>
    </Card>
  );
}