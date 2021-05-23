import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

export function extensionFactory(options) {
  return Node.create({
    name: options.name,
    group: options.group || "block",
    content: "inline*",
    selectable: true,
    draggable: true,
    atom: options.atom || false,
    defaultOptions: options.options || {},
    priority: options.priority || 1,
    onBeforeCreate({ editor }) {
      // Before the view is created.
      options.onBeforeCreate && options.onBeforeCreate(editor);
    },
    onCreate({ editor }) {
      // The editor is ready.
      options.onCreate && options.onCreate(editor);
    },
    onUpdate({ editor }) {
      // The content has changed.
      options.onUpdate && options.onUpdate(editor);
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed.
      options.onSelectionUpdate && options.onSelectionUpdate(editor);
    },
    onTransaction({ editor, transaction }) {
      // The editor state has changed.
      options.onTransaction && options.onTransaction(editor);
    },
    onFocus({ editor, event }) {
      // The editor is focused.
      options.onFocus && options.onFocus(editor);
    },
    onBlur({ editor, event }) {
      // The editor isn’t focused anymore.
      options.onBlur && options.onBlur(editor);
    },
    onDestroy() {
      // The editor is being destroyed.
      options.onDestroy && options.onDestroy();
    },

    addKeyboardShortcuts() {
      if (!options.keyboardShortcuts) return {};
      return (
        options.keyboardShortcuts && options.keyboardShortcuts(this.editor)
      );
    },

    addCommands() {
      return {
        [`insert${options.name}`]:
          (attributes) =>
          ({ chain }) => {
            return chain()
              .insertContent({
                type: options.name,
                attrs: {
                  url: "",
                },
              })
              .run();
            //.insertNode(options.name, attributes)
            //.insertText(" ")
            //.run();
          },
      };
    },
    addAttributes() {
      return options.attributes || {};
    },
    parseHTML() {
      return (
        options.parseHTML || [
          {
            tag: options.tag,
          },
        ]
      );
    },
    renderHTML({ HTMLAttributes }) {
      //mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
      return [options.tag, mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
      return ReactNodeViewRenderer(options.component);
    },
  });
}
