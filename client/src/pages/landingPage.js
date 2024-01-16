import '../App.css';

function LandingPage() {

  async function handleClick() {
    fetch('http://localhost:5000/login')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      window.location.href = data.authUrl;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }


  return (
    <section>
      <div className='w-screen h-screen bg-background'>
        <header className='w-full h-10 border-b border-white'>
        <header className='w-85 h-full flex flex-row justify-between items-center mx-auto'>
          <div className=''>
            <h1 className='text-text text-4xl font-sans font-bold'>
              <span className='text-main'>Spotify</span>Stats
            </h1>
          </div>
          <div className='bg-main p-3 rounded-xl'>
            <h1 className='text-text text-2xl font-sans font-normal' onClick={handleClick}>Sign in with Spotify</h1>
          </div>
        </header>
        </header>
      </div>
    </section>
  );
}

export default LandingPage;