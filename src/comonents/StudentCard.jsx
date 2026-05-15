import { Component } from 'react'
import { MdDelete } from 'react-icons/md'

export default class StudentCard extends Component {
  render() {
    const { student, openDeleteModal } = this.props
    return (
      <div
        key={student.id}
        className={`studentCard ${student.passed ? 'passed' : 'failed'}`}
      >
        <div className='studentInfo'>
          <div className='studentInfoHeader'>
            <h3>{student.name}</h3>
            <h3
              className='deleteIcon'
              onClick={() => openDeleteModal(student.id)}
            >
              <MdDelete />
            </h3>
          </div>
          <p style={{ textTransform: 'capitalize' }}>
            <strong>Subject: </strong>
            {student.subject}
          </p>
          <p>
            <strong>Grade: </strong>
            {student.grade}%
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
