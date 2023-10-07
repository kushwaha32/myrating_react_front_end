import plusImg from "../../img/plus-increment.png";
import negativeImg from "../../img/minus-decrement.png";

const IncrementAndDecrementBtn = ({ index, mainInput, setMainInput }) => {
  return (
    <div className="add-increment text-center">
      {index === 0 && (
        <>
          <button
            type="button"
            className={`decremant-btn increment-btn ${
              mainInput <= 1 ? "disabled" : ""
            }`}
            onClick={() => (mainInput <= 1 ? "" : setMainInput(mainInput - 1))}
          >
            <img src={negativeImg} alt="Decrement" />
          </button>
          <button
            type="button"
            className="increment-btn"
            onClick={() => setMainInput(mainInput + 1)}
          >
            <img src={plusImg} alt="Inrement" />
          </button>
        </>
      )}
    </div>
  );
};

export default IncrementAndDecrementBtn;
