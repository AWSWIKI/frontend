"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Nav from "../../../components/Nav/Nav";
import Footer from "../../../components/Footer/Footer";
import PostItem from "../../../components/PostItem/PostFullItem";

function NoteDetail() {
  const [post, setPosts] = useState([]);

  const path = usePathname();
  console.log(path);
  useEffect(() => {
    fetch(`http://haproxy/${path}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="bg-white p-5 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            {/* Title with more emphasis */}
            <h1 className="text-2xl font-bold text-teal-600 mb-2">
              {post.제목}
            </h1>

            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-gray-500">
                {new Date(post.날짜).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {post.작성자}
              </p>
            </div>

            <p className="mb-6 text-gray-700 text-lg">{post.내용}</p>

            {post.이미지 && (
              <img
                src={post.이미지}
                alt="Job Detail"
                className="w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NoteDetail;
