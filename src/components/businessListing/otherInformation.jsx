import { useFormik } from "formik";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import navigatePre from "../../img/navigate-pre.png";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import locationInformationSchema from "../../schemaValidation/locationInformationSchema";
import ToggledSwitch from "../ToggledSwitch";
import plusImg from "../../img/plus-increment.png";
import negativeImg from "../../img/minus-decrement.png";
import { useToast } from "react-toastify";
import { contactInfoValidationSchema } from "../../schemaValidation/contactInfoValidationSchema";
import { useEffect } from "react";
import { useRef } from "react";
import useHoursOptions from "../../utils/ownHooks/useHoursOptions";
import { IsTabletOrLess } from "../../utils/mediaScreens";

const OtherInformation = () => {
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////////////////
  //////////////////----------- hours options ---------------/////////////////
  ///////////////////////////////////////////////////////////////////////////
  const hoursOptions = useHoursOptions();

  /////////////////////////////////////////////////////////////////////////////
  //////----------- Number of input count for offers ---------------///////////
  ////////////////////////////////////////////////////////////////////////////

  const [offerNumInputs, setOfferNumInputs] = useState(1);
  const prevOfferNumInputsRef = useRef(offerNumInputs);

  /////////////////////////////////////////////////////////////////////////////
  ///////-- Number of input count for awardCerRecognition --///////////
  ////////////////////////////////////////////////////////////////////////////

  const [awardCerRecognitionNumInputs, setAwardCerRecognitionNumInputs] =
    useState(1);
  const prevAwardCerRecognitionNumInputsRef = useRef(
    awardCerRecognitionNumInputs
  );

  /////////////////////////////////////////////////////////////////////////////
  ///////////----------------- Initial state ------------------///////////////
  ////////////////////////////////////////////////////////////////////////////

  const [initialValues, setInitialValues] = useState({
    // description
    description: "",

    // offters
    offer: Array.from({ length: offerNumInputs }, () => ""),
    offerValidUpto: Array.from({ length: offerNumInputs }, () => ""),
    isOfferPublic: Array.from({ length: offerNumInputs }, () => false),

    // establisment year
    stablismentYear: "",
    isStablismentYearPublic: false,

    // award, sertificate, recognition
    awardCerRecognition: Array.from(
      { length: awardCerRecognitionNumInputs },
      () => ""
    ),
    awardCerRecognitionYear: Array.from(
      { length: awardCerRecognitionNumInputs },
      () => ""
    ),
    isAwardCerRecognitionPublic: Array.from(
      { length: awardCerRecognitionNumInputs },
      () => false
    ),

    // Hours of operation / public
    isHoursOpenPublic: "yes",
    //  monday operation
    mondayStart: "Open 24 Hours",
    mondayEnd: "Open 24 Hours",
    mondayClose: false,
    //  tuesday operation
    tuesdayStart: "Open 24 Hours",
    tuesdayEnd: "Open 24 Hours",
    tuesdayClose: false,
    //  wednesday operation
    wednesdayStart: "Open 24 Hours",
    wednesdayEnd: "Open 24 Hours",
    wednesdayClose: false,
    //  thursday operation
    thursdayStart: "Open 24 Hours",
    thursdayEnd: "Open 24 Hours",
    thursdayClose: false,
    //  friday operation
    fridayStart: "Open 24 Hours",
    fridayEnd: "Open 24 Hours",
    fridayClose: false,
    //  saturday operation
    saturdayStart: "Open 24 Hours",
    saturdayEnd: "Open 24 Hours",
    saturdayClose: false,
    //  sunday operation
    sundayStart: "Open 24 Hours",
    sundayEnd: "Open 24 Hours",
    sundayClose: false,

    // Pament Modes
    isPamentModesPublic: "yes",
    // row 1
    cash: false,
    debitCards: false,
    creditCards: false,
    americonExpressCards: false,
    checkDD: false,
    rtgsNeftImps: false,
    // row 2
    upi: false,
    gPay: false,
    phonePay: false,
    payTm: false,
    amazonPay: false,
    credPay: false,
    // row 3
    airtelMoney: false,
    bhimApp: false,
    cashOnDelivery: false,
    jioPay: false,
    masterCard: false,
    visaCard: false,
    // row 4
    rupayCard: false,
    moneyOrder: false,
    travellersCard: false,
    payuMoney: false,
  });

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues,
    // validationSchema: contactInfoValidationSchema,
    onSubmit: async (values) => {
      try {
        // offer values
        setIsLoading(true);
        const offer = values?.offer?.map((value, index) => ({
          offer: value,
          offerValidUpto: values.offerValidUpto[index],
          isOfferPublic: !values.isOfferPublic[index],
        }));

        // stablishment year values
        const stablishmentYear = {
          year: values.stablismentYear,
          isStablismentYearPublic: values.isStablismentYearPublic,
        };

        // Awards, Certificates and Recognitions
        const awardCerRecognition = values?.awardCerRecognition?.map(
          (value, index) => ({
            awardCerRecognition: value,
            year: values.awardCerRecognitionYear[index],
            isAwardCerRecognitionPublic:
              values.isAwardCerRecognitionPublic[index],
          })
        );

        // Hours of Operation / Open for Visitors and Customers
        const hoursOfOperation = {
          isHoursOpenPublic: values.isHoursOpenPublic === "yes" ? true : false,
          operationDay: {
            monday: {
              start: values.mondayStart,
              end: values.mondayEnd,
              close: values.mondayClose,
            },
            tuesday: {
              start: values.tuesdayStart,
              end: values.tuesdayEnd,
              close: values.tuesdayClose,
            },
            wednesday: {
              start: values.wednesdayStart,
              end: values.wednesdayEnd,
              close: values.wednesdayClose,
            },
            thursday: {
              start: values.thursdayStart,
              end: values.thursdayEnd,
              close: values.thursdayClose,
            },
            friday: {
              start: values.fridayStart,
              end: values.fridayEnd,
              close: values.fridayClose,
            },
            saturday: {
              start: values.saturdayStart,
              end: values.saturdayEnd,
              close: values.saturdayClose,
            },
            sunday: {
              start: values.sundayStart,
              end: values.sundayEnd,
              close: values.sundayClose,
            },
          },
        };

        // Pament Modes Accepted by You
        const pamentModes = {
          isPamentModesPublic:
            values.isPamentModesPublic === "yes" ? true : false,
          pamentModesOptions: {
            cash: values.cash,
            debitCards: values.debitCards,
            creditCards: values.creditCards,
            americonExpressCards: values.americonExpressCards,
            checkDD: values.checkDD,
            rtgsNeftImps: values.rtgsNeftImps,
            upi: values.upi,
            gPay: values.gPay,
            phonePay: values.phonePay,
            payTm: values.payTm,
            amazonPay: values.amazonPay,
            credPay: values.credPay,
            airtelMoney: values.airtelMoney,
            bhimApp: values.bhimApp,
            cashOnDelivery: values.cashOnDelivery,
            jioPay: values.jioPay,
            masterCard: values.masterCard,
            visaCard: values.visaCard,
            rupayCard: values.rupayCard,
            moneyOrder: values.moneyOrder,
            travellersCard: values.travellersCard,
            payuMoney: values.payuMoney,
          },
        };
        const data = {
          description: values.description,
          offer,
          stablishmentYear,
          awardCerRecognition,
          hoursOfOperation,
          pamentModes,
        };

        setTimeout(() => {
          handlePreviousStep("other-information");
          navigate("/list-your-business/business-keywords");
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });

  /////////////////////////////////////////////////////////////////////////////
  ////----- handling the offers when offerNumInputs increase -----///////////////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (offerNumInputs > values.offer.length) {
      const additionalFields = Array.from(
        { length: offerNumInputs - values.offer.length },
        () => ""
      );
      setFieldValue("offer", [...values.offer, ...additionalFields]);
      setFieldValue("isOfferPublic", [
        ...values.isOfferPublic,
        ...additionalFields.map(() => false),
      ]);
      setFieldValue("offerValidUpto", [
        ...values.offerValidUpto,
        ...additionalFields,
      ]);
    } else {
      if (offerNumInputs !== prevOfferNumInputsRef.current) {
        const offerClone = [...values.offer];
        offerClone.splice(offerClone.length - 1, 1);

        const isOfferPublicClone = [...values.isOfferPublic];
        isOfferPublicClone.splice(isOfferPublicClone.length - 1, 1);

        const offerValidUptoClone = [...values.offerValidUpto];
        offerValidUptoClone.splice(offerValidUptoClone.length - 1, 1);

        setFieldValue("offer", offerClone);
        setFieldValue("isOfferPublic", isOfferPublicClone);
        setFieldValue("offerValidUpto", offerValidUptoClone);
      }
    }
    prevOfferNumInputsRef.current = offerNumInputs;
  }, [offerNumInputs, setFieldValue]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ////////------- handling the award, certificates and recognition when ----------//////////////////
  ////////////////------ awardCerRecognitionNumInputs increase --------////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (awardCerRecognitionNumInputs > values.awardCerRecognition.length) {
      const additionalFields = Array.from(
        {
          length:
            awardCerRecognitionNumInputs - values.awardCerRecognition.length,
        },
        () => ""
      );
      setFieldValue("awardCerRecognition", [
        ...values.awardCerRecognition,
        ...additionalFields,
      ]);
      setFieldValue("isAwardCerRecognitionPublic", [
        ...values.isAwardCerRecognitionPublic,
        ...additionalFields.map(() => false),
      ]);
      setFieldValue("awardCerRecognitionYear", [
        ...values.awardCerRecognitionYear,
        ...additionalFields,
      ]);
    } else {
      if (
        awardCerRecognitionNumInputs !==
        prevAwardCerRecognitionNumInputsRef.current
      ) {
        const awardCerRecognitionClone = [...values.awardCerRecognition];
        awardCerRecognitionClone.splice(awardCerRecognitionClone.length - 1, 1);
        console.log(awardCerRecognitionClone);

        const isAwardCerRecognitionPublicClone = [
          ...values.isAwardCerRecognitionPublic,
        ];
        isAwardCerRecognitionPublicClone.splice(
          isAwardCerRecognitionPublicClone.length - 1,
          1
        );

        const awardCerRecognitionYearClone = [
          ...values.awardCerRecognitionYear,
        ];
        awardCerRecognitionYearClone.splice(
          awardCerRecognitionYearClone.length - 1,
          1
        );

        setFieldValue("awardCerRecognition", awardCerRecognitionClone);
        setFieldValue(
          "isAwardCerRecognitionPublic",
          isAwardCerRecognitionPublicClone
        );
        setFieldValue("awardCerRecognitionYear", awardCerRecognitionYearClone);
      }
    }
    prevAwardCerRecognitionNumInputsRef.current = awardCerRecognitionNumInputs;
  }, [awardCerRecognitionNumInputs, setFieldValue]);

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("contact-information");
    navigate("/list-your-business/contact-information");
  };

  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify position-relative">
      {!IsTabletOrLess() ? (
        <h1 className="title position-absolute list-business-navigate">
          <button onClick={getBack} className="transparent-btn">
            <img
              src={navigatePre}
              alt="navigate"
              loading="lazy"
              className="navigate-img"
            />
          </button>
        </h1>
      ) : (
        ""
      )}
      {/*/////////////------from field  .error-active -> for active error class ---////// 
     //////////////----------- .valid-active-g -> for valid input -----/////////////////
      */}

      <section className="register-b-main register-b-mn-verify loca-b-main business-b-main mb-5 position-relative">
        <form className="was-validated " onSubmit={handleSubmit}>
          <div className="form-group">
            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////////---------- Description -------//////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row">
              <div className="col-lg-12">
                <label>
                  Description <span className="mx-4">(500 Words)</span>
                </label>
                <div>
                  <textarea
                    className="form-control mt-2"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ height: "156px", width: "100%" }}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*//////////---------- Any offers for customer -------/////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-4">
              <div className="col-lg-6">
                <label>Any Offer for customers?</label>
              </div>
              <div className="col-lg-6">
                <label>Valid upto</label>
              </div>
            </div>
            {values?.offer?.map((value, index) => (
              <div className="row mt-2" key={index}>
                <div className="col-lg-6 otIf_mr_sm">
                  <input
                    type="text"
                    className={`form-control`}
                    placeholder="Offer name, percentage and offer code"
                    name={`offer[${index}]`}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                  <Dropdown className="valid-upopton" style={{ width: "40%" }}>
                    <Dropdown.Toggle
                      variant="success"
                      className="drop-id-veri drop-id-business"
                      id="dropdown-basic"
                    >
                      {values.offerValidUpto[index]
                        ? values.offerValidUpto[index]
                        : "select valid till"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "100%" }}>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(`offerValidUpto[${index}]`, "1 hours")
                        }
                      >
                        1 hour
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(`offerValidUpto[${index}]`, "2 hours")
                        }
                      >
                        2 Hours
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(`offerValidUpto[${index}]`, "3 hours")
                        }
                      >
                        3 Hours
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(`offerValidUpto[${index}]`, "4 hours")
                        }
                      >
                        4 Hours
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(`offerValidUpto[${index}]`, "5 hours")
                        }
                      >
                        5 Hours
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                  </Dropdown>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div
                    className="add-increment text-center"
                    style={{ width: "30%" }}
                  >
                    {index === 0 && (
                      <>
                        <button
                          type="button"
                          className={`decremant-btn increment-btn ${
                            offerNumInputs <= 1 ? "disabled" : ""
                          }`}
                          onClick={() =>
                            offerNumInputs <= 1
                              ? ""
                              : setOfferNumInputs(offerNumInputs - 1)
                          }
                        >
                          <img src={negativeImg} alt="Decrement" />
                        </button>
                        <button
                          type="button"
                          className="increment-btn"
                          onClick={() => setOfferNumInputs(offerNumInputs + 1)}
                        >
                          <img src={plusImg} alt="Inrement" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div
                    className="position-relative con-info-switch"
                    style={{ width: "30%", textAlign: "right" }}
                  >
                    <input
                      type="checkbox"
                      name={`isOfferPublic[${index}]`}
                      value={values?.isOfferPublic[index]}
                      className="public-private-switch"
                      checked={values?.isOfferPublic[index]}
                      onChange={handleChange}
                    />
                    <ToggledSwitch
                      publicStatus={values?.isOfferPublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////---------- Stablishment Year -------////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-4 align-items-center">
              <div className="col-lg-3">
                <label>Stablishment Year</label>
              </div>
              <div className="col-lg-9 d-flex align-items-center justify-content-between">
                <Dropdown className="valid-upopton" style={{ width: "180px" }}>
                  <Dropdown.Toggle
                    variant="success"
                    className="drop-id-veri drop-id-business"
                    id="dropdown-basic"
                  >
                    {values.stablismentYear
                      ? values.stablismentYear
                      : "select valid till"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    <Dropdown.Item
                      as="div"
                      onClick={() => setFieldValue(`stablismentYear`, "2020")}
                    >
                      2000
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="div"
                      onClick={() => setFieldValue(`stablismentYear`, "2021")}
                    >
                      2021
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="div"
                      onClick={() => setFieldValue(`stablismentYear`, "2022")}
                    >
                      2022
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="div"
                      onClick={() => setFieldValue(`stablismentYear`, "2023")}
                    >
                      2023
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="div"
                      onClick={() => setFieldValue(`stablismentYear`, "2024")}
                    >
                      2024
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                </Dropdown>

                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Public and Private permission --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div
                  className="position-relative con-info-switch"
                  style={{ textAlign: "right" }}
                >
                  <input
                    type="checkbox"
                    name={`isStablismentYearPublic`}
                    value={values?.isStablismentYearPublic}
                    className="public-private-switch"
                    checked={values?.isStablismentYearPublic}
                    onChange={handleChange}
                  />
                  <ToggledSwitch
                    publicStatus={values?.isStablismentYearPublic}
                  />
                </div>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*//////---------- award, certificate and recognition -------///// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-4">
              <div className="col-lg-12">
                <label>Awards, Certificates and Recognitions</label>
              </div>
            </div>
            {values?.awardCerRecognition?.map((value, index) => (
              <div className="row mt-2" key={index}>
                <div className="col-lg-6">
                  <input
                    type="text"
                    className={`form-control`}
                    placeholder="Awards, Certificates and Recognitions"
                    name={`awardCerRecognition[${index}]`}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                  <Dropdown className="valid-upopton" style={{ width: "40%" }}>
                    <Dropdown.Toggle
                      variant="success"
                      className="drop-id-veri drop-id-business"
                      id="dropdown-basic"
                    >
                      {values.awardCerRecognitionYear[index]
                        ? values.awardCerRecognitionYear[index]
                        : "Year"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "100%" }}>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(
                            `awardCerRecognitionYear[${index}]`,
                            "2020"
                          )
                        }
                      >
                        2022
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(
                            `awardCerRecognitionYear[${index}]`,
                            "2021"
                          )
                        }
                      >
                        2021
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(
                            `awardCerRecognitionYear[${index}]`,
                            "2022"
                          )
                        }
                      >
                        2022
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(
                            `awardCerRecognitionYear[${index}]`,
                            "2023"
                          )
                        }
                      >
                        2023
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={() =>
                          setFieldValue(
                            `awardCerRecognitionYear[${index}]`,
                            "2024"
                          )
                        }
                      >
                        2024
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                  </Dropdown>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div
                    className="add-increment text-center "
                    style={{ width: "30%" }}
                  >
                    {index === 0 && (
                      <>
                        <button
                          type="button"
                          className={`decremant-btn increment-btn ${
                            awardCerRecognitionNumInputs <= 1 ? "disabled" : ""
                          }`}
                          onClick={() =>
                            awardCerRecognitionNumInputs <= 1
                              ? ""
                              : setAwardCerRecognitionNumInputs(
                                  awardCerRecognitionNumInputs - 1
                                )
                          }
                        >
                          <img src={negativeImg} alt="Decrement" />
                        </button>
                        <button
                          type="button"
                          className="increment-btn"
                          onClick={() =>
                            setAwardCerRecognitionNumInputs(
                              awardCerRecognitionNumInputs + 1
                            )
                          }
                        >
                          <img src={plusImg} alt="Inrement" />
                        </button>
                      </>
                    )}
                  </div>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div
                    className="position-relative con-info-switch "
                    style={{ width: "30%", textAlign: "right" }}
                  >
                    <input
                      type="checkbox"
                      name={`isAwardCerRecognitionPublic[${index}]`}
                      value={values?.isAwardCerRecognitionPublic[index]}
                      className="public-private-switch"
                      checked={values?.isAwardCerRecognitionPublic[index]}
                      onChange={handleChange}
                    />
                    <ToggledSwitch
                      publicStatus={values?.isAwardCerRecognitionPublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* //////////////////////////////////////////////////////////////////////// */}
            {/*//////---- Hours of Operation / Open for visitors and customers ----///// */}
            {/* //////////////////////////////////////////////////////////////////////// */}
            <div className="row mt-4 gender-chek hours-operation">
              <div className="col-lg-12">
                <label>
                  Hours of Operation / Open for Visitors and Customers
                </label>
              </div>
              <div className="col-lg-12">
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        id="hoursOpen"
                        type="radio"
                        className="form-check-input"
                        name="isHoursOpenPublic"
                        value="yes"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.isHoursOpenPublic === "yes"}
                      />

                      <label className="register-label" htmlFor="hoursOpen">
                        Show hours to public
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    {" "}
                    <div className="form-check">
                      <input
                        id="isHoursClose"
                        type="radio"
                        className="form-check-input"
                        name="isHoursOpenPublic"
                        value="no"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.isHoursOpenPublic === "no"}
                      />

                      <label className="register-label" htmlFor="isHoursClose">
                        Do not show hours to public
                      </label>
                    </div>
                  </div>
                </div>
                {/* Monday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5 ">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Monday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values.mondayClose ? "close" : values.mondayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `mondayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("mondayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values.mondayClose ? "close" : values.mondayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `mondayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("mondayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="mondayClose"
                        value={values?.mondayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.mondayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tuesday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Tuesday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values.tuesdayClose
                              ? "close"
                              : values.tuesdayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `tuesdayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("tuesdayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values.tuesdayClose ? "close" : values.tuesdayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `tuesdayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("tuesdayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="tuesdayClose"
                        value={values?.tuesdayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.tuesdayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                {/* Wednesday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Wednesday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values?.wednesdayClose
                              ? "close"
                              : values.wednesdayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `wednesdayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("wednesdayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values?.wednesdayClose ? "close" : values.wednesdayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `wednesdayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("wednesdayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="wednesdayClose"
                        value={values?.wednesdayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.wednesdayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                {/* Thursday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Thursday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values?.thursdayClose
                              ? "close"
                              : values.thursdayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `thursdayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("thursdayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values?.thursdayClose ? "close" : values.thursdayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `thursdayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("thursdayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="thursdayClose"
                        value={values?.thursdayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.thursdayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                {/* Friday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Friday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values?.fridayClose ? "close" : values.fridayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `fridayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("fridayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values?.fridayClose ? "close" : values.fridayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `fridayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("fridayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="fridayClose"
                        value={values?.fridayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.fridayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                {/* Saturday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Saturday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values?.saturdayClose
                              ? "close"
                              : values.saturdayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `saturdayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("saturdayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values?.saturdayClose ? "close" : values.saturdayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `saturdayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("saturdayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="saturdayClose"
                        value={values?.saturdayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.saturdayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                {/* Sunday  */}
                <div className="row mt-4 align-items-center">
                  <div className="col-lg-5">
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <label className="me-4">Sunday</label>
                      </div>
                      <div className="col-lg-8">
                        <Dropdown className="valid-upopton hours-options">
                          <Dropdown.Toggle
                            variant="success"
                            className="drop-id-veri drop-id-business"
                            id="dropdown-basic"
                          >
                            {values.sundayClose ? "close" : values.sundayStart}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "100%" }}>
                            {hoursOptions?.map((val, index) => (
                              <Dropdown.Item
                                key={index}
                                as="div"
                                onClick={() => {
                                  setFieldValue(
                                    `sundayStart`,
                                    val === "Open 24 Hours"
                                      ? val
                                      : `Open ${val}`
                                  );
                                  setFieldValue("sundayClose", false);
                                }}
                              >
                                {val === "Open 24 Hours" ? val : `Open ${val}`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <label className="me-4">To</label>
                    <Dropdown
                      className="valid-upopton hours-options"
                      style={{ width: "70%" }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        className="drop-id-veri drop-id-business"
                        id="dropdown-basic"
                      >
                        {values?.sundayClose ? "close" : values.sundayEnd}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "100%" }}>
                        {hoursOptions?.map((val, index) => (
                          <Dropdown.Item
                            key={index}
                            as="div"
                            onClick={() => {
                              setFieldValue(
                                `sundayEnd`,
                                val === "Open 24 Hours" ? val : `Close ${val}`
                              );
                              setFieldValue("sundayClose", false);
                            }}
                          >
                            {val === "Open 24 Hours" ? val : `Close ${val}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                      {/* {errors?.businessCategory && (
                      <div className="invalid-feedback">
                        {errors?.businessCategory}
                      </div>
                    )} */}
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        id="close"
                        type="checkbox"
                        className="form-check-input"
                        name="sundayClose"
                        value={values?.sundayClose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.sundayClose}
                      />

                      <label className="register-label" htmlFor="close">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //////////////////////////////////////////////////////////////////////// */}
            {/*///////////////////---- Pament Modes Accepted by You ----//////////////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}
            <div className="row mt-4 gender-chek hours-operation">
              <div className="col-lg-12">
                <label>Pament Modes Accepted by You</label>
              </div>
              <div className="col-lg-12">
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        id="pamenetModes"
                        type="radio"
                        className="form-check-input"
                        name="isPamentModesPublic"
                        value="yes"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.isPamentModesPublic === "yes"}
                      />

                      <label className="register-label" htmlFor="pamenetModes">
                        Show Pament Modes to public
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        id="pamentModeNO"
                        type="radio"
                        className="form-check-input"
                        name="isPamentModesPublic"
                        value="no"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.isPamentModesPublic === "no"}
                      />

                      <label className="register-label" htmlFor="pamentModeNO">
                        Do not show Pament Modes to public
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mt-3 pament-mode-lSt">
                  {/* ////////////////////////////////////////////////////////// */}
                  {/* /////////-------- Payment Modes ROW 1 ----------////////// */}
                  {/* ////////////////////////////////////////////////////////// */}
                  <div className="col-lg-3">
                    <div className="form-check">
                      <input
                        id="cash"
                        type="checkbox"
                        className="form-check-input"
                        name="cash"
                        value={values?.cash}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.cash}
                      />

                      <label className="register-label" htmlFor="cash">
                        Cash
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="debitCards"
                        type="checkbox"
                        className="form-check-input"
                        name="debitCards"
                        value={values?.debitCards}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.debitCards}
                      />

                      <label className="register-label" htmlFor="debitCards">
                        Debit Cards
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="creditCards"
                        type="checkbox"
                        className="form-check-input"
                        name="creditCards"
                        value={values?.creditCards}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.creditCards}
                      />

                      <label className="register-label" htmlFor="creditCards">
                        Credit Cards
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="americonExpressCards"
                        type="checkbox"
                        className="form-check-input"
                        name="americonExpressCards"
                        value={values?.americonExpressCards}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.americonExpressCards}
                      />

                      <label
                        className="register-label"
                        htmlFor="americonExpressCards"
                      >
                        Americon Express Cards
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="checkDD"
                        type="checkbox"
                        className="form-check-input"
                        name="checkDD"
                        value={values?.checkDD}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.checkDD}
                      />

                      <label className="register-label" htmlFor="checkDD">
                        cheque / DD
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="rtgsNeftImps"
                        type="checkbox"
                        className="form-check-input"
                        name="rtgsNeftImps"
                        value={values?.rtgsNeftImps}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.rtgsNeftImps}
                      />

                      <label className="register-label" htmlFor="rtgsNeftImps">
                        RTGS / NEFT / IMPS
                      </label>
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////// */}
                  {/* /////////-------- Payment Modes ROW 2 ----------////////// */}
                  {/* ////////////////////////////////////////////////////////// */}
                  <div className="col-lg-3">
                    <div className="form-check">
                      <input
                        id="upi"
                        type="checkbox"
                        className="form-check-input"
                        name="upi"
                        value={values?.upi}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.upi}
                      />

                      <label className="register-label" htmlFor="upi">
                        UPI
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="gPay"
                        type="checkbox"
                        className="form-check-input"
                        name="gPay"
                        value={values?.gPay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.gPay}
                      />

                      <label className="register-label" htmlFor="gPay">
                        G Pay
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="phonePay"
                        type="checkbox"
                        className="form-check-input"
                        name="phonePay"
                        value={values?.phonePay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.phonePay}
                      />

                      <label className="register-label" htmlFor="phonePay">
                        Phone pe
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="payTm"
                        type="checkbox"
                        className="form-check-input"
                        name="payTm"
                        value={values?.payTm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.payTm}
                      />

                      <label className="register-label" htmlFor="payTm">
                        Paytm
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="amazonPay"
                        type="checkbox"
                        className="form-check-input"
                        name="amazonPay"
                        value={values?.amazonPay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.amazonPay}
                      />

                      <label className="register-label" htmlFor="amazonPay">
                        Amazon Pay
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="credPay"
                        type="checkbox"
                        className="form-check-input"
                        name="credPay"
                        value={values?.credPay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.credPay}
                      />

                      <label className="register-label" htmlFor="credPay">
                        Cred Pay
                      </label>
                    </div>
                  </div>

                  {/* ////////////////////////////////////////////////////////// */}
                  {/* /////////-------- Payment Modes ROW 3 ----------////////// */}
                  {/* ////////////////////////////////////////////////////////// */}
                  <div className="col-lg-3">
                    <div className="form-check">
                      <input
                        id="airtelMoney"
                        type="checkbox"
                        className="form-check-input"
                        name="airtelMoney"
                        value={values?.airtelMoney}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.airtelMoney}
                      />

                      <label className="register-label" htmlFor="airtelMoney">
                        Airtel Money
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="bhimApp"
                        type="checkbox"
                        className="form-check-input"
                        name="bhimApp"
                        value={values?.bhimApp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.bhimApp}
                      />

                      <label className="register-label" htmlFor="bhimApp">
                        BHIM App
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="cashOnDelivery"
                        type="checkbox"
                        className="form-check-input"
                        name="cashOnDelivery"
                        value={values?.cashOnDelivery}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.cashOnDelivery}
                      />

                      <label
                        className="register-label"
                        htmlFor="cashOnDelivery"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="jioPay"
                        type="checkbox"
                        className="form-check-input"
                        name="jioPay"
                        value={values?.jioPay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.jioPay}
                      />

                      <label className="register-label" htmlFor="jioPay">
                        Jio Pay
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="masterCard"
                        type="checkbox"
                        className="form-check-input"
                        name="masterCard"
                        value={values?.masterCard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.masterCard}
                      />

                      <label className="register-label" htmlFor="masterCard">
                        Master Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="visaCard"
                        type="checkbox"
                        className="form-check-input"
                        name="visaCard"
                        value={values?.visaCard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.visaCard}
                      />

                      <label className="register-label" htmlFor="visaCard">
                        Vis Card
                      </label>
                    </div>
                  </div>

                  {/* ////////////////////////////////////////////////////////// */}
                  {/* /////////-------- Payment Modes ROW 4 ----------////////// */}
                  {/* ////////////////////////////////////////////////////////// */}
                  <div className="col-lg-3">
                    <div className="form-check">
                      <input
                        id="rupayCard"
                        type="checkbox"
                        className="form-check-input"
                        name="rupayCard"
                        value={values?.rupayCard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.rupayCard}
                      />

                      <label className="register-label" htmlFor="rupayCard">
                        Rupay Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="moneyOrder"
                        type="checkbox"
                        className="form-check-input"
                        name="moneyOrder"
                        value={values?.moneyOrder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.moneyOrder}
                      />

                      <label className="register-label" htmlFor="moneyOrder">
                        Money Orders
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="travellersCard"
                        type="checkbox"
                        className="form-check-input"
                        name="travellersCard"
                        value={values?.travellersCard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.travellersCard}
                      />

                      <label
                        className="register-label"
                        htmlFor="travellersCard"
                      >
                        Travellers Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="payuMoney"
                        type="checkbox"
                        className="form-check-input"
                        name="payuMoney"
                        value={values?.payuMoney}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.payuMoney}
                      />

                      <label className="register-label" htmlFor="payuMoney">
                        Payumoney
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-s-main position-absolute btn-otp-s-main">
            <button
              type="submit"
              to="/register/upload-profile-photo"
              className={`btn btn-white ${isLoading && "disabled"}`}
            >
              {isLoading ? "Loading" : "Save & Continue"}
              <PulseLoader
                color="rgb(0 40 86 / 80%)"
                loading={isLoading}
                size={6}
                cssOverride={{ width: "37px" }}
              />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default OtherInformation;
