import React from 'react'

function Alert(props) {
    const capt=(word)=>{
        if(word==="danger") word = "error"
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    props.text && <div>
        <div className={`alert alert-${props.text.type} alert-dismissible fade show`} role="alert">
    <strong>{capt(props.text.type)}</strong> {props.text.msg}
    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
  </div>
  </div>
  )
}

export default Alert