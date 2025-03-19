import './Cover.css'

const Cover = () => {
    return (
      <div className="cover">
        <div className="front">
          <img src="/images/frontImg.jpg" alt="Front Cover" />
          <div className="text">
            <span className="text-1">
              Every new friend is a <br /> new adventure
            </span>
            <span className="text-2">Let&apos;s get connected</span>
          </div>
        </div>
        <div className="back">
          {/* <img className="backImg" src="/images/backImg.jpg" alt="Back Cover" /> */}
          <div className="text">
            <span className="text-1">
              Complete miles of journey <br /> with one step
            </span>
            <span className="text-2">Let&apos;s get started</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Cover;
  