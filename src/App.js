import React from 'react'
import './App.css'
import StudentCard from './comonents/StudentCard'
import DeleteModal from './comonents/DeleteModal'
import StudentList from './comonents/StudentList'
import AddStudentForm from './comonents/AddStudentForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleteModalOpen: false,
      isStudentModalOpen: false,

      students: [
        {
          id: 1,
          name: 'John Doe',
          subject: 'Mathematics',
          grade: 92,
          passed: true,
        },
        {
          id: 2,
          name: 'Alice Smith',
          subject: 'Physics',
          grade: 48,
          passed: false,
        },
        {
          id: 3,
          name: 'David Johnson',
          subject: 'Chemistry',
          grade: 76,
          passed: true,
        },
      ],
      newStudent: {
        name: '',
        subject: '',
        grade: '',
      },
      editStudent: {
        id: 0,
        name: '',
        subject: '',
        grade: '',
      },
      searchTerm: '',
      selectedStudentId: 0,
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value,
      },
    })
  }

  handleDeleteStudent = (id) => {
    const remainingStudent = this.state.students.filter(
      (student) => student.id !== id,
    )
    this.setState({
      students: remainingStudent,
      isDeleteModalOpen: false,
    })
  }

  handleSearchInput = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  openDeleteModal = (id) => {
    this.setState({
      isDeleteModalOpen: true,
      selectedStudentId: id,
    })
  }
  closeDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: false,
    })
  }

  handleStudentModal = () => {
    this.setState({
      isStudentModalOpen: !this.state.isStudentModalOpen,
    })
  }

  handleEditInputChange = (e) => {
    const { name, value } = e.target

    this.setState({
      editStudent: {
        ...this.state.editStudent,
        [name]: value,
      },
    })
  }

  openEditMode = (student) => {
    this.setState({
      editingStudentId: student.id,
      editStudent: {
        ...student,
      },
    })
  }
  closeEditMode = () => {
    this.setState({
      editingStudentId: 0,
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()

    const { name, subject, grade } = this.state.newStudent
    if (!name || !subject || !grade) {
      alert('Please fill in all details')
      return
    }

    const gradeNumber = parseInt(grade, 10)
    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert('Please enter the valid grade between 0 to 100')
      return
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      subject: subject,
      grade: gradeNumber,
      passed: gradeNumber >= 60,
    }

    this.setState({
      students: [...this.state.students, newStudent],
      isStudentModalOpen: false,
      newStudent: {
        name: '',
        subject: '',
        grade: '',
      },
    })
  }

  handleOnEditSubmit = (id) => {
    if (
      isNaN(this.state.editStudent.grade) ||
      this.state.editStudent.grade < 0 ||
      this.state.editStudent.grade > 100
    ) {
      alert('Please enter the valid grade between 0 to 100')
      return
    }

    const updatedStudents = this.state.students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          grade: Number(this.state.editStudent.grade),
          passed: Number(this.state.editStudent.grade) >= 60,
        }
      }

      return student
    })

    this.setState({
      students: updatedStudents,
      editingStudentId: null,
      editStudent: {
        id: 0,
        name: '',
        subject: '',
        grade: '',
      },
    })
  }

  renderStudentList(filteredStudents) {
    if (this.state.students?.length === 0) {
      return (
        <div className='noStudents'>
          <p>No students found. Add Student</p>
        </div>
      )
    }

    if (filteredStudents?.length === 0) {
      return (
        <div className='noStudents'>
          <p>No students found.</p>
        </div>
      )
    }

    return filteredStudents?.map((student) => (
      <StudentCard
        key={student.id}
        student={student}
        editStudent={this.state.editStudent}
        editingStudentId={this.state.editingStudentId}
        openEditMode={this.openEditMode}
        closeEditMode={this.closeEditMode}
        handleEditInputChange={this.handleEditInputChange}
        handleOnEditSubmit={this.handleOnEditSubmit}
        openDeleteModal={this.openDeleteModal}
      />
    ))
  }

  render() {
    const filteredStudents = this.state.students?.filter((student) =>
      student.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()),
    )
    return (
      <div className='App'>
        {this.state.isDeleteModalOpen && (
          <DeleteModal
            selectedStudentId={this.state.selectedStudentId}
            handleDeleteStudent={this.handleDeleteStudent}
            closeDeleteModal={this.closeDeleteModal}
            isDeleteModalOpen={this.state.isDeleteModalOpen}
          />
        )}
        <header className='appHeader'>
          <h1>Student Grade Tracker</h1>
          <p>Class component design</p>
        </header>

        <div className='appMain'>
          <StudentList
            searchTerm={this.state.searchTerm}
            filteredStudents={filteredStudents}
            handleSearchInput={this.handleSearchInput}
            handleStudentModal={this.handleStudentModal}
          />
          <div className='studentsGrid'>
            {this.renderStudentList(filteredStudents)}
          </div>

          {this.state.isStudentModalOpen && (
            <AddStudentForm
              newStudent={this.state.newStudent}
              handleOnSubmit={this.handleOnSubmit}
              handleInputChange={this.handleInputChange}
              handleStudentModal={this.handleStudentModal}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
