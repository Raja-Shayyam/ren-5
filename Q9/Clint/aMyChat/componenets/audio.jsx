
import { useRef } from 'react'
import myaudio from '../src/assets/new-notification-02-323592.mp3'
import { useEffect } from 'react'

export const Audio = () => {

  const refAudio = useRef(null)

  useEffect(() => {
    console.log(refAudio.current.play())
  }, [])


  return (
    <audio ref={refAudio} src={myaudio}></audio>
  )
}
