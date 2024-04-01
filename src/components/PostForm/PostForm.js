import React, { useState } from "react";
import { useRouter } from "next/navigation";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter(); // 주의: 'next/router'를 정확히 사용하세요.

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("images", file);
    }

    let endpoint;
    let reqKey = "";
    switch (category) {
      case "screenShare":
        endpoint = "http://192.168.56.101:3000/photo";
        break;
      case "certification":
        endpoint = "http://192.168.56.101:3000/job";
        reqKey = "JobReqInfo";
        break;
      case "notesShare":
        endpoint = "http://192.168.56.101:3000/note";
        reqKey = "NoteReqInfo";
        break;
      default:
        console.error("Invalid category");
        return;
    }

    if (reqKey) {
      const infoData = JSON.stringify({
        제목: title,
        작성자: author,
        내용: content,
      });
      formData.append(
        reqKey,
        new Blob([infoData], { type: "application/json" })
      );
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Server responded with a bad request");
      }
      const data = await response.json();
      console.log("Success:", data);
      setIsSuccess(true);
      setAlert("업로드 성공!");
      switch (category) {
        case "screenShare":
          router.push("/class");
          break;
        case "certification":
          router.push("/job");
          break;
        case "notesShare":
          router.push("/note");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSuccess(false);
      setAlert(`업로드 실패: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-md shadow-xl">
      {alert && (
        <div
          className={`mb-4 p-2 rounded-md ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {alert}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            카테고리
          </label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="screenShare">화면공유</option>
            <option value="certification">자격증/취업</option>
            <option value="notesShare">필기공유</option>
          </select>
        </div>

        {category !== "screenShare" && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="author"
              >
                작성자
              </label>
              <input
                id="author"
                type="text"
                placeholder="작성자 이름을 입력하세요"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="content"
              >
                본문
              </label>
              <textarea
                id="content"
                placeholder="내용을 입력하세요"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file"
              >
                파일 첨부
              </label>
              <input
                id="file"
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </>
        )}

        {category === "screenShare" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="file"
            >
              파일 첨부
            </label>
            <input
              id="file"
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          UPLOAD
        </button>
      </form>
    </div>
  );
}

export default PostForm;
