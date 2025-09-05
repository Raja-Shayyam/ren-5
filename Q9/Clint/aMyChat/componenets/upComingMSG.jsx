import { useRef } from 'react';
import { useEffect } from 'react';
import { Audio } from './audio';

export const UpComingMSG = ({ state, ID }) => {

  console.log("id", ID);

  return (
    <>
      <div className="card-body d-flex flex-column gap-2" style={{ height: "400px", overflowY: "auto" }}>


        {state.mmsG_id.map((m, i) => (
          <div key={i}>
            {m.id == ID ? '' : <Audio />}
            <div className={`d-flex ${m.id == ID ? 'justify-content-end' : 'align-items-start'}`}>
              <div>
                <div className='fst-italic fs-6'><strong>  ID: </strong> <span>{m.id == ID ? 'Me ' : m.usernm}</span></div>
                <div className="p-2 rounded-4  text-dark"
                  style={{ backgroundColor: m.color, fontFamily: 'sans-serif' }}>

                  {/* <br style={{ padding: "0.5px 0" }} /> */}
                  <strong>Msg: </strong> <span>{m.text}</span>

                </div>

              </div>
            </div>
          </div>
        ))
        }


        {/* <div className="d-flex justify-content-end">
              <div className="p-2 rounded bg-primary text-white">
                Hello! How are you?  -- right
              </div>
            </div>


            <div className="d-flex align-items-start">
              <div className="p-2 rounded bg-light text-dark">
                I'm good, thanks! What about you? -- left
              </div>
            </div> */}
      </div>



    </>
  )
}







