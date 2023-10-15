import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";

const USContact = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const [showItemDetails, setItemDetails] = React.useState(false);
  const [detailsInfo, setDetailsInfo] = React.useState(null);
  const [allData, setAllData] = React.useState(null);
  const [contactInfo, setContactInfo] = React.useState(allData);
  const [isChecked, setChecked] = React.useState(false);

/*-------------------------------------------------*/
/*             Modal Close functionality           */
/*-------------------------------------------------*/
  const handleClose = () => {
    setShow(false);
    navigate("/problem-2");
  };

/*-------------------------------------------------*/
/*              Fetch Data functionality           */
/*-------------------------------------------------*/
  React.useEffect(() => {
    if (location?.state !== null) {
      fetch("https://contact.mediusware.com/api/contacts/")
        .then((res) => res.json())
        .then((data) => {
          const onlyUSA =
            data?.results &&
            data?.results?.filter(
              (item) => item.country?.name === "United States"
            );
          setAllData(onlyUSA);
        });
      setShow(true);
    }
  }, [location]);

/*-------------------------------------------------*/
/*               Checkbox functionality            */
/*-------------------------------------------------*/
  React.useEffect(() => {
    const filterEvenContact =
      allData && allData?.filter((item) => item.id % 2 === 0);
    const data = isChecked ? filterEvenContact : allData;
    setContactInfo(data);
  }, [isChecked, allData]);

/*-------------------------------------------------*/
/*               Search functionality              */
/*-------------------------------------------------*/
const handleSearch = (event) =>{
  const searchItem = allData && allData?.filter((item) => item.phone.includes(event.target.value));
  setContactInfo(searchItem);
}


/*-------------------------------------------------*/
/*             Single item functionality           */
/*-------------------------------------------------*/
  const handleContactItem = (item) => {
    setShow(false);
    setItemDetails(true);
    setDetailsInfo(item);
  };

  return (
    <div>
      {/* Modal B */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal B</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="search" onChange={handleSearch} placeholder="Search with contact" />
              </Form.Group>
            </Form>
          <div style={{ maxHeight: "400px", overflow: "auto" }}>
            {contactInfo && contactInfo?.length > 0
              ? contactInfo?.map((row, index) => {
                  return (
                    <div
                      onClick={() => handleContactItem(row)}
                      key={index}
                      style={{ paddingBottom: 3, cursor: "pointer" }}
                    >
                      <h2 style={{ fontSize: "20px" }}>Phone : {row?.phone}</h2>
                    </div>
                  );
                })
              : <span style={{textAlign: "center", color: "red"}}>No Data Found</span>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{ display: "flex", justifyContent: "start", width: "100%" }}
          >
            <input
              style={{ marginRight: 5, cursor: "pointer" }}
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              value="yes"
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label style={{ cursor: "pointer" }} htmlFor="myCheckbox">
              Only Even
            </label>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Modal B details */}
      <Modal show={showItemDetails} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h3 style={{ fontSize: "20px" }}>
              Country Name: {detailsInfo ? detailsInfo?.country?.name : null}
            </h3>
            <h3 style={{ fontSize: "18px" }}>
              Contact No: {detailsInfo ? detailsInfo?.phone : null}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default USContact;
