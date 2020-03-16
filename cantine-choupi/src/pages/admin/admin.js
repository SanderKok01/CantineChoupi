import React from 'react';
import "./admin_styles.scss";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "dashboard"
    };
  };

  render() {
    return (
      <React.Fragment>
        <nav className="adminpage__nav">
          <ul className="adminpage__nav-list">
            <li className="adminpage__nav-item">Dashboard</li>
          </ul>
        </nav>
        <div className="adminpage">
          
        </div>
      </React.Fragment>
    );
  };
};

export default AdminPage;
