"use client";
import React from "react";
import Header from "../../../../components/Header/Header";
import Nav from "../../../../components/Nav/Nav";
import Title from "../../../../components/Title/Title"; // Title 컴포넌트 import
import PostForm from "../../../../components/PostForm/PostForm";
import Footer from "../../../../components/Footer/Footer";

function UploadPage() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <Title text="Post" />
          <PostForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UploadPage;
