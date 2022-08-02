import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { products } from "@/data";
import MenuContextProvider from "@/context/menu-context";
import SearchContextProvider from "@/context/search-context";
import HeaderTwo from "@/components/header-two";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "@/components/layout";
import PageBanner from "@/components/page-banner";


//http://localhost:3000/product?name=mbc
export default function product() {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Specification");

  useEffect(() => {
    setData(products[name]);
  }, [name]);

  const specification = (valueObject) => {
    return (
      <div className={"container"}>
        {Object.keys(valueObject || {}).map((value) => {
          return (
            <div className="row">
              <div className="col-md">{value}</div>
              <span></span>
              <div className="col-md">{valueObject[value]}</div>{" "}
            </div>
          );
        })}
      </div>
    );
  };

  const featuresList = (values) => {
    return (
      <ul className="list-group">
        {values.map((valueEach) => {
          return <li className="list-group-item">{valueEach}</li>;
        })}
      </ul>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Specification":
        return specification(data?.specs?.value);
      case "Material":
        return specification(data?.material?.values);
      case "Features":
        return featuresList(data?.features);
    }
  };

  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle={name}>
          <HeaderTwo />
          <PageBanner title={data?.name?.toUpperCase()} name="Dumb Bodies" img={data?.imgSrc}/>
          <Container>
            <Row>
              <Col lg={12}>
                <div>
                  <p>{data?.desc1}</p>
                  <p>{data?.desc2}</p>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <div id={"tab-container"}>
              <ul
                className="nav nav-tabs nav-fill mb-3"
                id="ex1"
                role="tablist"
              >
                {["Specification", "Features", "Material"].map((value) => {
                  const activeClass = activeTab === value ? "active" : "";
                  return (
                    <li className="nav-item" role="presentation" key={value}>
                      <a
                        className={`nav-link ${activeClass}`}
                        id="ex2-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex2-tabs-1"
                        aria-selected="true"
                        onClick={() => setActiveTab(value)}
                      >
                        {value}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div id={"tab-data"}>{renderTabContent()}</div>
            </div>
          </Container>
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
}
