import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo, useEffect } from 'react'

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({editor}) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'tiptap-content focus:outline-none', 
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false) 
    }
  }, [content, editor])

  return (
    <div className="editor-content">
        <div className="white-paper-effect">
        <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TiptapEditor