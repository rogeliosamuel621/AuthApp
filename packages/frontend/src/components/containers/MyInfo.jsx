import React from 'react';
import '../../assets/styles/containers/myInfo.css';

import {
  H2,
  Subtitle,
  PrimaryLink,
  H1,
  DataField,
  ImageField,
  Loader,
} from '../atoms/';

const MyInfo = ({ profilePic, name, phone, email, loader, isFBUser }) => {
  return (
    <main className="MyInfo-main-container">
      <H1 content="Personal info" />
      <section className="MyInfo-section-container">
        <div className="MyInfo-Header">
          <div className="MyInfo-Header-text">
            <H2 content="Profile" />
            <Subtitle content="Some info may be visible to other people" />
          </div>
          {!isFBUser ? (
            <>
              <div className="MyInfo-Header-edit">
                <PrimaryLink content="Edit" url="/edit" />
              </div>
            </>
          ) : null}
        </div>
        <div className="MyInfo-Content">
          {loader ? (
            <Loader />
          ) : (
            <>
              <ImageField profilePic={profilePic} />
              <DataField field="Name" data={name} />
              <DataField field="Phone" data={phone} />
              <DataField field="Email" data={email} />
              <DataField field="Password" data="********" />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyInfo;
