import "./globals.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Title from "../components/Title/Title";
import ClassPostItem from "../components/ClassPostItem/ClassPostItem";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router"; // 수정된 import 문

function ClassPage({ initialClassPosts }) {
  const [classPosts, setClassPosts] = useState(initialClassPosts);
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();

  const fetchPhotosByDate = (date) => {
    const formattedDate = date.replaceAll("/", "-");
    fetch(`http://haproxy/photo/date/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setClassPosts(
          data.map((item) => ({
            ...item,
            images: [item["이미지"]],
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetch("http://haproxy/photo")
      .then((response) => response.json())
      .then((data) => {
        setClassPosts(
          data.map((item) => ({
            ...item,
            images: [item["이미지"]],
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchPhotosByDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="m-4">
          <div className="flex justify-between items-center mb-4">
            <Title text="화면 공유" />
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
              />
              <Link href="/class/upload">
                <button className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
                  글쓰기
                </button>
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
  // Fetch data from an external API
  const res = await fetch("http://haproxy/photo");
  const initialClassPosts = await res.json();

  // Return props
  return { props: { initialClassPosts } };
}

export default ClassPage;
