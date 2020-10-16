import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById,match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Developers
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile[0].user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile[0]} />
              <ProfileAbout profile={profile[0]} />

              <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
              {profile[0].experience.length > 0? (
                <Fragment>
                  {profile[0].experience.map(experience=>(
                    <ProfileExperience key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ): <h4>No experience credentials...</h4> }
          </div>

          <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
              {profile[0].education.length > 0? (
                <Fragment>
                  {profile[0].education.map(education=>(
                    <ProfileEducation key={education._id} education={education} />
                  ))}
                </Fragment>
              ): <h4>No education credentials...</h4> }
          </div>
          {profile[0].githubusername && (
            <ProfileGithub username={profile[0].githubusername} />
          )}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
