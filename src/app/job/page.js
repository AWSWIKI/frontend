import React from "react";
import Link from "next/link";
import Title from "../../components/Title/Title";
import PostItem from "../../components/PostItem/PostItem";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function JobPage({ jobs }) {
  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <Title text="취업 / 자격증" />
            <Link href="/job/upload">
              <a className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
                글쓰기
              </a>
            </Link>
          </div>
          {jobs.map((job) => (
            <div key={job.id}>
              <PostItem
                title={job.제목}
                author={job.작성자}
                date={job.날짜}
                content={job.내용}
                image={job.이미지}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://haproxy/job");
  const jobs = await res.json();
  return { props: { jobs } };
}

export default JobPage;
