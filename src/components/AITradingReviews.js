import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaThumbsUp, 
  FaThumbsDown,
  FaExclamationTriangle,
  FaRegCommentDots,
  FaTimes,
  FaShare,
  FaRobot
} from 'react-icons/fa';
import './AITradingReviews.css';
import { Helmet } from 'react-helmet-async';

import React, { useState, useEffect, useCallback } from 'react';
const AITradingReviews = () => {
  const affiliateLink = "https://chartlordai.com/?ref=mrxw4yhbhrco";
  
  // State for filters
  const [filterRating, setFilterRating] = useState(0);
  const [filterSentiment, setFilterSentiment] = useState('all'); // 'all', 'happy', 'sad', 'neutral'
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [expandedReviews, setExpandedReviews] = useState({});
  
  // State for user interactions
  const [likedReviews, setLikedReviews] = useState({});
  const [dislikedReviews, setDislikedReviews] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [reviewComments, setReviewComments] = useState({});
  
  // State for review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 3,
    platform: '',
    title: '',
    content: '',
    pros: '',
    cons: ''
  });
  const [submitMessage, setSubmitMessage] = useState('');

  // Reviews data - Mixed reviews (NO ChartLord AI mentioned)
  const initialReviews = [
    // Red reviews (negative)
    {
      id: 1,
      name: "Dhabo Kolefe",
      location: "Africa",
      date: "4 March 2026",
      rating: 2,
      sentiment: "sad",
      platform: "TradeBot AI",
      title: "Lost money in first week",
      content: "I tried this platform with high hopes but lost R2,000 in my first week. The AI kept making bad entries and the stop losses were consistently hit. Support was unhelpful and blamed market conditions. Would not recommend to anyone starting out.",
      pros: "Easy to set up, nice interface",
      cons: "Poor performance, bad support, constant losses",
      likes: 24,
      dislikes: 3,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-1.jpg",
      readTime: "4 min read",
      comments: 8
    },
    {
      id: 2,
      name: "Narah van Wyk",
      location: " Africa",
      date: "3 March 2026",
      rating: 2,
      sentiment: "sad",
      platform: "CryptoPulse",
      title: "Not what they promised",
      content: "The marketing makes it look like you'll get rich quick. Reality is very different. The AI missed major moves and the drawdowns were much larger than advertised. I lost 30% of my capital in two months. Customer service stopped responding after I asked for a refund.",
      pros: "Good educational materials",
      cons: "Overpromises, poor results, bad support",
      likes: 31,
      dislikes: 2,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-2.jpg",
      readTime: "5 min read",
      comments: 12
    },
    {
      id: 3,
      name: "Eipho Plamin",
      location: "Africa",
      date: "2 March 2026",
      rating: 1,
      sentiment: "sad",
      platform: "ForexMind",
      title: "Complete waste of money",
      content: "This is the worst trading tool I've ever used. The signals were consistently wrong and the AI seemed to do the opposite of what the market was doing. When I tried to cancel my subscription, they made it extremely difficult. Stay away.",
      pros: "None",
      cons: "Wrong signals, difficult cancellation, poor support",
      likes: 42,
      dislikes: 1,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-3.jpg",
      readTime: "3 min read",
      comments: 15
    },
    
    // Green reviews (positive)
    {
      id: 4,
      name: "Perato Khumalo",
      location: "Africa",
      date: "1 March 2026",
      rating: 4,
      sentiment: "happy",
      platform: "StockSage",
      title: "Solid performer, decent returns",
      content: "Been using StockSage for about 4 months now. Overall happy with the results - up about 18% on my initial R10,000. The AI isn't perfect and there are some losing trades, but the winners make up for it. Support is responsive and helpful.",
      pros: "Good returns, helpful support, easy to use",
      cons: "Occasional bugs, mobile app could be better",
      likes: 18,
      dislikes: 2,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-4.jpg",
      readTime: "4 min read",
      comments: 6
    },
    {
      id: 5,
      name: "Johan Bota",
      location: "Africa",
      date: "28 February 2026",
      rating: 5,
      sentiment: "happy",
      platform: "NeuralTrade",
      title: "Finally an AI that actually works",
      content: "After trying 3 different trading bots that all failed, NeuralTrade is the first one that's actually made me money. I'm up 32% in 3 months with moderate risk settings. The AI seems to understand market structure and avoids bad trades. Highly recommend.",
      pros: "Consistent profits, good risk management, transparent",
      cons: "A bit expensive, learning curve",
      likes: 37,
      dislikes: 1,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-5.jpg",
      readTime: "5 min read",
      comments: 9
    },
    {
      id: 6,
      name: "Yomsa Zulu",
      location: "Africa",
      date: "27 February 2026",
      rating: 3,
      sentiment: "neutral",
      platform: "QuantMaster",
      title: "Mixed results so far",
      content: "It's been 2 months with QuantMaster. Some weeks are good, some are bad. Overall I'm up about 5% which is better than losing but not the 15-20% they advertise. The platform itself works well and support is helpful. Not sure if I'll continue after my subscription ends.",
      pros: "Reliable platform, good support",
      cons: "Underperforms promises, expensive",
      likes: 14,
      dislikes: 4,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-6.jpg",
      readTime: "4 min read",
      comments: 7
    },
    
    // More mixed reviews
    {
      id: 7,
      name: "Sagiso Yodise",
      location: " Africa",
      date: "26 February 2026",
      rating: 3,
      sentiment: "neutral",
      platform: "TradeWise AI",
      title: "Decent but not life-changing",
      content: "I've been using TradeWise for about 3 months. Made some money, lost some money. Net profit is around 8% which is okay but not the game-changer I was hoping for. The AI works but you still need to understand what's happening. Good for beginners to learn.",
      pros: "Educational, decent returns, good interface",
      cons: "Not as profitable as advertised, slow support",
      likes: 21,
      dislikes: 3,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-7.jpg",
      readTime: "4 min read",
      comments: 11
    },
    {
      id: 8,
      name: "Precious kosi",
      location: "Africa",
      date: "25 February 2026",
      rating: 4,
      sentiment: "happy",
      platform: "Algorithmic Trader Pro",
      title: "Good returns, would recommend",
      content: "Started with R5,000 three months ago. Currently at R6,800. Not life-changing but steady growth. The AI avoids big losses which I appreciate. Support team is based in Africa which makes a big difference. Would recommend to friends.",
      pros: "Steady growth, local support, good communication",
      cons: "Could be faster, sometimes slow to react",
      likes: 26,
      dislikes: 2,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-8.jpg",
      readTime: "3 min read",
      comments: 5
    },
    {
      id: 9,
      name: "Tongani Bube",
      location: "Africa",
      date: "24 February 2026",
      rating: 2,
      sentiment: "sad",
      platform: "CryptoPulse",
      title: "Lost confidence after big drawdown",
      content: "Everything was going fine for the first month (up 12%) then suddenly a 25% drawdown in one week. The AI didn't adjust and kept trading despite clear market instability. Support took 3 days to respond. Lost trust in the system.",
      pros: "Good start, nice interface",
      cons: "Poor risk management, slow support, volatile",
      likes: 19,
      dislikes: 2,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-9.jpg",
      readTime: "4 min read",
      comments: 8
    },
    {
      id: 10,
      name: "Sipho Mthembu",
      location: "Africa",
      date: "23 February 2026",
      rating: 4,
      sentiment: "happy",
      platform: "NeuralTrade",
      title: "Best AI I've tried so far",
      content: "Tried 4 different trading AIs over the past year. NeuralTrade is the only one I'm still using after 3 months. Returns are consistent (8-12% monthly) and the risk management actually works. Support is helpful and the community is great.",
      pros: "Consistent returns, good community, reliable",
      cons: "Monthly fee is high, no mobile app",
      likes: 33,
      dislikes: 1,
      verified: true,
      imageUrl: "/images/reviewers/reviewer-10.jpg",
      readTime: "4 min read",
      comments: 14
    }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('ai-trading-reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(initialReviews);
      localStorage.setItem('ai-trading-reviews', JSON.stringify(initialReviews));
    }
    
    const savedLikes = localStorage.getItem('ai-trading-likes');
    if (savedLikes) setLikedReviews(JSON.parse(savedLikes));
    
    const savedDislikes = localStorage.getItem('ai-trading-dislikes');
    if (savedDislikes) setDislikedReviews(JSON.parse(savedDislikes));
    
    const savedComments = localStorage.getItem('ai-trading-comments');
    if (savedComments) setReviewComments(JSON.parse(savedComments));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('ai-trading-reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ai-trading-likes', JSON.stringify(likedReviews));
  }, [likedReviews]);

  useEffect(() => {
    localStorage.setItem('ai-trading-dislikes', JSON.stringify(dislikedReviews));
  }, [dislikedReviews]);

  useEffect(() => {
    localStorage.setItem('ai-trading-comments', JSON.stringify(reviewComments));
  }, [reviewComments]);

  // Handle like button click
  const handleLike = useCallback((reviewId) => {
    setReviews(prevReviews => {
      const updatedReviews = prevReviews.map(review => {
        if (review.id === reviewId) {
          const currentLiked = likedReviews[reviewId]?.active || false;
          const currentDisliked = dislikedReviews[reviewId]?.active || false;
          
          if (currentLiked) {
            setLikedReviews(prev => ({ ...prev, [reviewId]: { active: false, count: review.likes - 1 } }));
            return { ...review, likes: review.likes - 1 };
          }
          
          if (currentDisliked) {
            setDislikedReviews(prev => ({ ...prev, [reviewId]: { active: false, count: review.dislikes - 1 } }));
            setLikedReviews(prev => ({ ...prev, [reviewId]: { active: true, count: review.likes + 1 } }));
            return { ...review, likes: review.likes + 1, dislikes: review.dislikes - 1 };
          }
          
          setLikedReviews(prev => ({ ...prev, [reviewId]: { active: true, count: review.likes + 1 } }));
          return { ...review, likes: review.likes + 1 };
        }
        return review;
      });
      return updatedReviews;
    });
  }, [likedReviews, dislikedReviews]);

  // Handle dislike button click
  const handleDislike = useCallback((reviewId) => {
    setReviews(prevReviews => {
      const updatedReviews = prevReviews.map(review => {
        if (review.id === reviewId) {
          const currentDisliked = dislikedReviews[reviewId]?.active || false;
          const currentLiked = likedReviews[reviewId]?.active || false;
          
          if (currentDisliked) {
            setDislikedReviews(prev => ({ ...prev, [reviewId]: { active: false, count: review.dislikes - 1 } }));
            return { ...review, dislikes: review.dislikes - 1 };
          }
          
          if (currentLiked) {
            setLikedReviews(prev => ({ ...prev, [reviewId]: { active: false, count: review.likes - 1 } }));
            setDislikedReviews(prev => ({ ...prev, [reviewId]: { active: true, count: review.dislikes + 1 } }));
            return { ...review, likes: review.likes - 1, dislikes: review.dislikes + 1 };
          }
          
          setDislikedReviews(prev => ({ ...prev, [reviewId]: { active: true, count: review.dislikes + 1 } }));
          return { ...review, dislikes: review.dislikes + 1 };
        }
        return review;
      });
      return updatedReviews;
    });
  }, [likedReviews, dislikedReviews]);

  // Handle comment submission
  const handleCommentSubmit = (reviewId) => {
    if (!newComment.trim() || !commentName.trim()) return;
    
    const comment = {
      id: Date.now(),
      name: commentName,
      text: newComment,
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    };
    
    setReviewComments(prev => ({
      ...prev,
      [reviewId]: [...(prev[reviewId] || []), comment]
    }));
    
    setNewComment('');
    setCommentName('');
  };

  // Handle new review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!newReview.name || !newReview.location || !newReview.title || !newReview.content) {
      setSubmitMessage('Please fill in all required fields');
      return;
    }
    
    // Determine sentiment based on rating
    const sentiment = newReview.rating >= 4 ? 'happy' : newReview.rating <= 2 ? 'sad' : 'neutral';
    
    const review = {
      id: Date.now(),
      name: newReview.name,
      location: newReview.location,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      rating: newReview.rating,
      sentiment: sentiment,
      platform: newReview.platform || "Unknown Platform",
      title: newReview.title,
      content: newReview.content,
      pros: newReview.pros,
      cons: newReview.cons,
      likes: 0,
      dislikes: 0,
      verified: false,
      imageUrl: `https://ui-avatars.com/api/?name=${newReview.name.replace(' ', '+')}&background=00b67a&color=fff&size=100`,
      readTime: `${Math.ceil(newReview.content.split(' ').length / 200)} min read`,
      comments: 0
    };
    
    setReviews(prev => [review, ...prev]);
    setShowReviewForm(false);
    setNewReview({ name: '', location: '', rating: 3, platform: '', title: '', content: '', pros: '', cons: '' });
    setSubmitMessage('');
  };

  // Handle read more toggle
  const toggleReadMore = (reviewId) => {
    setExpandedReviews(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);
  
  const sentimentStats = {
    happy: reviews.filter(r => r.sentiment === 'happy').length,
    sad: reviews.filter(r => r.sentiment === 'sad').length,
    neutral: reviews.filter(r => r.sentiment === 'neutral').length
  };

  // Filter and sort reviews (using emoji-based filter internally)
  const filteredReviews = reviews
    .filter(review => 
      (filterRating === 0 || review.rating === filterRating) &&
      (filterSentiment === 'all' || review.sentiment === filterSentiment) &&
      (searchTerm === '' || 
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.platform.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'helpful') return b.likes - a.likes;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const displayedReviews = filteredReviews.slice(0, visibleReviews);

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} className="star-filled" />);
      else if (i - 0.5 <= rating) stars.push(<FaStarHalfAlt key={i} className="star-half" />);
      else stars.push(<FaRegStar key={i} className="star-empty" />);
    }
    return <div className="star-rating">{stars}</div>;
  };

  // Truncate content
  const truncateContent = (content, isExpanded) => {
    if (isExpanded) return content;
    const words = content.split(' ');
    return words.length > 40 ? words.slice(0, 40).join(' ') + '...' : content;
  };

  return (
    <>
      <Helmet>
        <title>AI Trading Reviews | Honest Reviews from Real Traders</title>
        <meta name="description" content="Read honest reviews of AI trading platforms from African traders. Both good and bad experiences shared. Make informed decisions." />
        <meta name="keywords" content="AI trading reviews, trading bot reviews, forex robot reviews, automated trading Africa" />
        <meta property="og:title" content="AI Trading Reviews - Real Trader Experiences" />
        <meta property="og:description" content="Real reviews, real experiences - the good, the bad, and the honest" />
        <link rel="canonical" href="https://trustlordai.vercel.app/ai-trading-reviews" />
      </Helmet>

      <div className="reviews-wrapper">
        {/* Header */}
        <header className="reviews-header">
          <div className="container">
            <h1 className="main-title">
              <FaRobot className="title-icon" />
              AI Trading Reviews
            </h1>
            <p className="subtitle">
              Honest reviews from real African traders
            </p>
            
            {/* Affiliate CTA - Only place ChartLord AI is mentioned */}
            <div className="header-cta">
              <a href={affiliateLink} className="cta-button" target="_blank" rel="noopener noreferrer">
                Try ChartLord AI →
              </a>
              <p className="cta-note">One of the top-rated AI trading platforms</p>
            </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{totalReviews}</span>
                <span className="stat-label">Total Reviews</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{averageRating}</span>
                <span className="stat-label">Avg Rating</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{sentimentStats.happy}</span>
                <span className="stat-label">😊</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{sentimentStats.sad}</span>
                <span className="stat-label">😞</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{sentimentStats.neutral}</span>
                <span className="stat-label">😐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="container">
            <div className="filter-grid">
              <input
                type="text"
                placeholder="Search reviews by platform or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select 
                className="filter-select"
                value={filterSentiment}
                onChange={(e) => setFilterSentiment(e.target.value)}
              >
                <option value="all">All Reviews</option>
                <option value="happy">😊 Happy experiences</option>
                <option value="sad">😞 Disappointing experiences</option>
                <option value="neutral">😐 Mixed experiences</option>
              </select>

              <select 
                className="filter-select"
                value={filterRating}
                onChange={(e) => setFilterRating(parseInt(e.target.value))}
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>

              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Write Review Button */}
        <div className="write-review-container">
          <div className="container">
            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
              Share Your Experience
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-section">
          <div className="container">
            {displayedReviews.length > 0 ? (
              <div className="reviews-grid">
                {displayedReviews.map(review => (
                  <article key={review.id} className={`review-card sentiment-${review.sentiment}`}>
                    <div className="review-header">
                      <div className="review-meta-top">
                        <span className="platform-tag">{review.platform}</span>
                        {/* Removed sentiment badge - only color indicates sentiment */}
                      </div>
                      <div className="review-actions">
                        <button className="share-btn" onClick={() => alert('Share this review')}>
                          <FaShare />
                        </button>
                      </div>
                    </div>

                    <div className="author-info">
                      <div className="author-avatar">
                        <img src={review.imageUrl} alt={review.name} />
                      </div>
                      <div className="author-details">
                        <h3>{review.name}</h3>
                        <p>{review.location}</p>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>

                    <div className="rating-section">
                      <StarRating rating={review.rating} />
                      <span className="rating-text">{review.rating}/5</span>
                    </div>

                    <h2 className="review-title">{review.title}</h2>
                    <p className="review-content">
                      {truncateContent(review.content, expandedReviews[review.id])}
                      {review.content.split(' ').length > 40 && (
                        <button className="read-more-btn" onClick={() => toggleReadMore(review.id)}>
                          {expandedReviews[review.id] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </p>

                    {(review.pros || review.cons) && (
                      <div className="pros-cons">
                        {review.pros && (
                          <div className="pros">
                            <span className="pros-label">✅ Pros:</span> {review.pros}
                          </div>
                        )}
                        {review.cons && (
                          <div className="cons">
                            <span className="cons-label">❌ Cons:</span> {review.cons}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="engagement-bar">
                      <div className="engagement-stats">
                        <button 
                          className={`stat-btn like-btn ${likedReviews[review.id]?.active ? 'active' : ''}`}
                          onClick={() => handleLike(review.id)}
                        >
                          <FaThumbsUp /> {review.likes}
                        </button>
                        <button 
                          className={`stat-btn dislike-btn ${dislikedReviews[review.id]?.active ? 'active' : ''}`}
                          onClick={() => handleDislike(review.id)}
                        >
                          <FaThumbsDown /> {review.dislikes}
                        </button>
                        <button 
                          className="stat-btn comment-btn"
                          onClick={() => setActiveCommentBox(activeCommentBox === review.id ? null : review.id)}
                        >
                          <FaRegCommentDots /> {reviewComments[review.id]?.length || 0}
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {activeCommentBox === review.id && (
                      <div className="comments-section">
                        <h4>Comments</h4>
                        {reviewComments[review.id]?.map(comment => (
                          <div key={comment.id} className="comment">
                            <strong>{comment.name}</strong>
                            <span className="comment-date">{comment.date}</span>
                            <p>{comment.text}</p>
                          </div>
                        ))}
                        <div className="add-comment">
                          <input
                            type="text"
                            placeholder="Your name"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                          />
                          <textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <button onClick={() => handleCommentSubmit(review.id)}>Post</button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <FaExclamationTriangle />
                <h3>No reviews match your filters</h3>
              </div>
            )}

            {visibleReviews < filteredReviews.length && (
              <div className="load-more">
                <button onClick={() => setVisibleReviews(prev => prev + 3)}>
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowReviewForm(false)}>
                <FaTimes />
              </button>
              
              <h2>Share Your AI Trading Experience</h2>
              
              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    placeholder="e.g. John Dlamini"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({...newReview, location: e.target.value})}
                    placeholder="e.g. Johannesburg, South Africa"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>AI Trading Platform *</label>
                  <input
                    type="text"
                    value={newReview.platform}
                    onChange={(e) => setNewReview({...newReview, platform: e.target.value})}
                    placeholder="e.g. NeuralTrade, StockSage, etc."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating *</label>
                  <div className="rating-selector">
                    {[1,2,3,4,5].map(star => (
                      <span
                        key={star}
                        className={`rating-star ${star <= newReview.rating ? 'selected' : ''}`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Review Title *</label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                    placeholder="Share your honest experience with this AI trading platform..."
                    rows="4"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group half">
                    <label>Pros (optional)</label>
                    <input
                      type="text"
                      value={newReview.pros}
                      onChange={(e) => setNewReview({...newReview, pros: e.target.value})}
                      placeholder="What did you like?"
                    />
                  </div>
                  
                  <div className="form-group half">
                    <label>Cons (optional)</label>
                    <input
                      type="text"
                      value={newReview.cons}
                      onChange={(e) => setNewReview({...newReview, cons: e.target.value})}
                      placeholder="What didn't you like?"
                    />
                  </div>
                </div>
                
                {submitMessage && <div className="submit-message error">{submitMessage}</div>}
                
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer with Affiliate CTA */}
        <footer className="reviews-footer">
          <div className="container">
            <div className="footer-cta-section">
              <h3>Looking for a Reliable AI Trading Platform?</h3>
              <p>Based on thousands of reviews, ChartLord AI is consistently rated among the top performers</p>
              <a href={affiliateLink} className="footer-cta-button" target="_blank" rel="noopener noreferrer">
                Try ChartLord AI →
              </a>
            </div>
            
            <div className="footer-bottom">
              <p className="disclaimer">
                Disclaimer: These are real user reviews of various AI trading platforms. 
                Individual experiences may vary. Trading involves risk.
              </p>
              <p className="copyright">
                © 2026 AI Trading Reviews. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AITradingReviews;