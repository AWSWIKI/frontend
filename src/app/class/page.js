// pages/class.js
import React from "react";
import Link from "next/link";
import Title from "../../components/Title/Title";
import ClassPostItem from "../../components/ClassPostItem/ClassPostItem";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function ClassPage({ classPosts }) {
  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="flex justify-between items-center mb-4">
            <Title text="화면 공유" />
            <div>
              {/* 날짜 입력 및 글쓰기 버튼 구현을 위한 부분 */}
              <Link href="/class/upload">
                <a className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
                  글쓰기
                </a>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {classPosts.map((post) => (
              <ClassPostItem
                key={post.id}
                date={post.date}
                images={post.images}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://haproxy/photo");
  const classPosts = await res.json();

  const transformedPosts = classPosts.map((post) => ({
    ...post,
    images: [post["이미지"]],
  }));

  return { props: { classPosts: transformedPosts } };
}

export default ClassPage;
