import React, { Component } from 'react'

export default class StudentList extends Component {
  render() {
    const {
      filteredStudents,
      searchTerm,
      openStudentModal,
      handleSearchInput,
    } = this.props

    return (
      <section className='studentSection'>
        <div className='sSHeader'>
          <h2 className='studentList'>
            Student List ({filteredStudents.length})
          </h2>
          <div className='ssHeaderRight'>
            <div className='searchContainer'>
              <input
                type='text'
                value={searchTerm}
                placeholder='Search student...'
                onChange={handleSearchInput}
              />
            </div>
            <p onClick={openStudentModal} className='addStudentBtn'>
              Add Student
            </p>
          </div>
        </div>
      </section>
    )
  }
}
