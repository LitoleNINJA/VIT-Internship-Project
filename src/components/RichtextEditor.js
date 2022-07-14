import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { useState } from 'react';
import { Box } from '@mui/material';

export default function RichtextEditor({ editorState, setEditorState }) {

    const [editor, setEditor] = useState(null);

    return (
        <Box sx={{
            border: '1px solid black',
            borderRadius: '5px',
        }}>
            <CKEditor
                onReady={ editor => {
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    setEditor(editor);
                }}
                onError={ ( error, { willEditorRestart } ) => {
                    if ( willEditorRestart ) {
                        editor.ui.view.toolbar.element.remove();
                    }
                } }
                editor={DecoupledEditor}
                data={editorState}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorState(data);
                }}
            />
        </Box>
    )
}
