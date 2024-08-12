import loadingImage from "../assets/lading.gif"

const Spinner = () => {
  return (
    <div className="text-center p-5 my-5">
      <img src={loadingImage} alt="" style={{width:"7vw"}}/>
    </div>
  )
}

export default Spinner
