import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import HomePage from './home/HomePage';
import PageNotFound from './PageNotFound';

const App = () => {
  return (
    <div className='container-fluid'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/courses' component={CoursesPage} />
        <Route path='/courses/:slug' component={ManageCoursePage} />
        <Route path='/course' component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
