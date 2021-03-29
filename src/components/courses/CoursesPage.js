import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((err) => {
        alert('courses failed' + err);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((err) => {
        alert('authors failed' + err);
      });
    }
  }

  handleDeleteCourse = (course) => {
    toast.success('Course deleted');
    this.props.actions.deleteCourse(course).catch((err) => {
      toast.error('delete failed' + err.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to='/course' />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className='btn btn-primary add-course'
              onClick={() => this.setState({ redirectToAddCoursePage: true })}>
              Add Course
            </button>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourseOptimistic, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// };

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
