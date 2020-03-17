import React from 'react';
import "./table_styles.scss";
import { MdDone, MdClose } from 'react-icons/md';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.openEditModal = this.openEditModal.bind(this);

    this.state = {
      editModalShown: false
    };
  };

  openEditModal(data) {
    console.log(data);
  };

  render() {
    if (!this.props.type) {
      throw new Error("Type expected for <Table />.")
    };

    if (this.props.type === "order") {
      return (
        <React.Fragment>
          <table className="table">
            <thead className="table__thead">
              {
                this.props.headers.map(val => {
                  return (
                    <th className="table__th">{ val }</th>
                  );
                })
              }
              <th className="table__th table__th--option"><FiEdit2 className="table__icon" /></th>
              <th className="table__th table__th--option"><FiTrash2 className="table__icon" /></th>
              <th className="table__th table__th--option"><MdDone className="table__icon" /></th>
            </thead>
            <tbody>
              {
                this.props.data.map((dat, index) => {
                  return (
                    <React.Fragment>
                      <tr className="table__tr">
                        {
                          this.props.values.map((val, index2) => {
                            return (
                              <td className="table__td">
                                {
                                  dat[val] ? (
                                    val === "paid" ? (
                                      dat[val] === 0 ? (
                                        <span className="table__paid-not">Niet betaald <MdClose className="table__icon" /></span>
                                      ) : (
                                        <span className="table__paid">Betaald <MdDone className="table__icon" /></span>
                                      )
                                    ) : (
                                      dat[val]
                                    )
                                  ) : (
                                    val === "paid" ? (
                                      dat[val] === 0 ? (
                                        <span className="table__paid-not">Niet betaald <MdClose className="table__icon" /></span>
                                      ) : (
                                        <span className="table__paid">Betaald <MdDone className="table__icon" /></span>
                                      )
                                    ) : (
                                      <span className="table__null">NULL</span>
                                    )
                                  )
                                }
                              </td>
                            )
                          })
                        }
                        <td className="table__td--option"><FiEdit2 className="table__icon table__icon--option" onClick={ () => { this.openEditModal(dat) } } /></td>
                        <td className="table__td--option"><FiTrash2 className="table__icon table__icon--option" /></td>
                        <td className="table__td--option"><MdDone className="table__icon table__icon--option" /></td>
                      </tr>
                    </React.Fragment>
                  )
                })
              }
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  };
};

export default Table;
