import { Link } from "react-router-dom";
const Home = () => {
    return ( 
        <div>
            <h2>welcome Library!</h2>
            <Link to={'/author'}>
                 <button type="button" class="btn btn-primary btn-lg btn-block">Authors</button>
            </Link>
           
            <button type="button" class="btn btn-secondary btn-lg btn-block">Books</button>
        </div>
     );
}
 
export default Home;