import React, { useState } from 'react';
import CusineVideo from './Cuisine_video.mp4';
import CuisineLogo from './cuisine_logo.webp';


function App() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('Upload Image');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(`📁 ${selectedFile.name}`);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleProceed = async () => {
    if (!file) {
      setResult('Please upload an image before proceeding.');
      return;
    }

    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(`Predicted Cuisine: 🍽️ ${data.predicted_class}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult('Error connecting to the server.');
    }

    setLoading(false);
  };


  return (
    <body className="relative bg-black bg-opacity-70 text-white">

      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
        <source src={CusineVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 px-16">

        <nav className="flex justify-between border-b py-8">
          <ul className="flex gap-x-10 my-auto font-semibold text-xl">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#ai_identify">Upload Image</a></li>
          </ul>
          <div>
            <img src={CuisineLogo} alt='' className="h-20 rounded-xl mx-auto" />
          </div>
          <div className="flex justify-center my-auto">
            <button
              className="bg-red-900 hover:bg-red-800 w-fit h-fit px-10 py-2 font-semibold uppercase hover:rounded-lg hover:shadow-lg transition-all duration-100">
              <a href="#ai_identify">🤖 Let AI Identify!</a>
            </button>
          </div>
        </nav>

        <div id="home" className="text-center h-[80vh] flex flex-col justify-center item-center gap-y-8">
          <h1 className="text-5xl mt-2 font-bold">Cuisine Classifier</h1>
          <p className="text-lg text-gray-300 mt-2">
            Discover the world of flavors with AI-powered food Classification.
            Instantly identify cuisines, explore global dishes, and enhance your culinary knowledge
            with cutting-edge machine learning technology.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-red-700 w-fit px-20 py-2 font-semibold uppercase hover:rounded-lg hover:shadow-lg transition-all duration-100"><a
                href="#ai_identify">Explore</a></button>
          </div>
        </div>

        <div id="about" className="h-screen flex items-center justify-center px-4">
          <div className="bg-white rounded-xl text-black text-center shadow-lg p-12 max-w-8xl w-full mx-auto">
            <h2 className="text-4xl font-bold uppercase text-red-700 mb-6">About Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold text-black">Cuisine Classifier</span>!
              An AI-powered platform that brings the future of food recognition to your fingertips.
              Instantly classify food images with <span className="font-bold">cutting-edge AI</span> and experience
              next-level accuracy in food identification.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left">


              <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg shadow">
                <div
                  className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-Time Predictions</h3>
                  <p className="text-gray-600 text-sm">Get instant results with minimal processing time.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg shadow">
                <div
                  className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold">
                  🌍
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Multi-Cuisine Support</h3>
                  <p className="text-gray-600 text-sm">Recognizes food from various global cuisines.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg shadow">
                <div
                  className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold">
                  🔍
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Advanced AI & Deep Learning</h3>
                  <p className="text-gray-600 text-sm">Powered by state-of-the-art neural networks for reliable
                    results.</p>
                </div>
              </div>

            </div>


            <div className="mt-16">
              <h2 className="text-3xl font-bold text-red-700 mb-6">How It Works</h2>
              <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">

                <div className="flex flex-col items-center text-center w-full md:w-1/4">
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mt-3">Image Upload</h3>
                  <p className="text-gray-600 text-sm">Upload your food image with ease.</p>
                </div>

                <div className="hidden md:block w-16 h-1 bg-red-500"></div>

                <div className="flex flex-col items-center text-center w-full md:w-1/4">
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mt-3">AI Processing</h3>
                  <p className="text-gray-600 text-sm">Smart AI analyzes and enhances data.</p>
                </div>


                <div className="hidden md:block w-16 h-1 bg-red-500"></div>


                <div className="flex flex-col items-center text-center w-full md:w-1/4">
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mt-3">Classification</h3>
                  <p className="text-gray-600 text-sm">Identifies food category instantly.</p>
                </div>

                <div className="hidden md:block w-16 h-1 bg-red-500"></div>


                <div className="flex flex-col items-center text-center w-full md:w-1/4">
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-red-500 text-white rounded-full text-xl font-bold shadow-lg">
                    4
                  </div>
                  <h3 className="text-lg font-semibold mt-3">Results Display</h3>
                  <p className="text-gray-600 text-sm">Get accurate predictions instantly.</p>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div id="ai_identify" className="h-screen flex items-center justify-center px-4">
          <div className="bg-white rounded-xl text-black text-center shadow-lg p-12 max-w-8xl w-full mx-auto space-y-6">
            <h2 className="text-4xl font-bold uppercase text-red-700">🤖 Let AI Identify</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-2">
              Curious about where your food comes from?
              Simply upload an image, and our advanced AI will analyze its unique features
              to determine which country or cuisine it belongs to.
              Discover global flavors with the power of AI!
            </p>
            <label for="uploadFile1"
              className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000" />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000" />
              </svg>
              <span id="fileLabel">Upload Image</span>
              <input type="file" id="uploadFile1" className="hidden" accept="image/*" onChange={handleFileChange} />
              <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG, SVG, WEBP, and GIF are Allowed.</p>
            </label>

            {preview && (
              <div className="mt-4 flex justify-center items-center space-x-4">
                <img src={preview} alt="Preview" className="w-16 h-16 rounded-lg shadow-lg" />
                <p className="text-sm text-gray-400">{fileName}</p>
              </div>
            )}

            {loading && (
                <div className="mt-6 text-gray-300 flex justify-center">Loading....</div>
            )}

            {
              result && (
                <div className="mt-6 text-gray-700 flex justify-center">{result}</div>
              )
            }

            <div id="proceedDiv" className="flex justify-center text-white">
              <button
                onClick={handleProceed}
                id="proceedbtn"
                className="bg-red-800 hover:bg-red-700 w-fit h-fit px-10 py-2 font-semibold uppercase hover:rounded-lg hover:shadow-lg transition-all duration-100">
                Proceed
              </button>
            </div>
          </div>

        </div>
      </div>


    </body>
  )
}

export default App