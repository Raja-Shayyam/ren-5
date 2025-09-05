import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react'

export const Mwssaes = ({ setMsg }) => {
  const mgRef = useRef(null)
  // const [msg, setMsg] = useState('')

  // const handle = (e) => {
  //   setMsg(e.target.value)
  // }

  const func = (e) => {
    e.preventDefault();
    let a = mgRef.current.value
    setMsg(a)
     mgRef.current.value=''
  }
  // useEffect(()=>{
  //   console.log('#########  ',msg);

  //   socket.emit("mesage", msg)

  //   mgRef.current.value = ''

  // },[msg])


  return (
    <>
      <form onSubmit={func}>
        <div className="card-footer">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Type a message..." ref={mgRef} />
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </div>
      </form>
    </>)
}
// value={msg} onChange={handle}