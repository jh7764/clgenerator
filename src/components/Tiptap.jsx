import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo, useEffect } from 'react'

const TiptapEditor = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose-editor focus:outline-none', // Add your CSS class here
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false) // false prevents cursor jump
    }
  }, [content, editor])

  return (
    <div className="white-paper-effect">
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor