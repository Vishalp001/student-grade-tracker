import { Component } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
export default class StudentCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
    }
  }

  render() {
    const { student, openDeleteModal, handleEditInputChange } = this.props

    const onEditGeade = (student) => {
      this.setState({
        isEdit: !this.state.isEdit,
      })
    }

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
                onClick={() => onEditGeade()}
                title='Edit Grade'
                className='editIcon'
              >
                {this.state.isEdit ? <IoClose color='red' /> : <FaUserEdit />}
              </h3>

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
            {this.state.isEdit ? (
              <input
                type='number'
                // min='0'
                // max='100'
                name='grade'
                placeholder='Add Gade'
                value={student.grade}
                onChange={(e) => handleEditInputChange(e, student.id)}
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
