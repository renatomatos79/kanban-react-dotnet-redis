import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

type Props = {
    content: string,
    readOnly: boolean,
    onChange: (content: string) => void,
    style?: React.CSSProperties | undefined
}

const CardContent: React.FC<Props> = (props) => {
    const [content, setContent] = useState<string>(props.content)

    const createTextarea = () => {
        return (
            <textarea
                value={content}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setContent(event.target.value)
                    props.onChange(event.target.value)
                }}
                rows={4}
                maxLength={255}
                style={{
                    width: '90%',
                    resize: 'none',
                    padding: '8px',
                    fontSize: '16px',
                    lineHeight: '1.5',
                }}
                placeholder="Type here (up to 4 lines)..."
            />
        )
    }

    const createDiv = () => {
        const rawHtml = String(marked.parse(content))
        const sanitizedHtml  = DOMPurify.sanitize(rawHtml)
        return (
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        )
    }

    return (
        <>
            { props.readOnly ? createDiv() : createTextarea() }
        </>
    );
};


export default CardContent;