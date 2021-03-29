import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import newCourse from '../../../tools/mockData';

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, ...props }) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((err) => {
        alert('courses failed' + err);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => {
        alert('authors failed' + err);
      });
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  return (
    <CourseForm
      course={course}
      onChange={handleChange}
      errors={errors}
      authors={authors}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
// const mapDispatchToProps = {
//   loadCourses: courseActions.loadCourses,
//   loadAuthors: authorActions.loadAuthors
// };

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// };

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(ManageCoursePage);
