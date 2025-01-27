import React from 'react';

type Props = {
    tamanho: number,
    titulo: string,
    style?: React.CSSProperties | undefined
}

const Heading: React.FC<Props> = (props ) => {
    const Tag = `h${props.tamanho}` as keyof JSX.IntrinsicElements
    return (
        <Tag style={props.style}>{props.titulo}</Tag>
    );
};

export default Heading;