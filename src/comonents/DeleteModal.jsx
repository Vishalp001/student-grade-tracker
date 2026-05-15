import React, { Component } from 'react'

export default class DeleteModal extends Component {
  render() {
    const { selectedStudentId, handleDeleteStudent, closeDeleteModal } =
      this.props
    return (
      <div className='modalOverlay'>
        <div className='modal'>
          <h2>Delete Student</h2>
          <p>
            Are you sure you want to delete this student? This action cannot be
            undone.
          </p>

          <div className='modalActions'>
            <button onClick={closeDeleteModal}>Cancel</button>

            <button
              onClick={() => handleDeleteStudent(selectedStudentId)}
              className='deleteBtn'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
}
