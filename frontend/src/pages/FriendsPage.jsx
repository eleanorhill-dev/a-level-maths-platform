import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch current friends, pending requests, and sent requests
    const fetchFriendData = async () => {
      try {
        const res = await fetch('http://localhost:5000/friends', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setFriends(data.friends);
        setPendingRequests(data.pendingRequests);
        setSentRequests(data.sentRequests);
      } catch (err) {
        setError('Error fetching friend data.');
      }
    };
    fetchFriendData();
  }, []);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      const res = await fetch(`/search?query=${e.target.value}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      setSearchResults(data.users);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const res = await fetch('/friends/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }),
        credentials: 'include',
      });
      if (res.ok) {
        // Re-fetch the data after sending request
        const data = await res.json();
        setSentRequests(data.sentRequests);
      }
    } catch (err) {
      setError('Error sending friend request.');
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const res = await fetch(`/friends/accept/${requestId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setFriends(data.friends);
        setPendingRequests(data.pendingRequests);
      }
    } catch (err) {
      setError('Error accepting friend request.');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const res = await fetch(`/api/friends/decline/${requestId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setPendingRequests(data.pendingRequests);
      }
    } catch (err) {
      setError('Error declining friend request.');
    }
  };

  return (
    <div className="friends-page">
      <h1>Your Friends</h1>

      {/* Search Bar */}
      <Form>
        <Form.Control
          type="text"
          placeholder="Search for friends"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <h3>Friend Requests</h3>
      {pendingRequests.length > 0 ? (
        <Row>
          {pendingRequests.map((request) => (
            <Col key={request.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{request.user.username}</Card.Title>
                  <Button onClick={() => handleAcceptRequest(request.id)}>Accept</Button>
                  <Button onClick={() => handleDeclineRequest(request.id)}>Decline</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No pending requests</p>
      )}

      <h3>Search Results</h3>
      {searchResults.length > 0 ? (
        <Row>
          {searchResults.map((user) => (
            <Col key={user.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  {sentRequests.includes(user.id) ? (
                    <p>Request Sent</p>
                  ) : (
                    <Button onClick={() => handleAddFriend(user.id)}>Send Friend Request</Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No users found</p>
      )}

      <h3>Your Current Friends</h3>
      <Row>
        {friends.map((friend) => (
          <Col key={friend.id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{friend.username}</Card.Title>
                <Link to={`/friends/${friend.id}`} className="btn btn-primary">View Profile</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FriendsPage;
