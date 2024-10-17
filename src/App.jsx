import React, { useState, useRef } from 'react';
import layer from './assets/Layer_1.svg';
import userImg from './assets/userImg.png';
import instaIco from './assets/insta.svg';
import telegramIco from './assets/telegram.svg';
import facebookIco from './assets/facebook.svg';
import githubIco from './assets/gitHub.svg';


function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(userImg);
  const fileInputRef = useRef(null);

  const [linkInput, setLinkInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkSubmit = () => {
    if (activePlatform === 'telegram' && !/^https:\/\/t\.me\/.+/.test(linkInput)) {
      setErrorMessage('Iltimos, to‘g‘ri Telegram linkini kiriting.');
    } else if (activePlatform === 'instagram' && !/^https:\/\/www\.instagram\.com\/.+/.test(linkInput)) {
      setErrorMessage('Iltimos, to‘g‘ri Instagram linkini kiriting.');
    } else if (activePlatform === 'facebook' && !/^https:\/\/www\.facebook\.com\/.+/.test(linkInput)) {
      setErrorMessage('Iltimos, to‘g‘ri Facebook linkini kiriting.');
    } else if (activePlatform === 'github' && !/^https:\/\/github\.com\/.+/.test(linkInput)) {
      setErrorMessage('Iltimos, to‘g‘ri GitHub linkini kiriting.');
    } else {
      setErrorMessage('');
      setIsModalOpen(false);
      console.log(`${activePlatform} link: ${linkInput}`);
    }
  };

  const openModal = (platform) => {
    setActivePlatform(platform);
    setLinkInput('');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  return (
    <div>
      <header className="px-40 py-7 bg-white items-center">
        <nav className="flex justify-between items-center">
          <ul className="flex gap-24">
            <li><a href="#" className="text-gray-700 hover:text-gray-900">Vakansiyalar</a></li>
            <li><a href="#" className="text-gray-700 hover:text-gray-900">Kandidatlar</a></li>
            <li><a href="#" className="text-gray-700 hover:text-gray-900">Kompaniyalar</a></li>
            <li>
              <a href="#">
                <img src={layer} alt="Layer Icon" />
              </a>
            </li>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </ul>
          <button className='bg-blue-700 text-white px-6 py-3 rounded-xl'>Boshlash</button>
        </nav>
      </header>

      <section className='bg-white w-1/3 m-auto mt-12 rounded-3xl p-9'>
        <h2 className='font-medium text-2xl'>Firma ma’lumotlari</h2>
        <p className='text-zinc-400 font-normal text-xs'>We are in so use your best guess</p>
        <div className='flex items-center gap-4 mt-8 font-bold mb-5'>
          <img
            src={selectedImage}
            alt="Company Logo"
            className="w-16 h-16 cursor-pointer bg-contain rounded-full"
            onClick={() => fileInputRef.current.click()}
          />
          <span>Company logo</span>
        </div>
        <form className='flex flex-col'>
          Company name
          <input className='border p-4 rounded-2xl mt-2 mb-5' type="text" placeholder='Name of your company' />
          Contact email
          <input className='border p-4 rounded-2xl mt-2 mb-5' type="email" placeholder='Enter company email' />
          Phone number
          <input id="phone" className="border p-4 rounded-2xl mt-2 mb-5" type="tel" placeholder="UZ +9989" value={`+998${phoneNumber}`} onChange={handleInputChange} />
          Links
          <div className='flex gap-2 mt-2 mb-5'>
            <a href="#" onClick={() => openModal('instagram')}><img src={instaIco} alt="Instagram" /></a>
            <a href="#" onClick={() => openModal('telegram')}><img src={telegramIco} alt="Telegram" /></a>
            <a href="#" onClick={() => openModal('facebook')}><img src={facebookIco} alt="Facebook" /></a>
            <a href="#" onClick={() => openModal('github')}><img src={githubIco} alt="GitHub" /></a>
          </div>
          <div className='flex gap-5 w-full'>
            <div className='flex flex-col w-1/2'>
              Country
              <select className='border p-4  rounded-2xl mt-2 text-zinc-500'>
                <option value="1">Your country</option>
                <option value="2">Option 2</option>
              </select>
            </div>
            <div className='flex flex-col w-1/2'>
              City
              <select className='border p-4 rounded-2xl mt-2 mb-4 text-zinc-500'>
                <option value="1">Your city</option>
                <option value="2">Option 2</option>
              </select>
            </div>
          </div>
          Description
          <input className='border p-4 rounded-2xl mt-2 mb-5' type="text" placeholder='Describe your top skills, experiences and interests' />
          <div className='flex justify-between'>
            <button className='py-4 px-12 rounded-2xl bg-gray-100 hover:bg-blue-700 hover:text-white'>previuos</button>
            <button className='py-4 px-12 rounded-2xl bg-gray-100 hover:bg-blue-700 hover:text-white'>NEXT STEP</button>
          </div>
        </form>

      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Enter {activePlatform} link</h2>
            <input
              className="border p-2 w-full mb-4"
              type="url"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder={`Enter ${activePlatform} link`}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleLinkSubmit}>Submit</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
