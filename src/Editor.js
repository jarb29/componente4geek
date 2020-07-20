import React, { useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

let text =
  '{\n  "id": 0,\n  ' +
  '"script": """\n   function add(x, y) {\n      return x + y;\n   }\n   add(1, 2);\n   """' +
  ',\n   "descr": "add two numbers"\n}';

export default function Editor(props) {
    console.log(props, "valor que pasa")

 
    
  return (
    <div >
      <h1>Code Editor</h1>
      <AceEditor
        mode="json"
        theme="github"
        onChange={(value, stat) => {
          console.log("onChange", value, stat);
        }}
        value={text}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}