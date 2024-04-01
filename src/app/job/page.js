"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Title from "../../components/Title/Title";
import PostItem from "../../components/PostItem/PostItem";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/navigation"; // Corrected import statement

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://haproxy:10001/job")
      .then((response) => response.json())
      .then(setJobs)
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Adjusted to use index for routing
  const handlePostClick = (index) => {
    router.push(`/job/${index}`);
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <Title text="취업 / 자격증" />
            <Link href="/job/upload">
              {" "}
              <button className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
                글쓰기
              </button>
            </Link>
          </div>
          {jobs.map((job) => (
            <PostItem
              key={job.id}
              index={job.index}
              title={job.제목}
              author={job.작성자}
              date={job.날짜}
              content={job.내용}
              image={job.이미지}
              onClick={() => handlePostClick(job.index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JobPage;
