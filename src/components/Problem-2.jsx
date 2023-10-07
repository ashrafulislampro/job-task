import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

const Problem2 = () => {
const [eventNumber, setEventNum] = React.useState(
    {
        num: 2,
        isShow: false
    }
);
const [modalA, setModalA] = React.useState(null);
const [modalACrtInfo, setModalACountryInfo] = React.useState(null);
const [singleContact, setSingleContact] = React.useState(null);

const handleCheckBox = () =>{
    setEventNum({
        num:eventNumber.num + 2,
        isShow: !eventNumber?.isShow
    });
}


React.useEffect(()=>{
    if(modalA){
        fetch("https://contact.mediusware.com/api/contacts/").then((res)=> res.json()).then((data)=> setModalACountryInfo(data?.results))
    }
},[modalA]);


const handleContact = (item)=>{
    setSingleContact(item);
}

console.log("singleContact",singleContact)

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalB">
            US Contacts
          </button>
        </div>
      </div>

      

{/* <!-- Modal A--> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" data-bs-toggle="modal" id="exampleModalLabel">Modal A</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      
        <button type="button" data-bs-target="exampleModalAdetails" onClick={()=> setModalA("A")} className="btn btn-lg btn-outline-primary" style={{color: "#46139f", marginRight: 5}}>Modal A</button>
        <button type="button" className="btn btn-lg btn-outline-warning" style={{color: "#ff7f50", marginRight: 5}}>Modal B</button>
        <button type="button" className="btn btn-lg" data-bs-dismiss="modal" style={{borderColor: "#46139f", background: "white"}}>Close</button>
      </div>
      {modalACrtInfo && !singleContact && modalACrtInfo?.length ? modalACrtInfo?.map((item, index)=>{
            return(
            <div style={{padding: 10, textAlign: "center", cursor: "pointer",}} onClick={()=> handleContact(item)} key={index}>
                Contact: {item?.phone}
            </div>)
        }) : null}
        {singleContact ? 
        <div style={{padding: 10, textAlign: "center"}}>
            <h2>Single Contact Details</h2>
            <p>Country: {singleContact?.country?.name}</p>
            <p>contact: {singleContact?.phone}</p>
        </div> : null}
      <div className="modal-footer">
        <div className='d-flex m-auto'>
        <input onClick={handleCheckBox} type="checkbox" name="only_even" id="even" />
        {eventNumber?.isShow ? <p style={{padding: 5}}>{eventNumber?.num}</p> : null}
        </div>
   
      </div>
    </div>
  </div>
</div>

{/* Modal B */}
<div className="modal fade" id="exampleModalB" tabIndex="-1" aria-labelledby="exampleModalLabelB" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" data-bs-toggle="modal" id="exampleModalLabel">Modal B</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      
        <button type="button" data-bs-target="exampleModalAdetails" onClick={()=> setModalA("A")} className="btn btn-lg btn-outline-primary" style={{color: "#46139f", marginRight: 5}}>Modal A</button>
        <button type="button" onClick={()=> setModalA("B")} className="btn btn-lg btn-outline-warning" style={{color: "#ff7f50", marginRight: 5}}>Modal B</button>
        <button type="button" className="btn btn-lg" data-bs-dismiss="modal" style={{borderColor: "#46139f", background: "white"}}>Close</button>
      </div>
      {modalACrtInfo && !singleContact && modalACrtInfo?.length ? modalACrtInfo.slice(0, 4)?.map((item, index)=>{
            return(
            <div style={{padding: 10, textAlign: "center", cursor: "pointer",}} onClick={()=> handleContact(item)} key={index}>
                Contact: {item?.phone}
            </div>)
        }) : null}
        {singleContact ? 
        <div style={{padding: 10, textAlign: "center"}}>
            <h2>Single Contact Details</h2>
            <p>Country: {singleContact?.country?.name}</p>
            <p>contact: {singleContact?.phone}</p>
        </div> : null}
      <div className="modal-footer">
        <div className='d-flex m-auto'>
        <input onClick={handleCheckBox} type="checkbox" name="only_even" id="even" />
        {eventNumber?.isShow ? <p style={{padding: 5}}>{eventNumber?.num}</p> : null}
        </div>
   
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default Problem2;
