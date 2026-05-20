import { Component } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'

export default class StudentCard extends Component {
  render() {
    const {
      student,
      openDeleteModal,
      openEditMode,
      closeEditMode,
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
        <Tooltip id='my-tooltip' />

        <div className='studentInfo'>
          <div className='studentInfoHeader'>
            <h3>{student.name}</h3>
            <div className='sIHRight'>
              <h3 title='Edit Grade' className='editIcon'>
                {isEdit ? (
                  <IoClose
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content='Cancel Edit'
                    onClick={closeEditMode}
                    color='red'
                  />
                ) : (
                  <FaUserEdit
                    onClick={() => openEditMode(student)}
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content='Edit Student Grade'
                  />
                )}
              </h3>

              <h3
                data-tooltip-id='my-tooltip'
                data-tooltip-content='Delete Student'
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
          <div className='gradeInput'>
            <strong>Grade: </strong>
            {isEdit ? (
              <div>
                <input
                  type='number'
                  min='0'
                  max='100'
                  name='grade'
                  placeholder='Add Gade'
                  value={editStudent?.grade}
                  onChange={handleEditInputChange}
                />
              </div>
            ) : (
              <>{student.grade}%</>
            )}
            {isEdit && (
              <h3
                data-tooltip-id='my-tooltip'
                data-tooltip-content='Save Grade!'
                onClick={() => handleOnEditSubmit(student.id)}
              >
                <FaCheck fontWeight={'bold'} color='green' />
              </h3>
            )}
          </div>
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
