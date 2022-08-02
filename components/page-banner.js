import React from "react";

const PageBanner = ({ title, name, img='../images/bg/8.jpg' }) => {
  return (
    <section className="pageBanner" style={{backgroundImage: `url(${img})`}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner_content text-center" >
              <h4>
                <a href="/">home</a> - {name}
              </h4>
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
