import React, { Component } from 'react'
import { IoClose } from 'react-icons/io5'
import { Tooltip } from 'react-tooltip'

export default class StudentList extends Component {
  render() {
    const {
      filteredStudents,
      searchTerm,
      searchSubject,
      handleStudentModal,
      handleSearchInput,
      handleSubjectSearch,
      handleClearSearch,
      handleFilterChange,
      filterStatus,
    } = this.props

    const subjectsList = [
      'mathematics',
      'physics',
      'chemistry',
      'biology',
      'history',
      'english',
    ]

    return (
      <section className='studentSection'>
        <Tooltip id='my-tooltip' />

        <div className='sSHeader'>
          <h2 className='studentList'>
            Student List ({filteredStudents.length})
          </h2>
          <div className='ssHeaderRight'>
            <div className='filterButtons'>
              <label htmlFor='statusFilter'>Filter by Status:</label>
              <button
                className={filterStatus === 'all' ? 'activeFilter' : ''}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button
                className={filterStatus === 'passed' ? 'activeFilter' : ''}
                onClick={() => handleFilterChange('passed')}
              >
                Passed
              </button>
              <button
                className={filterStatus === 'failed' ? 'activeFilter' : ''}
                onClick={() => handleFilterChange('failed')}
              >
                Failed
              </button>
            </div>
            <div className='selectContainer'>
              <select
                name='subject'
                id='studentSubject'
                value={searchSubject}
                onChange={(e) => handleSubjectSearch(e)}
              >
                <option value=''>All Subjects</option>
                {subjectsList.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject.slice(0, 1).toLocaleUpperCase() + subject.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className='searchContainer'>
              <input
                type='text'
                value={searchTerm}
                placeholder='Search student...'
                onChange={handleSearchInput}
              />
              {searchTerm.length > 0 && (
                <IoClose
                  onClick={handleClearSearch}
                  color='#667eea'
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='Clear Search'
                />
              )}
            </div>
            <button onClick={handleStudentModal} className='addStudentBtn'>
              Add Student
            </button>
          </div>
        </div>
      </section>
    )
  }
}
