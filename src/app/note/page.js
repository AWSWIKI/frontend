"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Title from "../../components/Title/Title";
import PostItem from "../../components/PostItem/PostItem";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/navigation"; // Corrected import statement

function NotePage() {
  const [notes, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("haproxy:10001/note")
      .then((response) => response.json())
      .then(setJobs)
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Adjusted to use index for routing
  const handlePostClick = (index) => {
    router.push(`/note/${index}`);
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <Title text="필기 공유" />
            <Link href="/note/upload">
              {" "}
              {/* Corrected the href */}
              <button className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
                글쓰기
              </button>
            </Link>
          </div>
          {notes.map((note) => (
            <PostItem
              key={note.id}
              index={note.index} // Passed index as a prop
              title={note.제목}
              author={note.작성자}
              date={note.날짜}
              content={note.내용}
              image={note.이미지}
              onClick={() => handlePostClick(note.index)} // Modified to pass index
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotePage;
