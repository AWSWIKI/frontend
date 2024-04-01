import React from "react";
import Link from "next/link";
import Title from "../../components/Title/Title";
import PostItem from "../../components/PostItem/PostItem";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function NotePage({ notes }) {
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
              <button className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
                글쓰기
              </button>
            </Link>
          </div>
          {notes.map((note) => (
            <PostItem
              key={note.id}
              index={note.index}
              title={note.제목}
              author={note.작성자}
              date={note.날짜}
              content={note.내용}
              image={note.이미지}
              onClick={() => handlePostClick(note.index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from an external API
  const res = await fetch("http://haproxy/note");
  const notes = await res.json();

  // Pass data to the page via props
  return { props: { notes } };
}

export default NotePage;
