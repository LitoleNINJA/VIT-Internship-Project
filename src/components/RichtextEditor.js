import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function RichtextEditor({ editorState, setEditorState }) {

    const toolbarConfig = {
        toolbar: [
            'heading', '|', 
            'bold', 'italic', '|', 
            'link', 'bulletedList', 'numberedList', '|', 
            'blockQuote', 'imageUpload', 'insertTable', '|',
            'undo', 'redo',
        ]
    }
    return (
        <CKEditor
            editor={ClassicEditor}
            data={editorState}
            config={toolbarConfig}
            onChange={(event, editor) => {
                const data = editor.getData();
                setEditorState(data);
            }}
        />
    )
}
