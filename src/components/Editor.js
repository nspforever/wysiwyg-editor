import { Editable, Slate, withReact } from "slate-react";

import { createEditor } from "slate";
import { useMemo } from "react";
import useEditorConfig from "./EditorConfig";


export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor)
  return (
    <Slate editor={editor} value={document} onChange={onChange}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};

