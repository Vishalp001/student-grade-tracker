import { Component } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
export default class StudentCard extends Component {
  render() {
    const {
      student,
      openDeleteModal,
      openEditMode,
      handleEditInputChange,
      editStudent,
      handleOnEditSubmit,
      editingStudentId,
    } = this.props

    const isEdit = editingStudentId === student.id

    return (
      <div
        key={student.id}
        className={`studentCard ${student.passed ? 'passed' : 'failed'}`}
      >
        <div className='studentInfo'>
          <div className='studentInfoHeader'>
            <h3>{student.name}</h3>
            <div className='sIHRight'>
              <h3
                onClick={() => openEditMode(student)}
                title='Edit Grade'
                className='editIcon'
              >
                {isEdit ? <IoClose color='red' /> : <FaUserEdit />}
              </h3>
              {isEdit && (
                <button onClick={() => handleOnEditSubmit(student.id)}>
                  Save
                </button>
              )}

              <h3
                title='Delete Student'
                className='deleteIcon'
                onClick={() => openDeleteModal(student.id)}
              >
                <MdDelete />
              </h3>
            </div>
          </div>
          <p style={{ textTransform: 'capitalize' }}>
            <strong>Subject: </strong>
            {student.subject}
          </p>
          <p className='gradeInput'>
            <strong>Grade: </strong>
            {isEdit ? (
              <input
                type='number'
                min='0'
                max='100'
                name='grade'
                placeholder='Add Gade'
                value={editStudent?.grade}
                onChange={handleEditInputChange}
              />
            ) : (
              <>{student.grade}%</>
            )}
          </p>
        </div>
        <div className='studentStatus'>
          <span
            className={`status ${student.passed ? 'statusPassed' : 'statusFailed'}`}
          >
            {student.passed ? 'PASSED' : 'FAILED'}
          </span>
        </div>
      </div>
    )
  }
}
