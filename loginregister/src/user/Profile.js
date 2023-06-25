import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Apibaseurl from '../Apibaseurl';
const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [username, setUsername] = useState('');
  
  const [birthday, setBirthday] = useState('');


  const[currentpassword,setCurrentPassword]=useState('');
  const[newpassword,setNewPassword]=useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

// edit popup
  const openModal = () => {
    setIsOpen(true);
    setUsername(profileData.user.username);
    setSuccessMessage('')
    
    if (profileData && profileData.user && profileData.user.birthday && profileData.user.birthday !== "0000-00-00") {
      const birthdayValue = new Date(profileData.user.birthday);
      setBirthday(birthdayValue);
    } else {
      const today = new Date();
     
      setBirthday(today);
    }
  };
  const openModal2 = () => {
    setIsOpen2(true);
    setSuccessMessage('')
    setErrorMessage('')
    setCurrentPassword('')
    setNewPassword('')
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeModal2 = () => {
    setIsOpen2(false);
  };
//changepassword
const handleSubmitpassword = async (e) => {
  e.preventDefault();
  
  const data2 = {
    currentPassword: currentpassword,
    newPassword:newpassword
  };

  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const response = await Apibaseurl.post('/user/editpassword', data2, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log('Form data submitted successfully');
      const token = localStorage.getItem('token');

      // Set the Authorization header with the bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await Apibaseurl.get('/user/profile', { headers });
      setProfileData(response.data);
      setSuccessMessage('profile updated successfully');

      // Close the popup after 5 seconds
      setTimeout(() => {
        closeModal2();
      }, 5000);
    } else {
      console.log('Error submitting form data');
    }
  } catch (error) {
    setErrorMessage('old passsword is incorrect');

    console.log('An error occurred:', error);

  }
};
  //edit from
  const handleSubmit = async (e) => {
    e.preventDefault();
    const b = birthday.toISOString().substring(0, 10);
    const data = {
      username: username,
     
      birthday: b,
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      const response = await Apibaseurl.post('/user/edit', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Form data submitted successfully');
        const token = localStorage.getItem('token');

        // Set the Authorization header with the bearer token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await Apibaseurl.get('/user/profile', { headers });
        setProfileData(response.data);
        setSuccessMessage('profile updated successfully');

        // Close the popup after 5 seconds
        setTimeout(() => {
          closeModal();
        }, 5000);
      } else {
        console.log('Error submitting form data');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };
  //get profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Set the Authorization header with the bearer token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make an API request to retrieve the profile data
        const response = await Apibaseurl.get('/user/profile', { headers });

        // Profile data retrieval successful
        console.log('Profile data:', response.data);
        setProfileData(response.data);
      } catch (error) {
        // Token is not valid or API request failed
        console.error('Profile data retrieval failed:', error);

        // Destroy the token and redirect to the login page
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (!profileData) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <>
<div className='align'>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">

            <div className="grid-100 table-grid-100 white-slate  pad10">
              <div className="cf">
                <div className="grid-25 tablet-grid-25 pad-right">
                  <div className="user-profile-pic pr" title="">
                    <img data-src="https://cdn1.desidime.com/avatars/default/large/missing.png" title="" alt="" className=" ls-is-cached lazyloaded" style={{ borderRadius: "50%" }} src="https://cdn1.desidime.com/avatars/default/large/missing.png" />
                    <span className="profile-badge" >
                      <img data-src="https://cdn0.desidime.com/cdn-cgi/image/fit=contain,f=auto,q=90,w=80,h=80/rank/enabled/deal-newbie.png" style={{ width: "50px", height: "50px" }} className=" lazyloaded" title="Deal Newbie" alt="Deal Newbie" src="https://cdn0.desidime.com/cdn-cgi/image/fit=contain,f=auto,q=90,w=80,h=80/rank/enabled/deal-newbie.png" />
                    </span>
                  </div>
                </div>
                <div className="grid-75 tablet-grid-70 gb8 user-page">
                  <div className="cf" style={{border:'none'}}>
                    <div className="h2 owner_name ftl">{profileData.user.username}<br /></div>
                    <a className="offline-user" href="#"><span className="arrow-offline chat-status ftl tbspacing">

                    </span>
                      <span className="last-seen">
                        
                      </span>
                    </a>
                  </div>
                  <div className="gb8 link-clr" id="users_bio">
                  </div>
                  <div className="cf gb8" style={{border:'none'}}id="user-badge-rank">
                    <div className="deal_title vm">
                      Deal Newbie
                    </div>
                  </div>
                  <div className="cf gb8" style={{border:'none'}}>
                    <div className="ftl rpad20">
                      User Since:
                      <span>June 24, 2023</span>
                    </div>
                    <div className="ftl rpad20">
                       Birthday: {profileData.user.birthday && profileData.user.birthday.substring(0, 10)}
                      <span></span>
                    </div>
                  </div>
                  <div className="cf gb8" style={{border:'none'}}>
                    <div className="ftl rpad20">
                      <strong>Dimes:</strong>
                      <span>50</span>
                    </div>
                    <div className="ftl rpad20">
                      <strong>Karma:</strong>
                      <span>20</span><br />
                    </div>
                    <div className="ftl rpad20">
                      <strong>Email:</strong>
                      <span>{profileData.user.email}</span>
                    </div>
                  </div>
                  <span className="ftl rspace10 become_fan_btn_1528459" data-type="std">
                    <a className="btn btn-success btn-sm gtm-become-fan" rel="nofollow" style={{ filter: "grayscale(1)", PointerEvent: "none" }} data-remote="true" href="#">BECOME A FAN</a>
                  </span>
                  <button className="btn btn-info btn-sm ftl rspace10" onClick={openModal}>
        EDIT PROFILE
      </button>
      <button className="btn btn-info btn-sm ftl rspace10" onClick={openModal2}>
        Change password
      </button>


                  <a className="btn btn-info btn-sm ftl rspace10" href="#">KARMA LOG</a>
                  <button className="btn btn-info btn-sm ftl rspace10" onClick={handleLogout}>LOGOUT</button>
                </div>
              </div>
            </div>
            <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
              <div className="">
                
                  <div className="row">
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#d98078" }}>
                            <i className="fa fa-trophy" ></i>
                          </div>

                          <p className="card-text">0 Badges</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#fbca54" }}>
                            <i className="fa fa-user-o" ></i>
                          </div>
                          <p className="card-text">0 Fans</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#f6402d" }}>
                            <i className="fa fa-users" ></i>
                          </div>
                          <p className="card-text">0 Fans Of</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#9ad9d1" }}>
                            <i className="fa fa-television" ></i>
                          </div>
                          <p className="card-text">0 Subscriptions</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#0180b7" }}>
                            <i className="fa fa-tag" ></i>
                          </div>
                          <p className="card-text">0 Coupons</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#ff8a3c" }}>
                            <i className="fa fa-id-card-o" ></i>
                          </div>
                          <p className="card-text">0 Reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#53c0d5" }}>
                            <i className="fa fa-comments" ></i>
                          </div>
                          <p className="card-text">0 post</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#aad450" }}>
                            <i className="fa fa-tasks" ></i>
                          </div>
                          <p className="card-text">0 Topics</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#703a85" }}>
                            <img src='https://cdn2.desidime.com/giveaways/dsk/golddime-profil-icon.png' />
                          </div>
                          <p className="card-text">0 Gold Dimes</p>
                        </div>
                      </div>
                    </div>
                    <div className="w">
                      <div className="card">
                        <div className="card-body">
                          <div className='icon' style={{ background: "#0180b7" }}>
                            <img className='xxx' src='https://cdn0.desidime.com/ddb/Bookmark-profile.png' />
                          </div>
                          <p className="card-text">0 Bookmarks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                
              </div>
            </div>
            <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
                  <div className="row">
<img src='/images/Capture.PNG'/>
<img style={{marginTop:'15px'}} src='/images/Capture2.PNG'/>


                  </div>
                  </div>
                  <div className="cf" style={{margin:"20px 12px"}}>
                  <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
                  <div className="row">
                  <h3 style={{fontSize:'21px', color:'#34313adb'}}>FANS: 0</h3>
                  <p style={{fontSize:'11px'}}>No following</p>
</div>

                  </div>
                  </div>
                  <div className="cf" style={{margin:"20px 12px"}}>
                  <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
                  <div className="row">
                  <h3 style={{fontSize:'21px', color:'#34313adb'}}>FANS OF: 0</h3>
                  <p style={{fontSize:'11px'}}>No following</p>
</div>

                  </div>
                  </div>
                  <div className="cf" style={{margin:"20px 12px"}}>
                  <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
                  <div className="row">
                  <h3 style={{fontSize:'21px', color:'#34313adb'}}>SUBSCRIBED GROUPS: 0</h3>
                  <p style={{fontSize:'11px'}}>No following</p>
</div>

                  </div>
                  </div>
                  <div className="cf" style={{margin:"20px 12px"}}>
                  <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
                  <div className="row">
                  <h3 style={{fontSize:'21px', color:'#34313adb'}}>COUPONS: 0</h3>
                  <p style={{fontSize:'11px'}}>No following</p>
</div>

                  </div>
                  </div> <div className="cf" style={{margin:"20px 12px"}}>
                  <div className="grid-100 table-grid-100 white-slate pt-4 pad10">
                  <div className="row">
                  <h3 style={{fontSize:'21px', color:'#34313adb'}}>REVIEWS: 0</h3>
                  <p style={{fontSize:'11px'}}>No following</p>
</div>

                  </div>
                  </div>
          </div>
          <div className="col-lg-3">
            <aside className="grid-25 grid-parent hide-on-tablet">
<div className="right-side-container">
<h2>{profileData.user.username}'s Favourite Stores</h2>
<div className="well yellow-border cf pdb" id="featured-stores">
<div className="pad10">
No Favourite Stores
</div>
</div>
<div className="ads-300">






</div>
<a className="btn-more gtm-recent-topics-more" href="#">more</a>
<h2>Recent Topics 0</h2>
<div className="well yellow-border cf pdb" id="featured-stores">
<div className="pad10">
No Topics Found
</div>
</div>

<h2>{profileData.user.username}'s Activities</h2>

<div className="well yellow-border cf pdb" id="featured-stores">
<div className="pad10">
No Recent Activities
</div>
</div>

<h2>No Muted topic found</h2>
</div>
</aside>
          </div>
        </div>
      </div>

    
      {isOpen && (
        <div className="modala">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h4 className='text-center'>Edit Profile</h4>

            <form onSubmit={handleSubmit}>
  {successMessage && <p className='sucess'>{successMessage}</p>}
  <div className="form-group">
    <label className="label" htmlFor="username">Username:</label>
    <input
      className="input"
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className="label" htmlFor="birthday">Birthday:</label>
    <DatePicker
      selected={birthday}
      onChange={(date) => setBirthday(date)}
      dateFormat="dd/MM/yyyy"
    />
  </div>
  <div className="button-container">
    <button className="button" type="submit">Submit</button>
  </div>
</form>

          </div>
        </div>
      )}


{isOpen2 && (
        <div className="modala">
          <div className="modal-content">
            <span className="close" onClick={closeModal2}>
              &times;
            </span>
            <h4 className='text-center'>Change Password</h4>

            <form onSubmit={handleSubmitpassword}>
  {successMessage && <p className='sucess'>{successMessage}</p>}
  {errorMessage && <p className='error'>{errorMessage}</p>}
  <div className="form-group">
  <label className="label" htmlFor="currentpassword">Old Password:</label>
        <input
          className="input"
          type="password"
          id="currentpassword"
          value={currentpassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="newpassword">New password:</label>
        <input
          className="input"
          type="password"
          id="newpassword"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        </div>
  <div className="button-container">
    <button className="button" type="submit">Submit</button>
  </div>
</form>

          </div>
        </div>
      )}
      </div>
    </>


  );
};

export default Profile;
