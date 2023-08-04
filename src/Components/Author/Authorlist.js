import { useEffect,useState } from "react";
import { connect ,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchAuthorList,RemoveAuthor,FunctionAddAuthor,FetchAuthorObj,FunctionUpdateAuthor,FunctionAddBook} from "../../Redux/Action";

import Modal from 'react-bootstrap/Modal';
const Authorlist = (props) => {
    const [show, setShow] = useState(false);
    const [book, setBook] = useState(false);
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthorID] = useState('');
    const [id, setID] = useState('');
    const [edit, setEdit] = useState(false);
    const dispatch=useDispatch();
    
    useEffect(() => {
        props.loaduser();
    }, [])
    const handleShow = () =>{
        setShow(true)};
     const handleClose = () =>{
         setShow(false)
         setEdit(false)
         setFname('')
         setLname('')
            } 
    const handleCloseBook = () =>{
        setBook(false)
        setEdit(false)
        setName('')
        setISBN('')
            } 
    const handledelete = (code) => {
        if (window.confirm('Do you want to remove?')) {
                props.removeuser(code);
                props.loaduser();
                toast.success('Author removed successfully.')
        } 
    }
    const addBookOpenModal = (id) => {
        setAuthorID(id)
        setBook(true)
        
    }
    
    const editauthor =(id,fname,lname)=>{
        setFname(fname)
        setLname(lname)
        setID(id)
        setShow(true)
        setEdit(true)
    }
   const authoredit = (e) => {
        e.preventDefault();
        const obj = { first_name, last_name , id };
        dispatch(FunctionUpdateAuthor(obj,id));
        dispatch(FetchAuthorObj(id));
        handleClose()
   }
    const handlesubmit = (e) => {
        e.preventDefault();
        const autherobj = { first_name, last_name };
         dispatch(FunctionAddAuthor(autherobj));
         handleClose()
         
    }
    const handlesubmitBook = (e) => {
         e.preventDefault();
         const bookObj = { name, isbn,author };
          dispatch(FunctionAddBook(bookObj));
         handleCloseBook()
         
    }
    return ( 
       
      props.user.loading ? <div><h2>Loading...</h2></div> :
      props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :
        <div>
            <div className="card">
               <h2>Authors</h2>
                <div className="card-header">
                    <div className="card-header" >
                            <Link className="btn btn-warning" onClick={handleShow} > Add Author [+]</Link>
                        </div>
                </div>
                <div className="card-body">
                <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Daye</td>
                                        <td>Action 1</td>
                                        <td>Action 2</td>
                                        <td>Action 3</td>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.user.authorlist && props.user.authorlist.all_authers.map((item) =>
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.first_name} {item.last_name}</td>
                                                 <td>{item.created_at}</td>
                                                <td><button type="button" className="btn btn-primary" onClick={() => { addBookOpenModal(item.id) }}>Add Book</button></td>
                                                <td><button type="button" className="btn btn-success" onClick={() => { editauthor(item.id,item.first_name,item.last_name) }}>Edit Author </button></td>
                                                <td><button type="button" className="btn btn-danger" onClick={() => { handledelete(item.id) }}>Delete Author</button></td>
                                            </tr>
                                        )
                                    }

                                </tbody>

                            </table>
                </div>
            </div>
           <div>
           <Modal className="modal_room" show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Add Author</Modal.Title>
                  </Modal.Header>
                     <Modal.Body>

                     <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input value={first_name} onChange={e => setFname(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input value={last_name} onChange={e => setLname(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            
                   </div>
                   <br></br>
                     <div className="card-footer" style={{ textAlign: 'left' }}>
                        {!edit && <button className="btn btn-primary" type="submit" onClick={handlesubmit}>Save</button>}
                         {edit &&  <button className="btn btn-secondary" type="submit" onClick={authoredit} >Edit</button> }
                         <button className="btn btn-danger" onClick={handleClose} >Close</button>
                    </div>
                     </Modal.Body>
            </Modal>
           </div>
           <div>
           <Modal className="modal_room" show={book} onHide={handleCloseBook}>
               <Modal.Header closeButton>
                  <Modal.Title>Add Book</Modal.Title>
                  </Modal.Header>
                     <Modal.Body>

                     <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Book Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>ISBN</label>
                                    <input value={isbn} onChange={e => setISBN(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            
                   </div>
                   <br></br>
                     <div className="card-footer" style={{ textAlign: 'left' }}>
                         <button className="btn btn-primary" type="submit" onClick={handlesubmitBook}>Save</button>
                         <button className="btn btn-danger" onClick={handleCloseBook} >Close</button>
                    </div>
                     </Modal.Body>
            </Modal>
           </div>
        </div>

     );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loaduser: () => dispatch(FetchAuthorList()),
        removeuser:(code)=>dispatch(RemoveAuthor(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorlist);