import React from 'react'

import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MaterialTextArea(props) {
    const [textArea, setTextArea] = React.useState(null);
    const handleTextArea = (event) => {
        setTextArea(event.target.value);
      }
  return (
    <>
        <TextareaAutosize
            {...props}
            style={{ width: "100%",  border: "lightgrey", borderWidth: "thin", borderStyle: "solid" , ...props.style }}
        />
    </>
  )
}
