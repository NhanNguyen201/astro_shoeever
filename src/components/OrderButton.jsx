import {useState, useEffect, useRef} from 'react';
import styles from './OrderButton.module.css';

const OrderButton = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const dialogRef = useRef(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [details, setDetails] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const handleCloseModal = () => {
    setModalOpen(false);
    setLoading(false);
    setInputErrors({});
    setOrderMessage("");
    setName("");
    setAddress("");
    setTelephone("");
    setDetails("");
  }
  const handleClick = async () => {
    try {
      setLoading(true)
      setInputErrors({})
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({name, address, telephone, details}),
      });
      if (response.ok) {
        const result = await response.json();
        setOrderMessage(result.message)
      } else {
        const errorResult = await response.json();
        if (errorResult.errors) {
          setInputErrors(errorResult.errors);
        }
      }
    } catch (error) {
      setInputErrors({general: "Something is wrong. Unable to world probably for now."})
    } finally {
      setLoading(false);
      
    }
  }
  const handleBackdropClick = (e) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
  
      // Get the coordinates of the dialog box
      const rect = dialog.getBoundingClientRect();
      
      // Check if the click was outside the rectangle of the dialog content
      const isOutside = (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
  
      if (isOutside) {
        setModalOpen(false);
      }
  };
  useEffect(() => {
      const dialog = dialogRef.current;
      if (isModalOpen) {
        dialog?.showModal();
      } else {
        dialog?.close();
      }
  }, [isModalOpen]);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-white rounded-sm border-2 border-indigo-600 border-solid p-2 mt-4 font-semibold"
      >
        Order Now
      </button>
      <dialog 
        ref={dialogRef} 
        className={styles.orderModal}
        onClick={handleBackdropClick} // Handles backdrop click
        onCancel={handleCloseModal} // Handles 'Esc' key
      >
        <div className="p-4 max-w-lg">
          <h4 className="text-md text-semibold">Order you stunning shoes to welcome your next gorgeus Sunday</h4>
          <p className="mt-2 text-sm">Please fill the form below</p>
          <div className="my-4 flex flex-wrap align-center justify-between ">
            <label>Name:</label>
            <div className="w-7/12 max-md:w-full">
              <input type="text" name="name" className="w-full outline-1 rounded-sm p-1 focus-within:outline-2 focus-within:outline-indigo-600 " value={name} onChange={e => setName(e.target.value)} />
              {inputErrors.name && (<p className="w-full px-2 text-xs text-red-500 ">{inputErrors.name}</p>)}
            </div>
          </div>
          <div className="my-4 flex flex-wrap align-center justify-between">
            <label>Address:</label>
            <div className="w-7/12 max-md:w-full">
              <input type="text" name="address" className="w-full outline-1 rounded-sm p-1 focus-within:outline-2 focus-within:outline-indigo-600 " value={address} onChange={e => setAddress(e.target.value)}/>
              {inputErrors.address && (<p className="w-full px-2 text-xs text-red-500 ">{inputErrors.address}</p>)}
            </div>
            
          </div>
          <div className="my-4 flex flex-wrap align-center justify-between">
            <label>Telephone:</label>
            <div className="w-7/12 max-md:w-full">
              <input type="text" name="telephone" className="w-full outline-1 rounded-sm p-1 focus-within:outline-2 focus-within:outline-indigo-600 "value={telephone} onChange={e => setTelephone(e.target.value)}/>
              {inputErrors.telephone && (<p className="w-full px-2 text-xs text-red-500 ">{inputErrors.telephone}</p>)}
            </div>
            
          </div>
          <div className="my-4 flex flex-wrap align-center justify-between">
            <label>Details:</label>
            <div className="w-7/12 max-md:w-full">
              <textarea placeholder="Some keyword for the design" rows="3" className="resize-none w-full outline-1 rounded-sm p-1 focus-within:outline-2 focus-within:outline-indigo-600 " value={details} onChange={e => setDetails(e.target.value)}/>
              {inputErrors.details && (<p className="w-full px-2 text-xs text-red-500 ">{inputErrors.details}</p>)}
            </div>
            
          </div>
          {inputErrors.general && <div className="px-8 py-2">
            <div className="w-full bg-gray-200 border-solid border-x-4 border-gray-600 text-center p-2 ">
              <p>{inputErrors.general}</p>
            </div>
          </div>}
          {orderMessage && <div className="px-8 py-2">
            <div className="w-full bg-indigo-200 rounded-md border-solid border-x-4 border-indigo-600 text-center p-2 ">
              <p>{orderMessage}</p>
            </div>
          </div>}
          <div className="my-4 flex align-center justify-end">
            <button onClick={handleCloseModal} className="px-4 py-2 mr-2 bg-gray-400 text-white outline-none rounded-sm">
              Close
            </button>
            {!loading ? <button onClick={handleClick} className="px-4 py-2  bg-indigo-600 text-white outline-none rounded-sm">
              Confirm
            </button> : <div className="px-4 py-2  bg-indigo-200 text-white outline-none rounded-sm">Loading...</div>}
          </div>
         
        </div>
      </dialog>
    </>
  ) 
}

export default OrderButton;