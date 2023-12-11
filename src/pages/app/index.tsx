"use client";
import React from "react";
import Layout from "./layout";

type Props = {};

function Application({}: Props) {
  return (
    <Layout>
      <div style={{ backgroundColor: "#f7f7f7", height: "100%" }}>
        <h1>Application</h1>
      </div>
    </Layout>
  );
}

export default Application;
