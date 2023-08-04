import { useEffect,useState } from "react";
import { connect ,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {FetchBookList,RemoveBook,FetchAuthorDetails,FunctionUpdateBook} from "../../Redux/Action";
import Modal from 'react-bootstrap/Modal';
const Booklist = (props) => {
    const [show, setShow] = useState(false);
    const [book, setBook] = useState(false);
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [id, setID] = useState('');
    const [author, setAuthor] = useState('');
    const dispatch=useDispatch();

    useEffect(() => {
        props.loaduser();
    }, [])

    const handleClose = () =>{
        setShow(false)
        setName('')
        setISBN('')
        setAuthor('')
        setID('')
       
           } 
    const handleCloseEdit = () =>{
        setBook(false)
        setName('')
   
        } 
    const handledelete = (code) => {
        if (window.confirm('Do you want to remove?')) {
                props.removebook(code);
                props.loaduser();
                toast.success('Book removed successfully.')
        } 
    }
    const viewMore = (id,name,isbn)=>{
        dispatch(FetchAuthorDetails(id))
        setName(name)
        setISBN(isbn)
        setShow(true)
        setAuthor(localStorage.getItem("AuthorName"))
       
    }
    const openEditModal =(id,name)=>{
        setName(name)
        setBook(true)
        setID(id)
       
    }
    const bookEdit = (e) => {
        e.preventDefault();
         const obj = { name , id };
         dispatch(FunctionUpdateBook(obj,id));
         handleCloseEdit()
   }
    return ( 
        <div>
             <div className="card">
               <h2>Books</h2>
                <div className="card-header">
                 <div className="card-header" >
                            <Link className="btn btn-success btn-dashoard"  to={'/'} >Back To Dashboard</Link>
                         </div>
                </div>
                <div className="card-body">
                <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>ISBN</td>
                                        <td>Date</td>
                                        <td>Action 1</td>
                                        <td>Action 2</td>
                                        <td>Action 3</td>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        props.user.booklist && props.user.booklist.books.map((item) =>
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name} </td>
                                                <td>{item.isbn} </td>
                                                 <td>{item.created_at}</td>
                                                 <td><button type="button" className="btn btn-primary" onClick={() => { viewMore(item.id,item.name,item.isbn) }}>View More</button></td>
                                                <td><button type="button" className="btn btn-success" onClick={() => { openEditModal(item.id,item.name) }}>Edit Book </button></td>
                                                <td><button type="button" className="btn btn-danger" onClick={() => { handledelete(item.id) }}>Delete Book</button></td>
                                       
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
                  <Modal.Title>Book Details</Modal.Title>
                  </Modal.Header>
                     <Modal.Body>

                     <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                <label>Author Name  :{author}</label>
                                   
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                <label>Book Name    :{name}</label>
                                   
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                <label>ISBN :{isbn}</label>
                                   
                                </div>
                            </div>
                           
                            
                   </div>
                   <br></br>
                     <div className="card-footer" style={{ textAlign: 'left' }}>
                         <button className="btn btn-danger" onClick={handleClose} >Close</button>
                    </div>
                     </Modal.Body>
            </Modal>
           </div>

           <div>
           <Modal className="modal_room" show={book} onHide={handleCloseEdit}>
               <Modal.Header closeButton>
                  <Modal.Title>Edit Book Name</Modal.Title>
                  </Modal.Header>
                     <Modal.Body>

                     <div className="row">
                            
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Book Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                                
                   </div>
                   <br></br>
                     <div className="card-footer" style={{ textAlign: 'left' }}>
                     <button className="btn btn-secondary" type="submit" onClick={bookEdit}   >Edit</button>
                         <button className="btn btn-danger" onClick={handleCloseEdit} >Close</button>
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
        loaduser: () => dispatch(FetchBookList()),
        removebook:(code)=>dispatch(RemoveBook(code)),
       
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booklist);