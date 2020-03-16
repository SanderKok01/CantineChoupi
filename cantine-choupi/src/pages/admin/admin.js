import React from 'react';
import "./admin_styles.scss";
import ErrorPage from '../errors/error';
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { GoListUnordered } from 'react-icons/go';
import Dashboard from './dashboard/dashboard';
import Orders from './orders/orders';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.changeView = this.changeView.bind(this);

    this.state = {
      view: "Dashboard"
    };
  };

  changeView(event) {
    const valView = event.target.textContent;

    this.setState({
      view: valView
    });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.hasError ? ( <ErrorPage code="404" /> ) : (
            <React.Fragment>
              <nav className="adminpage__nav">
                <ul className="adminpage__nav-list">
                  <li className="adminpage__nav-item" onClick={ this.changeView }>
                    <MdDashboard className="adminpage__nav-icon" />
                    <span>Dashboard</span>
                  </li>
                  <li className="adminpage__nav-item" onClick={ this.changeView }>
                    <GoListUnordered className="adminpage__nav-icon" />
                    <span>Orders</span>
                  </li>
                </ul>
                <span className="adminpage__nav-sign-out">Logout <FiLogOut className="adminpage__nav-sign-out-icon" /></span>
              </nav>
              <div className="adminpage">
                <div className="adminpage-body">
                  <div className="adminpage-body__inner">
                  {
                      this.state.view === "Dashboard" ? (
                        <Dashboard />
                      ) : this.state.view === "Orders" ? (
                        <Orders />
                      ) : (
                        this.setState({ hasError: true })
                      )
                    }
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  };
};

export default AdminPage;
