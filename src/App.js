import React from 'react'
import './App.css'
import { MdDelete } from 'react-icons/md'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        {
          id: 4,
          name: 'Neem Khond',
          subject: 'Chemistry',
          grade: 76,
          passed: true,
        },
        {
          id: 5,
          name: 'Nilesh Prasad',
          subject: 'Chemistry',
          grade: 76,
          passed: true,
        },
        {
          id: 6,
          name: 'Rohit Sahurkar',
          subject: 'Physics',
          grade: 76,
          passed: true,
        },
      ],
      newStudent: {
        name: '',
        subject: '',
        grade: '',
      },
      searchTerm: '',
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
      newStudent: {
        name: '',
        subject: '',
        grade: '',
      },
    })
  }

  handleDeleteStudent = (id) => {
    console.log('id: ', id)

    const remainingStudent = this.state.students.filter(
      (student) => student.id !== id,
    )
    console.log('remainingStudent: ', remainingStudent)
    this.setState({
      students: remainingStudent,
    })
  }

  handleSearchInput = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  renderStudentList() {
    const filteredStudents = this.state.students.filter((student) =>
      student.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()),
    )

    if (filteredStudents.length === 0) {
      return (
        <div className='noStudents'>
          <p>No students found.</p>
        </div>
      )
    }

    return filteredStudents?.map((student) => (
      <div
        key={student.id}
        className={`studentCard ${student.passed ? 'passed' : 'failed'}`}
      >
        <div className='studentInfo'>
          <div className='studentInfoHeader'>
            <h3>{student.name}</h3>
            <h3
              className='deleteIcon'
              onClick={() => this.handleDeleteStudent(student.id)}
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
    ))
  }

  render() {
    return (
      <div className='App'>
        <header className='appHeader'>
          <h1>Student Grade Tracker</h1>
          <p>Class component design</p>
        </header>

        <div className='appMain'>
          <section className='studentSection'>
            <div className='sSHeader'>
              <h2 className='studentList'>
                Student List ( {this.state.students.length})
              </h2>
              <div className='searchContainer'>
                <input
                  type='text'
                  value={this.state.searchTerm}
                  placeholder='Search student...'
                  onChange={this.handleSearchInput}
                />
              </div>
            </div>
            <div className='studentsGrid'>{this.renderStudentList()}</div>
          </section>

          <section className='addStudentSection'>
            <h2>Add New Student</h2>
            <form
              action=''
              onSubmit={this.handleOnSubmit}
              className='addStudentForm'
            >
              <div className='formGroup'>
                <label htmlFor='studentName'>Student Name:</label>
                <input
                  type='text'
                  placeholder='Add student name'
                  value={this.state.newStudent.name}
                  onChange={this.handleInputChange}
                  id='studentName'
                  name='name'
                />
              </div>

              <div className='formGroup'>
                <label htmlFor='studentSubject'>Student Subject</label>
                <select
                  name='subject'
                  id='studentSubject'
                  value={this.state.newStudent.subject}
                  onChange={this.handleInputChange}
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
                  value={this.state.newStudent.grade}
                  onChange={this.handleInputChange}
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

export default App
