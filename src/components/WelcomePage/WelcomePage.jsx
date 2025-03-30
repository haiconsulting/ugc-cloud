import '../SunnyCloudBackground.css';
import '../RainCloudsBackground.css';

<div className="welcome-container">
  {/* Light mode clouds */}
  <div className={`background-clouds ${isDarkMode ? 'hidden' : ''}`}>
    <div className="sunny-clouds-container">
      <div className="sunny-cloud"></div>
      <div className="sunny-cloud"></div>
      <div className="sunny-cloud"></div>
      <div className="sunny-cloud"></div>
      <div className="sun"></div>
    </div>
  </div>
  
  {/* Dark mode clouds */}
  <div className={`background-clouds ${isDarkMode ? '' : 'hidden'}`}>
    <div className="clouds-container">
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
    </div>
    <div className="lightning-container">
      <div className="lightning"></div>
      <div className="lightning"></div>
      <div className="lightning"></div>
    </div>
  </div>
  
  {/* Rest of your welcome page content */}
  <div className="hero-section">
    {/* ... */}
  </div>
  {/* ... */}
</div> 