
import Dropdown from "react-bootstrap/Dropdown";


const RateAsUserType = ({rateAs, changeRateAs}) =>{
    return(
        <Dropdown className="rr-model-cab">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {rateAs}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratingAs"
              value="visitor"
              id="visiter"
              onChange={(e) => changeRateAs(e.target.value)}
            />
            <label className={`form-check-label ${rateAs === "visitor" ? "rr-model-color" : ""}`} htmlFor="visiter">
              Visitor
            </label>
          </div>
          
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratingAs"
              id="customer"
              value="customer"
              onChange={(e) => changeRateAs(e.target.value)}
            />
            <label className={`form-check-label ${rateAs === "customer" ? "rr-model-color" : ""}`} htmlFor="customer">
              Customer
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratingAs"
              id="public"
              value="public"
              onChange={(e) => changeRateAs(e.target.value)}
            />
            <label className={`form-check-label ${rateAs === "public" ? "rr-model-color" : ""}`} htmlFor="public">
            Public
            </label>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default RateAsUserType