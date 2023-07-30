import { connect } from "react-redux";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ loggedIn, children }) => {
    if (!loggedIn) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  const mapStateToProps = states => {
    return {
        loggedIn: states.authentication.loggedIn,
    }
}
  export default connect(mapStateToProps)(ProtectedRoute);