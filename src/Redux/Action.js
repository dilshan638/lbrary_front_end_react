import axios from "axios"
import { toast } from "react-toastify"
import { MAKE_REQUEST,GET_AUTHOR_LIST,FAIL_REQUEST,DELETE_AUTHOR,ADD_AUTHOR,UPDATE_AUTHER,GET_AUTHOR_OBJ,ADD_BOOK,GET_BOOK_LIST,DELETE_BOOK,GET_AUTHOR_DETAILS,UPDATE_BOOK} from "./ActionType"

export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}
export const failRequest=(err)=>{
    return{
        type:FAIL_REQUEST,
        payload:err
    }
}
export const getAuthorList=(data)=>{
    return{
        type:GET_AUTHOR_LIST,
        payload:data
    }
}


export const deleteAuthor=()=>{
    return{
        type:DELETE_AUTHOR
    }
}

export const addAuthor=()=>{
    return{
        type:ADD_AUTHOR
    }
}
export const updateAuther=()=>{
    return{
        type:UPDATE_AUTHER
    }
}
export const getAuthorObj=(data)=>{
    return{
        type:GET_AUTHOR_OBJ,
        payload:data
    }
}

export const FetchAuthorList=()=>{
    return (dispatch)=>{
      dispatch(makeRequest());
        axios.get('http://localhost:3003/authors').then(res=>{
            const authorlist=res.data;
            dispatch(getAuthorList(authorlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
        
    }
}

export const RemoveAuthor=(code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
        axios.delete('http://localhost:3003/author/delete/'+code).then(res=>{
            dispatch(deleteAuthor());
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     
    }
}


export const FunctionAddAuthor=(data)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
        axios.post('http://localhost:3003/author',data).then(res=>{
            dispatch(addAuthor());
            toast.success('Author Added successfully.')
            window.location.reload()
          }).catch(err=>{
            dispatch(failRequest(err.response.data.status))
          })
     }
}

export const FunctionUpdateAuthor=(data,code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
        axios.put('http://localhost:3003/author/'+code,data).then(res=>{
            dispatch(updateAuther());
            toast.success('Author Updated successfully.')
            window.location.reload()
          }).catch(err=>{
            dispatch(failRequest(err.response.data.status))
          })
    
    }
}

export const FetchAuthorObj=(code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
        axios.get('http://localhost:3003/author/'+code).then(res=>{
            const authorlist=res.data;
            dispatch(getAuthorObj(authorlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     }
}


//Book
export const addBook=()=>{
  return{
      type:ADD_BOOK
  }
}

export const getBookList=(data)=>{
  return{
      type:GET_BOOK_LIST,
      payload:data
  }
}

export const deleteBook=()=>{
  return{
      type:DELETE_BOOK
  }
}

export const getAuthorDetails=(data)=>{
  return{
      type:GET_AUTHOR_DETAILS,
      payload:data
  }
}
export const updateBook=()=>{
  return{
      type:UPDATE_BOOK
  }
}

export const FunctionAddBook=(data)=>{
  return (dispatch)=>{
    dispatch(makeRequest());
      axios.post('http://localhost:3003/book',data).then(res=>{
          dispatch(addBook());
          toast.success('Book Added successfully.')
        }).catch(err=>{
          dispatch(failRequest(err.response.data.status))
        })
   }
}

export const FetchBookList=()=>{
  return (dispatch)=>{
    dispatch(makeRequest());
      axios.get('http://localhost:3003/books').then(res=>{
          const booklist=res.data;
          dispatch(getBookList(booklist));
        }).catch(err=>{
          dispatch(failRequest(err.message))
        })
      
  }
}

export const RemoveBook=(code)=>{
  return (dispatch)=>{
    dispatch(makeRequest());
      axios.delete('http://localhost:3003/book/delete/'+code).then(res=>{
          dispatch(deleteBook());
        }).catch(err=>{
          dispatch(failRequest(err.message))
        })
   
  }
}

export const FetchAuthorDetails=(code)=>{
  return (dispatch)=>{
    dispatch(makeRequest());
       axios.get('http://localhost:3003/book/'+code).then(res=>{
          const authordetails=res.data;
          localStorage.setItem('AuthorName',`${authordetails.book.first_name} ${authordetails.book.last_name}`)
          dispatch(getAuthorDetails(authordetails));
        }).catch(err=>{
          dispatch(failRequest(err.message))
        })
   }
}


export const FunctionUpdateBook=(data,code)=>{
  return (dispatch)=>{
    dispatch(makeRequest());
      axios.put('http://localhost:3003/book/'+code,data).then(res=>{
          dispatch(updateBook());
          toast.success('Book Updated successfully.')
          window.location.reload()
        }).catch(err=>{
          dispatch(failRequest(err.response.data.status))
        })
  
  }
}