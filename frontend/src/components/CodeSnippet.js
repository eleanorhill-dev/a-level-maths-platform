import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ code, language = "python" }) => {
  return (
    <SyntaxHighlighter language={language} style={oneLight} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
