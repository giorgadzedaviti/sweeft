import React, { useState, useEffect } from "react";
import "./styles.css";
import "./friendStyles.css";

function APIComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [friendPage, setFriendPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currentPage}/10`
      );
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData.list]);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  //Shows user full info
  const handleCardClick = (userId) => {
    if (userId) {
      // If the new window was opened successfully, fetch the API data and display it in the new window
      setLoading(true);

      Promise.all([
        fetch(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
        ),
        fetch(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${currentPage}/100`
        ),
      ])
        .then(([userResponse, friendsResponse]) => {
          if (!userResponse.ok || !friendsResponse.ok) {
            throw new Error("API request failed");
          }
          return Promise.all([userResponse.json(), friendsResponse.json()]);
        })
        .then(([userData, friendsData]) => {
          console.log(friendsData);
          setLoading(false);
          let page = 1;
          const friendListHandlerer = () => {
            const newFriends = data.list.map(
              (friend) => `
                        <div class="friend-container">
                          <img src="${friend.imageUrl}" alt="${friend.name} class='card-image'">
                          <h4 class='title-header'>${friend.prefix} ${friend.name} ${friend.lastName}</h4>
                          <p class='title-text'>${friend.title}</p>
                        </div>
                      `
            );
          };
          document.write(`
            <html>
              <head>
                <title>${userData.name} ${userData.lastName}</title>
              </head>
              <body>

              <style>
                    body {
                      font-family: Arial, sans-serif;
                      font-size: 16px;
                      line-height: 1.4;
                      margin: 0;
                      padding: 0;
                      
                    }

                    .container {
                      display: flex;
                      flex-direction: column;
                      padding-left: 100px;
                      padding-right: 100px;
                    }

                    .info {
                      margin-left: 20px;
                    }

                    h1 {
                      font-size: 24px;
                      margin-bottom: 10px;
                    }

                    img {
                      height: auto;
                      margin-top: 30px;
                      margin-left:50px;
                      height: 200px;
                    }

                    p {
                      margin-bottom: 10px;
                    }
                    .address{
                      margin-left:300px;
                      max-width:200px;
                      margin-top:-300px;
                      font-size:16px;

                    }
                    .user{
                      margin-top:10px;
                      margin-left: -60px;
                    }
                    .nm{
                      margin-bottom:-20px;
                      margin-top:30px
                    }

                    .info{
                    margin-top:10px

                    }
                    .info1{
                    margin-bottom:-25px;
                    // margin-left:10px


                    }
                    .address1{
                    margin-bottom:-25px;
                    margin-top:30px;
                    margin-left:10px

                    }
                    .company{
                    margin-bottom:-15px;
                    margin-top:30px;
                    } 

                    .friends {
                    font-size: 16px;
                    padding: 10px;
                  
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    grid-gap: 100px;

                    }
                    .friend-container{
                      display: flex;
                      justify-content: space-around;
                      align-items: center;
                      flex-direction: column;
                    }
                    .title-header{
                      margin-top: 0px;
                    }
                    .title-text{
                      margin-top: -23px;
                    }

                    .name2 {
                    margin-bottom: 252px; // Remove this line if you want the friends to display side by side
                    }

                    .img2 {
                    height: 200px;
                    margin-left: 10px; // Change the margin to 10px to give some space between friends
                    object-fit: cover;
                    }

                    .title1 {
                    margin-top: 50px;
                    margin-left: 0px; // Add this line to align the title with the friend's name and image
                    }
                    .card-image{
                      object-fit: cover;
                    }
                    .flex-row-cont{
                      display: flex;
                      justify-contet: space-around
                      flex-direction: row;
                    }
                    .img-cont{
                      width: 50%;
                    }
              </style>
              <div class="container">
                    <div class='flex-row-cont'>
                        <div class='img-cont'>
                          <img src="${userData.imageUrl}" alt="${
            userData.name
          }">
                        </div>
                
                      <div class="info">
                        <div class="user">
                          <p class="info1">info</p>
                          <h3 class="nm">${userData.prefix} ${userData.name} ${
            userData.lastName
          }</h3>
                          <p class="title">${userData.title}</P>
                          <p>Email: ${userData.email}</p>
                          <p>Ip Address: ${userData.ip}</p>
                          <p>Job Area: ${userData.jobArea}</p>
                          <p>Job Type: ${userData.jobType}</p>
                          <p>Job Description: ${userData.jobDescriptor}</p>
                      </div>

                      <div class="address">
                        <p class="address1">address</p>
                        <h3 class="company">${userData.company.name}</h1>
                        <p>City: ${userData.address.city}</p>
                        <p>Country: ${userData.address.country}</p>
                        <p>State: ${userData.address.state}</p>
                        <p>Street Address: ${userData.address.streetAddress}</p>
                        <p>ZIP: ${userData.address.zipCode}</p>
                      </div>
                  </div>

              </div>
              <p>Friends:</p>
            
            
              <div class="friends">
                ${friendsData.list
                  .map(
                    (friend) => `
                      <div class="friend-container">
                        <img src="${friend.imageUrl}" alt="${friend.name} class='card-image'">
                        <h4 class='title-header'>${friend.prefix} ${friend.name} ${friend.lastName}</h4>
                        <p class='title-text'>${friend.title}</p>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            
              <div id="loading">Loading...</div>
            </div>
            
            <script>
              const loadingElement = document.getElementById('loading');
              let page = 1;
            
              function loadMore() {
                loadingElement.style.display = 'block';
            
                // simulate loading more data from the server
                setTimeout(() => {
                  fetch('http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/12')
                    .then(response => response.json())
                    .then(data => {
                      const friendContainer = document.querySelector('.friends');
                      ${friendListHandlerer}
                      friendContainer.insertAdjacentHTML('beforeend', newFriends.join(''));
                      ${page++};
                      loadingElement.style.display = 'none';
                    })
                    .catch(error => {
                      console.error(error);
                      loadingElement.innerHTML = 'Error loading more friends.';
                    });
                }, 1000);
              }
            
              window.addEventListener('scroll', () => {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 5) {
                  loadMore();
                }
              });
            </script>
            
              </body>
            </html>
          `);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      {data.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="card"
          onClick={() => {
            handleCardClick(item.id);
          }}
        >
          <img src={item.imageUrl} alt={item.name} />
          <div className="card-content">
            <h4 className="name">
              {item.prefix} {item.name} {item.lastName}
            </h4>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default APIComponent;
