import "./mainimg.css";

const Main_Photo = () => {
  return (
    <div className="display">
      <img className="main_pic" src={require('./top-pic.jpeg')} alt="Deakin University" />
    </div>
  );
};

export default Main_Photo;