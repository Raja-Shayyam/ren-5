import myImg from "../src/assets/images.png";

export const Header = () => {

  return (
    <><div className="container" style={{margin:'5px'}}>
      <div className="py-5 text-center"> <img className="d-block mx-auto mb-4" src={myImg} alt="" width="72" height="57" /> <h1 className="h2"><strong>Ren-3</strong></h1> </div>
    </div>
    </>
  )
}
