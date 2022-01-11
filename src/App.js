import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Upload from "./assets/upload.png";
import Posts from "./Posts";
import { app, db, storage } from "./Firebase";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [user, setUser] = useState([]);
  const provider = new GoogleAuthProvider();
  const [isUploaded, setIsUploaded] = useState(true);
  const [uploadText, setUploadText] = useState('upload');

  useEffect(() => {
    // const postSnapshot = await getDocs(collection(db, 'posts'));
    // setPosts(postSnapshot.docs.map(doc => doc.data()));
    onSnapshot(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      }
    );
    console.log(posts);
  }, []);

  const uploadImage = (event) => {
    if (event.target.files[0]) {
      console.log(event.target.files[0]);
      setDisplayImage(URL.createObjectURL(event.target.files[0]));
      setUploadText('please wait...')
      uploadBytes(
        ref(storage, `${event.target.files[0].name}`),
        event.target.files[0]
      ).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(ref(storage, `${event.target.files[0].name}`)).then(
          (url) => {
            setImageUploadUrl(url);
            setIsUploaded(false);
            setUploadText('upload');
          }
        );
      });
    }
  };

  const uploadPost = async () => {
    const data = {
      timestamp: Timestamp.now(),
      username: user.displayName,
      caption: caption,
      imageUrl: imageUploadUrl,
      profileURL: user.photoURL
    };
    const postRef = doc(collection(db, "posts"));
    await setDoc(postRef, data);
    setCaption("");
    setDisplayImage(null);
    setIsUploaded(true);
  };

  const signInGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user);
      setUser(result.user);
    });
  };

  return (
    <div className="bg-gray-200 w-full h-full flex flex-col overflow-hidden">
      <Header
        signin={signInGoogle}
        photoUrl={user.photoURL}
        name={user.displayName}
      />
      <div className="flex-grow overflow-y-auto">
        {user.displayName ? (
          <div className="flex mt-6 px-6">
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 bg-white p-5 rounded-md mx-auto">
              <p className="font-semibold mb-4 text-lg">Create a post</p>
              <textarea
                value={caption}
                className="mb-4 w-full focus:outline-none border border-gray-200 p-3 rounded-md"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
                rows="4"
              />
              <figure className="w-32">
                <img src={displayImage} />
              </figure>
              <div className="flex items-center justify-between">
                <label htmlFor="file">
                  <img className="w-10" src={Upload} />
                </label>
                <button
                className="bg-sky-500 text-white px-4 py-2 rounded-lg"
                onClick={uploadPost}
                disabled={isUploaded}
              >
                {uploadText}
              </button>
              </div>
              <input className="hidden" type="file" id="file" onChange={uploadImage} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-8">
            <div className="p-5 bg-white rounded-md flex flex-col">
              <p>Please sign to create a post</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={signInGoogle}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
        {/* <button onClick={uploadImage}>upload image</button> */}
        <div className="flex flex-col px-6">
          {posts.map((post, id) => {
            return (
              <Posts
                key={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                profileUrl={post.profileURL}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
