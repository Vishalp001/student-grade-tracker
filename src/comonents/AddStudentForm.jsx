import React, { Component } from 'react'
import { IoClose } from 'react-icons/io5'
export default class AddStudentForm extends Component {
  render() {
    const {
      newStudent,
      handleInputChange,
      handleStudentModal,
      handleOnSubmit,
    } = this.props

    return (
      <div className='modalOverlay'>
        <div className='modal'>
          <section className='addStudentSection'>
            <h2>Add New Student</h2>
            <h2 onClick={handleStudentModal} className='closeIcon'>
              <IoClose />
            </h2>
            <form
              action=''
              onSubmit={handleOnSubmit}
              className='addStudentForm'
            >
              <div className='formGroup'>
                <label htmlFor='studentName'>Student Name:</label>
                <input
                  type='text'
                  placeholder='Add student name'
                  value={newStudent.name}
                  onChange={handleInputChange}
                  id='studentName'
                  name='name'
                />
              </div>

              <div className='formGroup'>
                <label htmlFor='studentSubject'>Student Subject</label>
                <select
                  name='subject'
                  id='studentSubject'
                  value={newStudent.subject}
                  onChange={handleInputChange}
                >
                  <option value=''>Slect a Subject</option>
                  <option value='mathematics'>Mathematics</option>
                  <option value='physics'>Physics</option>
                  <option value='chemistry'>Chemistry</option>
                  <option value='biology'>Biology</option>
                  <option value='history'>History</option>
                  <option value='english'>English</option>
                </select>
              </div>

              <div className='formGroup'>
                <label htmlFor='grade'>Grade (0 - 100)</label>
                <input
                  type='number'
                  min='0'
                  max='100'
                  name='grade'
                  placeholder='Enter student grade'
                  value={newStudent.grade}
                  onChange={handleInputChange}
                />
              </div>

              <button type='submit' className='submitBtn'>
                Submit
              </button>
            </form>
          </section>
        </div>
      </div>
    )
  }
}
