import { Link  } from "react-router-dom";
export default function BreadCrumbs({ currentPage }){
    return(
          <div className="breadcrumbs">
                    <div className="container">
                        <div className="row">
                                <p className="bread">
                                    <span>
                                        <Link to="/">Home</Link>
                                    </span>
                                    {" / "}
                                    <span>{currentPage}</span>
                                </p>
                        </div>
                    </div>
                </div>
    );
}