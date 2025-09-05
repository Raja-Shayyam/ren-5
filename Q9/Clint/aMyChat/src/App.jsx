
import './App.css'
import { Header } from "../componenets/Header"
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { Mwssaes } from '../componenets/Mwssaes'
import { useState } from 'react'
import { useMemo } from 'react'
import { UpComingMSG } from '../componenets/upComingMSG'

import { useReducer } from 'react'
import { Login } from "../componenets/Login"


  // const socket = useMemo(() => io("http://localhost:3000"), [])
function App({ id_name }) {
  const socket = useMemo(() => io("http://192.168.10.3:3000"), [])
  console.log('----------------', socket.id);

  const [msg, setMsg] = useState('')
  const [msG, seTmsg] = useState([])

  const initial = {
    // iid: null,
    mmsG_id: [],
    userColors: null,
  }


  const reducer = (state, action) => {
    switch (action.type) {
      case "SEY_COLOR":
        return { ...state, userColors: action.payload };

      case 'SET_MSG':
        return {
          ...state,
          mmsG_id: [...state.mmsG_id, action.payload]
        }


      default:
        break;
    }
  }
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    // const userInput = prompt("Enter your email:");

    // setid_Name(userInput)
    socket.on("connect", () => {
      // alert("úser connected  " + socket.id)
      console.log(' úser connected ', "id ", socket.id);



      // socket.emit('myUsername', id_name)
      // setid(socket.id)
      socket.on("specific-color", (clr) => {
        dispatch({ type: 'SEY_COLOR', payload: clr })
      })

    })

    if (id_name) {
      // let a = 'kutty'
      socket.emit("user", id_name);
      console.log('mu user name ', id_name);
    }

    socket.on("userwelcome", (d) => {
      console.log('d', d);
      alert(d)
    })

    //welcom
    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("mesage-toAll", (values, ids, cooloor, name_id) => {
      console.log('to All ', name_id, name_id, 'ids ', ids, 'USER: ', values);

      dispatch({ type: 'SET_MSG', payload: { id: ids, text: values, color: cooloor, usernm: name_id } })
      
      // dispatch({ type: 'SET_MSG', payload: data });
    });

    // socket.on("mesage-toAll", (values, ids, colr, name_id) => {
    //   console.log('to All ', values, 'ids ', ids, 'colooooo ', colr, 'USER: ', name_id);
    //   // setid(ids)
    //   // dispatch({ type: 'SET_ID', payload: ids })
    //   // seTmsg((pre) => [...pre, values])dispatch({ type: 'SET_MSG', payload: values })
    //   dispatch({ type: 'SET_MSG', payload: { id: ids, text: values, color: colr, usernm: name_id } })


    // })



    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("specific-color");
      socket.off("welcome");
      socket.off("mesage-toAll");
    };
  }, [socket, id_name])

  useEffect(() => {
    if (msg) {
      console.log('my msg ', msg);
      socket.emit("mesage", msg)
    }

    // socket.on("mesage-toAll", (values,ids) => {
    //   console.log('to All ', values,'ids ',ids);
    //   setid(ids)
    //   seTmsg(values)
    // })

    return () => { socket.off("mesage"); }
  }, [msg, socket])

  // useEffect(() => {
  //   console.log(id_name);

  //   if (id_name) {

  //   }
  // }, [id_name, socket]);

  // useEffect(() => {
  //   socket.on("mesage", (s) => {
  //     console.log(s)
  //     console.log(msg);
  //   })
  //   console.log(msg);
  // }, [msg])style={{background:state.mmsG_id.color}}227, 115, 73shadow-sm

  return (
    <>
      <Header />
      <div className="container " style={{margin:'5px'}}>
        <div className="card " style={{
          border: `3px solid ${state.userColors}`,
          // boxShadow:`inset 9px 6rem 8rem rgb(62 183 78 / 86%) `
          boxShadow: `inset 0px 0rem 9rem 0px ${state.userColors} `
        }}>
          <div className="card-header bg-primary text-white " style={{}} >
            <strong>Chat with Support</strong>
            <strong>USER_ID: </strong>{socket.id}
          </div>
          <UpComingMSG state={state} ID={socket.id} />
          <Mwssaes setMsg={setMsg} />
        </div>
      </div>
    </>

  )
}

export default App
