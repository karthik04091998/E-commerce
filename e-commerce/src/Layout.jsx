import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const CartLink = () => {
    const { totalQty } = useSelector((state) => state.cart);

    const { userInfo } = useSelector((state) => state.account);

    if (userInfo.userType === "seller") {
        return "";
    }

    return (
        <div>
            <Link to="/cart" className="btn-btn-outline-light fa-2x" style={{ textDecoration: "none", color: "white" }}>
                <i className="fa-solid fa-cart-shopping"></i>&nbsp;({totalQty})
            </Link>
        </div>
    );
};

const Layout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "account_logout" });
        navigate("/login");
    };
    return (
        <div>
            <header className="z-3 bg-dark text-white p-3 mb-4 position-sticky top-0">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        {" "}
                        <h1 className="h3">My E-Commerce App</h1>
                    </Link>
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            style={{ display: "inline-block", width: "auto" }}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        &nbsp; &nbsp;
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
                            Search
                        </button>
                    </form>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CartLink />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i tabIndex={0} className="fa-solid fa-right-from-bracket fa-2x mt-2" onClick={handleLogout} style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
            </header>
            <div style={{ minHeight: "100vh" }}>
                <Outlet />
            </div>
            <footer className="bg-black">Simple Footer</footer>
        </div>
    );
};

export default Layout;