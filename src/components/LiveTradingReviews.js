// LiveTradingReviews.js - Complete Updated Version
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FaThumbsUp, 
  FaThumbsDown,
  FaRegCommentDots,
  FaTimes,
  FaRobot,
  FaExclamationTriangle,
  FaRegClock,
  FaFire,
  FaGlobe,
  FaBookmark,
  FaRegBookmark,
  FaCheckCircle,
  FaChartLine,
  FaEllipsisH,
  FaChevronDown,
  FaChevronUp,
  FaShare,
  FaAward,
  FaCrown
} from 'react-icons/fa';
import './LiveTradingReviews.css';

const LiveTradingReviews = () => {
  // State
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [expandedPosts, setExpandedPosts] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [dislikedPosts, setDislikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [showPostForm, setShowPostForm] = useState(false);
  const [activeTab, setActiveTab] = useState('hot');
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState({});
  const [sortBy, setSortBy] = useState('best');
  const [timeFilter, setTimeFilter] = useState('all');

  // Kenyan profile images (authentic stock photos of Kenyan people)
  const kenyanAvatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", // James Omondi
    "https://images.unsplash.com/photo-1494790108777-2961284f5a7b?w=150&h=150&fit=crop", // Mary Akinyi
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", // John Mwangi
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", // Grace Achieng
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", // Peter Odhiambo
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", // Sarah Wanjiku
    "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop", // David Kimani
    "https://images.unsplash.com/photo-1504257432389-52343af06ae5?w=150&h=150&fit=crop", // Lucy Njeri
    "https://images.unsplash.com/photo-1464863979621-258859e62245?w=150&h=150&fit=crop", // Michael Ochieng
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop", // Esther Muthoni
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop", // Brian Otieno
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", // Faith Akoth
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop", // Kevin Omondi
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop"  // Cynthia Auma
  ];

  // Trending topics with Kenyan context
  const [trendingTopics, setTrendingTopics] = useState([
    { tag: "TradeMasterKE", posts: 1241, sentiment: "negative", emoji: "🔥", category: "scam" },
    { tag: "CryptoPulse", posts: 987, sentiment: "negative", emoji: "🚨", category: "scam" },
    { tag: "ForexScamsKE", posts: 892, sentiment: "negative", emoji: "⚠️", category: "scam" },
    { tag: "NairobiTraders", posts: 654, sentiment: "neutral", emoji: "💬", category: "community" },
    { tag: "M-PesaTrading", posts: 543, sentiment: "neutral", emoji: "📱", category: "discussion" },
    { tag: "ChartLordAI", posts: 187, sentiment: "positive", emoji: "✅", category: "legit" },
    { tag: "CBKWarning", posts: 432, sentiment: "warning", emoji: "📢", category: "alert" },
    { tag: "KRAAlert", posts: 321, sentiment: "warning", emoji: "💰", category: "alert" }
  ]);

  // Regions with Kenyan cities
  const regions = [
    { code: 'global', name: '🌍 Global Feed' },
    { code: 'kenya', name: '🇰🇪 Kenya' },
    { code: 'nairobi', name: '📍 Nairobi' },
    { code: 'mombasa', name: '📍 Mombasa' },
    { code: 'kisumu', name: '📍 Kisumu' },
    { code: 'nakuru', name: '📍 Nakuru' },
    { code: 'eldoret', name: '📍 Eldoret' },
    { code: 'africa', name: '🌍 Africa' },
    { code: 'asia', name: '🌏 Asia' },
    { code: 'europe', name: '🌍 Europe' }
  ];

  // Kenyan names and locations for authentic profiles
  const kenyanProfiles = [
    { name: "James Omondi", handle: "@james_omo", location: "Nairobi CBD", county: "Nairobi" },
    { name: "Mary Akinyi", handle: "@mary_akinyi", location: "Kisumu", county: "Kisumu" },
    { name: "John Mwangi", handle: "@john_mwangi", location: "Nakuru", county: "Nakuru" },
    { name: "Grace Achieng", handle: "@grace_achieng", location: "Mombasa", county: "Mombasa" },
    { name: "Peter Odhiambo", handle: "@peter_odhi", location: "Eldoret", county: "Uasin Gishu" },
    { name: "Sarah Wanjiku", handle: "@sarah_wanjiku", location: "Thika", county: "Kiambu" },
    { name: "David Kimani", handle: "@david_kimani", location: "Kiambu", county: "Kiambu" },
    { name: "Lucy Njeri", handle: "@lucy_njeri", location: "Nyeri", county: "Nyeri" },
    { name: "Michael Ochieng", handle: "@mike_ochieng", location: "Kisumu", county: "Kisumu" },
    { name: "Esther Muthoni", handle: "@esther_muthoni", location: "Meru", county: "Meru" },
    { name: "Brian Otieno", handle: "@brian_otieno", location: "Nairobi Eastlands", county: "Nairobi" },
    { name: "Faith Akoth", handle: "@faith_akoth", location: "Kakamega", county: "Kakamega" },
    { name: "Kevin Omondi", handle: "@kevin_omondi", location: "Nairobi Westlands", county: "Nairobi" },
    { name: "Cynthia Auma", handle: "@cynthia_auma", location: "Kisii", county: "Kisii" }
  ];

  // Generate random avatar (mix of Kenyan and international)
  const getAvatar = (seed, isKenyan = false) => {
    if (isKenyan) {
      return kenyanAvatars[seed % kenyanAvatars.length];
    }
    return `https://i.pravatar.cc/150?u=${seed}`;
  };

  // Get time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffSeconds = Math.floor((now - postTime) / 1000);
    
    if (diffSeconds < 60) return 'just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}d ago`;
    return `${Math.floor(diffSeconds / 604800)}w ago`;
  };

  // Toggle post expansion
  const toggleExpand = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Generate 500+ reviews
  const generateInitialFeed = () => {
    const feed = [];
    
    // Scam platforms (expanded list)
    const scamPlatforms = [
      "TradeMaster KE", "CryptoPulse Africa", "NeuralTrade East Africa", "ForexMind Kenya", 
      "StockSage Africa", "TradeWise Kenya", "AI Trading Pro KE", "QuantMaster Africa",
      "ProfitGenius Kenya", "AlphaTrade East Africa", "CryptoLord KE", "ForexElite Africa",
      "TradeBot Pro Kenya", "AITrader 360 Africa", "CryptoWizard KE", "ForexMaster East Africa",
      "NeuralTrader Africa", "QuantumAI KE", "CryptoPulse 2.0", "TradeMaster Pro Africa",
      "AI Fortune KE", "CryptoGenius Africa", "ForexAI Pro KE", "TradeWise Elite Africa",
      "StockMaster KE", "CryptoTrader Africa", "ForexRobot Pro KE", "AITradeMaster Africa",
      "CryptoProphet KE", "ForexOracle Africa", "TradeAI Pro KE", "NeuralTrade Plus",
      "CryptoVision Africa", "ForexMaster Pro KE", "AI Wealth Builder Africa", "TradeGenius KE",
      "CryptoWealth Africa", "ForexAI Elite KE", "NeuralTrade Pro Africa", "StockSage Plus KE",
      "TradeMaster Elite Africa", "CryptoPulse Pro KE", "ForexMind Elite", "AI Trading Plus Africa",
      "QuantMaster Pro KE", "TradeWise Plus Africa", "StockMaster Pro KE", "CryptoLord AI Africa",
      "ForexGenius KE", "AI Profit Master Africa", "CryptoTrader Pro KE", "NeuralWealth Africa"
    ];

    // Kenyan cities and towns for location diversity
    const kenyanLocations = [
      { city: "Nairobi CBD", county: "Nairobi", estate: "Upper Hill", region: "nairobi" },
      { city: "Westlands", county: "Nairobi", estate: "Westlands", region: "nairobi" },
      { city: "Kilimani", county: "Nairobi", estate: "Kilimani", region: "nairobi" },
      { city: "Kileleshwa", county: "Nairobi", estate: "Kileleshwa", region: "nairobi" },
      { city: "Lavington", county: "Nairobi", estate: "Lavington", region: "nairobi" },
      { city: "Karen", county: "Nairobi", estate: "Karen", region: "nairobi" },
      { city: "Lang'ata", county: "Nairobi", estate: "Lang'ata", region: "nairobi" },
      { city: "South B", county: "Nairobi", estate: "South B", region: "nairobi" },
      { city: "South C", county: "Nairobi", estate: "South C", region: "nairobi" },
      { city: "Eastleigh", county: "Nairobi", estate: "Eastleigh", region: "nairobi" },
      { city: "Mombasa Island", county: "Mombasa", estate: "Nyali", region: "mombasa" },
      { city: "Nyali", county: "Mombasa", estate: "Nyali", region: "mombasa" },
      { city: "Bamburi", county: "Mombasa", estate: "Bamburi", region: "mombasa" },
      { city: "Likoni", county: "Mombasa", estate: "Likoni", region: "mombasa" },
      { city: "Kisumu CBD", county: "Kisumu", estate: "Milimani", region: "kisumu" },
      { city: "Milimani", county: "Kisumu", estate: "Milimani", region: "kisumu" },
      { city: "Kondele", county: "Kisumu", estate: "Kondele", region: "kisumu" },
      { city: "Nakuru CBD", county: "Nakuru", estate: "Milimani", region: "nakuru" },
      { city: "Milimani", county: "Nakuru", estate: "Milimani", region: "nakuru" },
      { city: "Lanet", county: "Nakuru", estate: "Lanet", region: "nakuru" },
      { city: "Eldoret CBD", county: "Uasin Gishu", estate: "Elgon View", region: "eldoret" },
      { city: "Elgon View", county: "Uasin Gishu", estate: "Elgon View", region: "eldoret" },
      { city: "Kapsabet", county: "Nandi", estate: "Kapsabet", region: "eldoret" },
      { city: "Thika CBD", county: "Kiambu", estate: "Thika", region: "africa" },
      { city: "Juja", county: "Kiambu", estate: "Juja", region: "africa" },
      { city: "Ruiru", county: "Kiambu", estate: "Ruiru", region: "africa" }
    ];

    // International locations
    const intLocations = [
      { city: "Lagos", country: "Nigeria", flag: "🇳🇬", region: "africa" },
      { city: "Accra", country: "Ghana", flag: "🇬🇭", region: "africa" },
      { city: "Kampala", country: "Uganda", flag: "🇺🇬", region: "africa" },
      { city: "Dar es Salaam", country: "Tanzania", flag: "🇹🇿", region: "africa" },
      { city: "Johannesburg", country: "South Africa", flag: "🇿🇦", region: "africa" },
      { city: "Mumbai", country: "India", flag: "🇮🇳", region: "asia" },
      { city: "Singapore", country: "Singapore", flag: "🇸🇬", region: "asia" },
      { city: "Dubai", country: "UAE", flag: "🇦🇪", region: "mideast" },
      { city: "London", country: "UK", flag: "🇬🇧", region: "europe" },
      { city: "New York", country: "USA", flag: "🇺🇸", region: "americas" }
    ];

    // Generate 300 negative reviews with many Kenyan profiles
    for (let i = 1; i <= 300; i++) {
      const isKenyan = i % 3 === 0 || i % 5 === 0; // Mix Kenyan profiles
      const platform = scamPlatforms[i % scamPlatforms.length];
      
      let location;
      let flag = "🌍";
      let region = "africa";
      
      if (isKenyan) {
        const kenyanLoc = kenyanLocations[i % kenyanLocations.length];
        location = `${kenyanLoc.estate}, ${kenyanLoc.city}`;
        flag = "🇰🇪";
        region = kenyanLoc.region;
      } else {
        const intLoc = intLocations[i % intLocations.length];
        location = `${intLoc.city}, ${intLoc.country}`;
        flag = intLoc.flag;
        region = intLoc.region;
      }
      
      const amount = [5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000, 10000000][i % 11];
      
      // Kenyan currency (KES) for Kenyan posts
      let currency = i % 3 === 0 ? 'KES' : '$';
      
      // Kenyan names for authentic profiles
      let userName, userHandle;
      if (isKenyan) {
        const kenyanProfile = kenyanProfiles[i % kenyanProfiles.length];
        userName = kenyanProfile.name;
        userHandle = kenyanProfile.handle;
      } else {
        const names = ["James", "John", "Michael", "David", "Sarah", "Emma", "Mohammed", "Ahmed", "Wei", "Carlos"];
        const handles = ["@trader", "@investor", "@fx", "@crypto"];
        userName = `${names[i % names.length]} ${names[(i+1) % names.length]}`;
        userHandle = `${handles[i % handles.length]}${Math.floor(Math.random() * 1000)}`;
      }

      // Kenyan-specific content
      let negativeContents;
      if (isKenyan) {
        negativeContents = [
          `🚨 **SCAM ALERT KENYA**: I sent ${currency} ${amount.toLocaleString()} via M-Pesa to **${platform}** and they vanished! They promised 20% returns weekly. Now their line is off. Reported to DCI. Wacha tuweke shida!`,
          `⚠️ **WARNING KENYANS**: **${platform}** is a ponzi scheme. Lost ${currency} ${amount.toLocaleString()} I had saved from my business. They had an office in Westlands but it's now empty. DO NOT INVEST!`,
          `💔 **Nimechomwa**: **${platform}** took my school fees money - ${currency} ${amount.toLocaleString()}. I was supposed to report to campus last week. Now I can't even afford fare. Please share widely.`,
          `**${platform}** wako na office CBD but ni scam. Lost ${currency} ${amount.toLocaleString()}. CBK needs to regulate these people. Watu wanateseka.`,
          `Sikumaini nikubali **${platform}** inje. Nikona account frozen with ${currency} ${amount.toLocaleString()} inside. Customer care hawa respond. Any lawyer here can help?`,
          `**${platform}** wametekea watu pesa. Our WhatsApp group of 50 investors lost over ${currency} ${(amount * 50).toLocaleString()}. Police Kasarani said they've received 200+ complaints.`,
          `Nairobians beware of **${platform}**. They're operating from a rented space in Kilimani. I visited their "office" today - it's empty. Lost ${currency} ${amount.toLocaleString()}.`,
          `**${platform}** walinilipa first two profits then blocked me after I deposited ${currency} ${amount.toLocaleString()}. Classic ponzi. Don't fall for their Bibi maneno.`,
          `Kisumu people alert! **${platform}** has opened an office at Milimani. It's a trap. I lost ${currency} ${amount.toLocaleString()}. Let's expose them before they scam more people.`,
          `Mombasa residents: **${platform}** in Nyali is a scam. Lost ${currency} ${amount.toLocaleString()}. Their agents promised heaven but now phones are off.`,
          `Eldoret: My friend lost ${currency} ${amount.toLocaleString()} to **${platform}**. They claimed to have AI trading robots but it was all fake. Mtu akuje na AI story, avoid!`,
          `**${platform}** imenimaliza. I had saved ${currency} ${amount.toLocaleString()} for my wedding. Now everything is gone. Please share and warn others.`,
          `These **${platform}** people walinipea fake withdrawal after I invested ${currency} ${amount.toLocaleString()}. Now they're asking for more fees to "unlock" my account. Classic!`,
          `DCI should arrest **${platform}** directors. They've scammed hundreds of Kenyans. Lost ${currency} ${amount.toLocaleString()} and they're still operating!`,
          `**${platform}** ni wapumbafu? They thought they could scam Kenyans and get away. I lost ${currency} ${amount.toLocaleString()} but I've reported to cyber crimes.`
        ];
      } else {
        negativeContents = [
          `🚨 **SCAM ALERT**: I invested $${amount.toLocaleString()} with **${platform}** and lost everything! Withdrawals blocked.`,
          `⚠️ **WARNING**: **${platform}** is a complete scam. They disappeared with my $${amount.toLocaleString()}.`,
          `💔 **LOST EVERYTHING**: **${platform}** wiped out my investment of $${amount.toLocaleString()}.`,
          `**${platform}** is operating illegally. Lost $${amount.toLocaleString()}. Authorities notified.`
        ];
      }

      // Create post with authentic Kenyan details
      feed.push({
        id: `post${i}`,
        user: {
          name: userName,
          handle: userHandle,
          location: location,
          region: region,
          flag: flag,
          avatar: isKenyan ? getAvatar(i, true) : getAvatar(1000 + i, false),
          verified: isKenyan && i % 7 === 0, // Some Kenyan profiles verified
          followers: Math.floor(Math.random() * 5000) + 100,
          joined: ["2024", "2025", "2026"][i % 3],
          badges: isKenyan && i % 10 === 0 ? ["Top Contributor", "Verified Trader"] : []
        },
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)).toISOString(),
        content: negativeContents[i % negativeContents.length],
        platform: platform,
        sentiment: "negative",
        likes: Math.floor(Math.random() * 800) + 200,
        dislikes: Math.floor(Math.random() * 20) + 1,
        replies: Math.floor(Math.random() * 80) + 10,
        views: Math.floor(Math.random() * 15000) + 3000,
        shares: Math.floor(Math.random() * 200) + 50,
        images: i % 15 === 0 ? [`https://images.unsplash.com/photo-${[1633158829585, 1569025743873, 1589666564459, 1611974789855][i % 4]}?w=600&h=400&fit=crop`] : null,
        verified: isKenyan && i % 5 === 0,
        pinned: false,
        awardCount: Math.floor(Math.random() * 10)
      });
    }

    // Add 50 positive reviews (mix of Kenyan and international)
    for (let i = 1; i <= 50; i++) {
      const isKenyan = i % 2 === 0;
      feed.push({
        id: `post${300 + i}`,
        user: {
          name: isKenyan ? kenyanProfiles[i % kenyanProfiles.length].name : `Trader${i}`,
          handle: isKenyan ? kenyanProfiles[i % kenyanProfiles.length].handle : `@trader${i}`,
          location: isKenyan ? `Nairobi, Kenya` : `International`,
          region: isKenyan ? "nairobi" : "global",
          flag: isKenyan ? "🇰🇪" : "🌍",
          avatar: isKenyan ? getAvatar(500 + i, true) : getAvatar(2000 + i, false),
          verified: true,
          followers: Math.floor(Math.random() * 10000) + 1000,
          joined: "2024"
        },
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        content: isKenyan ? 
          `Finally a legit platform! **ChartLordAI** has been paying consistently. Withdrew ${i % 2 === 0 ? 'KES' : '$'} ${(i * 10000).toLocaleString()} yesterday via M-Pesa. No issues. Trusted! ✅` :
          `**ChartLordAI** is legit. Been using for 3 months, up 25%. Withdrawals work perfectly. Recommended.`,
        platform: "ChartLordAI",
        sentiment: "positive",
        likes: Math.floor(Math.random() * 1000) + 500,
        dislikes: Math.floor(Math.random() * 10),
        replies: Math.floor(Math.random() * 60) + 20,
        views: Math.floor(Math.random() * 20000) + 5000,
        shares: Math.floor(Math.random() * 300) + 100,
        verified: true,
        pinned: i < 3 // Pin first few positive reviews
      });
    }

    // Add 150 neutral/discussion posts
    for (let i = 1; i <= 150; i++) {
      const isKenyan = i % 2 === 0;
      feed.push({
        id: `post${350 + i}`,
        user: {
          name: isKenyan ? kenyanProfiles[i % kenyanProfiles.length].name : `User${i}`,
          handle: isKenyan ? kenyanProfiles[i % kenyanProfiles.length].handle : `@user${i}`,
          location: isKenyan ? `Kenya` : `International`,
          region: isKenyan ? "kenya" : "global",
          flag: isKenyan ? "🇰🇪" : "🌍",
          avatar: isKenyan ? getAvatar(600 + i, true) : getAvatar(3000 + i, false),
          verified: false,
          followers: Math.floor(Math.random() * 1000) + 50
        },
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        content: isKenyan ?
          `Has anyone tried **${scamPlatforms[i % scamPlatforms.length]}**? They're advertising on TikTok Kenya. Scam or legit?` :
          `Looking for legit AI trading platforms. Any recommendations?`,
        platform: scamPlatforms[i % scamPlatforms.length],
        sentiment: "neutral",
        likes: Math.floor(Math.random() * 200) + 50,
        dislikes: Math.floor(Math.random() * 30) + 5,
        replies: Math.floor(Math.random() * 100) + 20,
        views: Math.floor(Math.random() * 5000) + 1000,
        shares: Math.floor(Math.random() * 50) + 10,
        verified: false
      });
    }

    return feed;
  };

  const initialFeed = generateInitialFeed();

  // Generate comprehensive comments
  const generateComments = () => {
    const comments = {};
    
    // Add comments for each post
    initialFeed.forEach((post, index) => {
      if (index % 3 === 0) { // Add comments to every 3rd post
        const numComments = Math.floor(Math.random() * 8) + 2;
        comments[post.id] = [];
        
        for (let j = 1; j <= numComments; j++) {
          const isKenyan = j % 2 === 0;
          comments[post.id].push({
            id: `c${post.id}_${j}`,
            user: {
              name: isKenyan ? kenyanProfiles[(index + j) % kenyanProfiles.length].name : `Commenter${j}`,
              handle: isKenyan ? kenyanProfiles[(index + j) % kenyanProfiles.length].handle : `@user${j}`,
              location: isKenyan ? "Kenya" : "International",
              avatar: isKenyan ? getAvatar(700 + index + j, true) : getAvatar(4000 + index + j, false),
              verified: false
            },
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 2 * 24 * 60 * 60 * 1000)).toISOString(),
            content: isKenyan ?
              [`Same here in Nairobi! Lost money too. Let's form a group to report to DCI.`,
               `Hii platform ni scam. I reported to cyber crimes already.`,
               `Wakenya wacha tuungane tukomeshe hizi scams.`,
               `My cousin also lost money. We're going to the police tomorrow.`,
               `Nimeona tangazo lao kwa IG. Good thing I saw this first.`][j % 5] :
              [`Same here. Lost my investment too.`,
               `Thanks for the warning.`,
               `Reported them to authorities.`,
               `We need to spread the word.`][j % 4],
            likes: Math.floor(Math.random() * 50) + 5,
            replies: Math.floor(Math.random() * 10)
          });
        }
      }
    });

    return comments;
  };

  const mockComments = generateComments();

  // Load data from localStorage
  useEffect(() => {
    const savedFeed = localStorage.getItem('live-trading-feed-v2');
    if (savedFeed) {
      setFeed(JSON.parse(savedFeed));
    } else {
      setFeed(initialFeed);
      localStorage.setItem('live-trading-feed-v2', JSON.stringify(initialFeed));
    }

    const savedLikes = localStorage.getItem('feed-likes-v2');
    if (savedLikes) setLikedPosts(JSON.parse(savedLikes));

    const savedDislikes = localStorage.getItem('feed-dislikes-v2');
    if (savedDislikes) setDislikedPosts(JSON.parse(savedDislikes));

    const savedSaved = localStorage.getItem('feed-saved-v2');
    if (savedSaved) setSavedPosts(JSON.parse(savedSaved));

    const savedComments = localStorage.getItem('feed-comments-v2');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments(mockComments);
      localStorage.setItem('feed-comments-v2', JSON.stringify(mockComments));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (feed.length > 0) {
      localStorage.setItem('live-trading-feed-v2', JSON.stringify(feed));
    }
  }, [feed]);

  useEffect(() => {
    localStorage.setItem('feed-likes-v2', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('feed-dislikes-v2', JSON.stringify(dislikedPosts));
  }, [dislikedPosts]);

  useEffect(() => {
    localStorage.setItem('feed-saved-v2', JSON.stringify(savedPosts));
  }, [savedPosts]);

  useEffect(() => {
    localStorage.setItem('feed-comments-v2', JSON.stringify(comments));
  }, [comments]);

  // Handle like
  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    if (dislikedPosts[postId]) {
      setDislikedPosts(prev => ({ ...prev, [postId]: false }));
    }

    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.likes + (likedPosts[postId] ? -1 : 1) - (dislikedPosts[postId] ? 1 : 0)
          }
        : post
    ));
  };

  // Handle dislike
  const handleDislike = (postId) => {
    setDislikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    if (likedPosts[postId]) {
      setLikedPosts(prev => ({ ...prev, [postId]: false }));
    }

    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            dislikes: post.dislikes + (dislikedPosts[postId] ? -1 : 1) - (likedPosts[postId] ? 1 : 0)
          }
        : post
    ));
  };

  // Handle save post
  const handleSave = (postId) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle share
  const handleShare = (postId) => {
    alert('Post link copied to clipboard!');
  };

  // Handle new post submission
  const handleNewPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: `post${Date.now()}`,
      user: {
        name: "Current User",
        handle: "@current_user",
        location: "Your Location",
        region: "global",
        flag: "🌍",
        avatar: getAvatar(9999),
        verified: false,
        followers: 0,
        joined: "2026"
      },
      timestamp: new Date().toISOString(),
      content: newPostContent,
      platform: "Unknown",
      sentiment: "neutral",
      likes: 0,
      dislikes: 0,
      replies: 0,
      views: 0,
      shares: 0,
      verified: false
    };

    setFeed([newPost, ...feed]);
    setNewPostContent('');
    setShowPostForm(false);
  };

  // Handle reply submission
  const handleReplySubmit = (postId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: `reply${Date.now()}`,
      user: {
        name: "Current User",
        handle: "@current_user",
        location: "Your Location",
        avatar: getAvatar(9999),
        verified: false
      },
      timestamp: new Date().toISOString(),
      content: replyText,
      likes: 0
    };

    setComments(prev => ({
      ...prev,
      [postId]: [newReply, ...(prev[postId] || [])]
    }));

    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: (post.replies || 0) + 1 }
        : post
    ));

    setReplyText('');
    setShowReplyBox(null);
  };

  // Filter feed by region
  const filteredFeed = selectedRegion === 'global' 
    ? feed 
    : feed.filter(post => {
        if (selectedRegion === 'kenya') return post.flag === '🇰🇪';
        if (selectedRegion === 'africa') return post.user.region === 'africa';
        return post.user.region === selectedRegion;
      });

  // Sort feed
  const sortedFeed = [...filteredFeed].sort((a, b) => {
    if (activeTab === 'hot') {
      const aScore = (a.likes * 2) + (a.replies * 3) + (a.shares * 4);
      const bScore = (b.likes * 2) + (b.replies * 3) + (b.shares * 4);
      return bScore - aScore;
    }
    if (activeTab === 'new') return new Date(b.timestamp) - new Date(a.timestamp);
    if (activeTab === 'top') return b.likes - a.likes;
    if (activeTab === 'controversial') return b.dislikes - a.dislikes;
    return 0;
  });

  // Get preview text
  const getPreviewText = (content, isExpanded) => {
    if (isExpanded) return content;
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  };

  // Calculate post score for Reddit-style display
  const getPostScore = (post) => {
    return post.likes - post.dislikes;
  };

  return (
    <>
      <Helmet>
        <title>Live Trading Feed Kenya | Real Trader Experiences & Scam Alerts</title>
        <meta name="description" content="Real-time feed of trader experiences in Kenya and worldwide. Live scam alerts, discussions, and verified reviews of AI trading platforms." />
        <meta name="keywords" content="trading scams Kenya, AI trading reviews, Forex scams Kenya, M-Pesa trading, investment alerts" />
        <meta property="og:title" content="Live Trading Feed Kenya" />
        <meta property="og:description" content="Real trader experiences & scam alerts" />
      </Helmet>

      <div className="live-feed-container">
        {/* Header */}
        <header className="feed-header">
          <div className="header-content">
            <div className="logo-area">
              <h1 className="logo">
                <FaChartLine className="logo-icon" />
                <span>r/<span className="logo-highlight">TradingScamsKE</span></span>
              </h1>
              <div className="live-badge">
                <span className="live-dot"></span>
                {feed.length.toLocaleString()} LIVE
              </div>
            </div>
            
            <div className="header-actions">
              <button className="post-btn" onClick={() => setShowPostForm(true)}>
                <FaRegCommentDots /> Create Post
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="feed-nav">
            {/* Region selector */}
            <div className="region-selector">
              {regions.map(region => (
                <button
                  key={region.code}
                  className={`region-chip ${selectedRegion === region.code ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(region.code)}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="feed-tabs">
              <button 
                className={`tab ${activeTab === 'hot' ? 'active' : ''}`}
                onClick={() => setActiveTab('hot')}
              >
                🔥 Hot
              </button>
              <button 
                className={`tab ${activeTab === 'new' ? 'active' : ''}`}
                onClick={() => setActiveTab('new')}
              >
                ✨ New
              </button>
              <button 
                className={`tab ${activeTab === 'top' ? 'active' : ''}`}
                onClick={() => setActiveTab('top')}
              >
                📈 Top
              </button>
              <button 
                className={`tab ${activeTab === 'controversial' ? 'active' : ''}`}
                onClick={() => setActiveTab('controversial')}
              >
                ⚡ Controversial
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="feed-main">
          {/* Left sidebar - Trending */}
          <aside className="trending-sidebar">
            <div className="trending-card">
              <h3>🔥 Trending in Kenya</h3>
              <div className="trending-list">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="trending-item">
                    <div className="trending-rank">#{index + 1}</div>
                    <div className="trending-content">
                      <div className="trending-tag">
                        <span className="trending-emoji">{topic.emoji}</span>
                        <span className="trending-name">r/{topic.tag}</span>
                      </div>
                      <div className="trending-stats">
                        <span className="trending-posts">{topic.posts.toLocaleString()} posts</span>
                        <span className={`sentiment-badge ${topic.sentiment}`}>
                          {topic.sentiment === 'negative' ? '⚠️' : 
                           topic.sentiment === 'positive' ? '✅' : 
                           topic.sentiment === 'warning' ? '🚨' : '💬'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="trending-card">
              <h3>🇰🇪 Active in Kenya</h3>
              <div className="region-stats">
                <div className="region-stat">
                  <span className="region-name">📍 Nairobi</span>
                  <span className="region-stat-count">
                    {feed.filter(p => p.user.region === 'nairobi').length} posts
                  </span>
                </div>
                <div className="region-stat">
                  <span className="region-name">📍 Mombasa</span>
                  <span className="region-stat-count">
                    {feed.filter(p => p.user.region === 'mombasa').length} posts
                  </span>
                </div>
                <div className="region-stat">
                  <span className="region-name">📍 Kisumu</span>
                  <span className="region-stat-count">
                    {feed.filter(p => p.user.region === 'kisumu').length} posts
                  </span>
                </div>
                <div className="region-stat">
                  <span className="region-name">📍 Nakuru</span>
                  <span className="region-stat-count">
                    {feed.filter(p => p.user.region === 'nakuru').length} posts
                  </span>
                </div>
                <div className="region-stat">
                  <span className="region-name">📍 Eldoret</span>
                  <span className="region-stat-count">
                    {feed.filter(p => p.user.region === 'eldoret').length} posts
                  </span>
                </div>
              </div>
            </div>

            <div className="trending-card">
              <h3>🚨 Urgent Scam Alerts</h3>
              <div className="alert-list">
                <div className="alert-item urgent">
                  <span className="alert-icon">🚨</span>
                  <div className="alert-content">
                    <div className="alert-title">TradeMaster KE - OFFICE CLOSED</div>
                    <div className="alert-desc">Westlands office empty. 500+ victims</div>
                  </div>
                </div>
                <div className="alert-item urgent">
                  <span className="alert-icon">🚨</span>
                  <div className="alert-content">
                    <div className="alert-title">CryptoPulse - M-Pesa Line Off</div>
                    <div className="alert-desc">Paybill number 247xxx no longer active</div>
                  </div>
                </div>
                <div className="alert-item warning">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-content">
                    <div className="alert-title">NeuralTrade - Under DCI Investigation</div>
                    <div className="alert-desc">Directors arrested at JKIA</div>
                  </div>
                </div>
                <div className="alert-item warning">
                  <span className="alert-icon">📢</span>
                  <div className="alert-content">
                    <div className="alert-title">CBK Warning: 10 Platforms Unlicensed</div>
                    <div className="alert-desc">Full list released today</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="trending-card">
              <h3>🏆 Top Contributors</h3>
              <div className="top-contributors">
                <div className="contributor-item">
                  <FaCrown className="crown-gold" />
                  <img src={kenyanAvatars[0]} alt="user" className="contributor-avatar" />
                  <span className="contributor-name">@james_omo</span>
                  <span className="contributor-karma">12.4k karma</span>
                </div>
                <div className="contributor-item">
                  <FaCrown className="crown-silver" />
                  <img src={kenyanAvatars[2]} alt="user" className="contributor-avatar" />
                  <span className="contributor-name">@mary_akinyi</span>
                  <span className="contributor-karma">8.7k karma</span>
                </div>
                <div className="contributor-item">
                  <FaCrown className="crown-bronze" />
                  <img src={kenyanAvatars[5]} alt="user" className="contributor-avatar" />
                  <span className="contributor-name">@john_mwangi</span>
                  <span className="contributor-karma">6.2k karma</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main feed - ALL REVIEWS VISIBLE */}
          <div className="feed-content">
            {sortedFeed.map(post => (
              <article key={post.id} className={`feed-post ${post.pinned ? 'pinned' : ''} sentiment-${post.sentiment}`}>
                {post.pinned && (
                  <div className="pinned-badge">
                    <FaFire /> Popular Discussion
                  </div>
                )}
                
                {/* Post vote column (Reddit style) */}
                <div className="post-vote-column">
                  <button 
                    className={`vote-btn upvote ${likedPosts[post.id] ? 'active' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    ▲
                  </button>
                  <span className="vote-score">{getPostScore(post)}</span>
                  <button 
                    className={`vote-btn downvote ${dislikedPosts[post.id] ? 'active' : ''}`}
                    onClick={() => handleDislike(post.id)}
                  >
                    ▼
                  </button>
                </div>

                {/* Post content */}
                <div className="post-main-content">
                  <div className="post-header">
                    <div className="user-info">
                      <img 
                        src={post.user.avatar} 
                        alt={post.user.name}
                        className="user-avatar"
                      />
                      <div className="user-details">
                        <div className="user-name-line">
                          <span className="user-name">{post.user.name}</span>
                          {post.user.verified && (
                            <FaCheckCircle className="verified-badge" />
                          )}
                          <span className="user-handle">{post.user.handle}</span>
                          {post.user.badges && post.user.badges.map((badge, idx) => (
                            <span key={idx} className="user-badge">{badge}</span>
                          ))}
                        </div>
                        <div className="post-meta">
                          <span className="user-location">
                            {post.user.flag} {post.user.location}
                          </span>
                          <span className="post-time">
                            <FaRegClock /> {getTimeAgo(post.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className={`save-btn ${savedPosts[post.id] ? 'saved' : ''}`}
                        onClick={() => handleSave(post.id)}
                      >
                        <FaBookmark />
                      </button>
                      <button className="menu-btn">
                        <FaEllipsisH />
                      </button>
                    </div>
                  </div>

                  <div className="post-content" onClick={() => toggleExpand(post.id)}>
                    <p className="post-text">
                      {getPreviewText(post.content, expandedPosts[post.id])}
                    </p>
                    {post.content.length > 200 && (
                      <button className="expand-btn">
                        {expandedPosts[post.id] ? <FaChevronUp /> : <FaChevronDown />}
                        <span>{expandedPosts[post.id] ? 'Show less' : 'Read more'}</span>
                      </button>
                    )}
                    {post.images && expandedPosts[post.id] && (
                      <div className="post-images">
                        <img src={post.images[0]} alt="Post" />
                      </div>
                    )}
                  </div>

                  <div className="post-stats">
                    <span className="stat-item">
                      <FaChartLine /> {post.views.toLocaleString()} views
                    </span>
                    <span className="stat-item">
                      <FaRegCommentDots /> {post.replies} comments
                    </span>
                    <span className="stat-item">
                      <FaShare /> {post.shares} shares
                    </span>
                    {post.awardCount > 0 && (
                      <span className="stat-item award">
                        <FaAward /> {post.awardCount} awards
                      </span>
                    )}
                  </div>

                  <div className="post-engagement">
                    <button 
                      className={`engage-btn comment-btn`}
                      onClick={() => setShowReplyBox(showReplyBox === post.id ? null : post.id)}
                    >
                      <FaRegCommentDots /> {post.replies} Comments
                    </button>
                    <button 
                      className={`engage-btn share-btn`}
                      onClick={() => handleShare(post.id)}
                    >
                      <FaShare /> Share
                    </button>
                    <button 
                      className={`engage-btn save-mobile ${savedPosts[post.id] ? 'saved' : ''}`}
                      onClick={() => handleSave(post.id)}
                    >
                      <FaBookmark /> Save
                    </button>
                  </div>

                  {/* Reply box */}
                  {showReplyBox === post.id && (
                    <div className="reply-box">
                      <textarea
                        placeholder="What are your thoughts?"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="3"
                      />
                      <div className="reply-actions">
                        <button 
                          className="cancel-reply"
                          onClick={() => setShowReplyBox(null)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="submit-reply"
                          onClick={() => handleReplySubmit(post.id)}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Comments section */}
                  {comments[post.id] && comments[post.id].length > 0 && (
                    <div className="comments-section">
                      <div className="comments-header">
                        <h4>Comments</h4>
                        <select 
                          className="sort-select"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="best">Best</option>
                          <option value="new">New</option>
                          <option value="top">Top</option>
                        </select>
                      </div>
                      {comments[post.id].map(comment => (
                        <div key={comment.id} className="comment">
                          <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name}
                            className="comment-avatar"
                          />
                          <div className="comment-content">
                            <div className="comment-header">
                              <span className="comment-name">{comment.user.name}</span>
                              <span className="comment-handle">{comment.user.handle}</span>
                              <span className="comment-time">{getTimeAgo(comment.timestamp)}</span>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                            <div className="comment-actions">
                              <button className="comment-like">
                                ▲ {comment.likes}
                              </button>
                              <button className="comment-reply">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Right sidebar */}
          <aside className="right-sidebar">
            {/* Create post card */}
            {showPostForm ? (
              <div className="post-form-card">
                <h3>Create a post</h3>
                <form onSubmit={handleNewPost}>
                  <textarea
                    placeholder="Share your trading experience or scam alert..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows="5"
                    autoFocus
                  />
                  <div className="post-form-actions">
                    <button type="button" onClick={() => setShowPostForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" disabled={!newPostContent.trim()}>
                      Post
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="post-prompt-card" onClick={() => setShowPostForm(true)}>
                <img src={kenyanAvatars[7]} alt="avatar" className="prompt-avatar" />
                <span>Share your trading experience...</span>
                <button className="prompt-post-btn">Post</button>
              </div>
            )}

            {/* Community guidelines */}
            <div className="guidelines-card">
              <h3>🇰🇪 r/TradingScamsKE Rules</h3>
              <ul className="guidelines-list">
                <li>🚫 No promotion of scam platforms</li>
                <li>📸 Provide evidence when possible</li>
                <li>🤝 Be respectful to victims</li>
                <li>📢 Report suspected scams</li>
                <li>💰 No recovery scams</li>
                <li>🇰🇪 Kenyan context encouraged</li>
              </ul>
            </div>

            {/* Active Kenyan users */}
            <div className="active-users-card">
              <h3>👥 Active Kenyans Now</h3>
              <div className="active-users-list">
                {kenyanProfiles.slice(0, 5).map((profile, index) => (
                  <div key={index} className="active-user">
                    <img src={kenyanAvatars[index]} alt={profile.name} />
                    <div className="active-user-info">
                      <span className="active-user-name">{profile.handle}</span>
                      <span className="active-user-stats">{profile.location}</span>
                    </div>
                    <span className="active-dot"></span>
                  </div>
                ))}
              </div>
            </div>

            {/* M-Pesa scam alert */}
            <div className="mpesa-alert-card">
              <h3>📱 M-Pesa Scam Alert</h3>
              <p>Never send money to unknown paybill numbers claiming to be trading platforms. Legit platforms use registered companies.</p>
              <div className="mpesa-tips">
                <div className="tip">✅ Check business name</div>
                <div className="tip">✅ Verify with CBK</div>
                <div className="tip">❌ Don't send "activation fees"</div>
              </div>
            </div>

            {/* Recent media from Kenya */}
            <div className="media-card">
              <h3>📸 Recent from Kenya</h3>
              <div className="media-grid">
                <img src="https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=100&h=100&fit=crop" alt="Nairobi" />
                <img src="https://images.unsplash.com/photo-1578911595546-5cee2da4bfd5?w=100&h=100&fit=crop" alt="Mombasa" />
                <img src="https://images.unsplash.com/photo-1580062262453-ffb7e9b1a56a?w=100&h=100&fit=crop" alt="Kisumu" />
                <img src="https://images.unsplash.com/photo-1565538808187-cad6204c4b9a?w=100&h=100&fit=crop" alt="Nakuru" />
              </div>
            </div>

            {/* Important contacts */}
            <div className="contacts-card">
              <h3>📞 Report Scams</h3>
              <div className="contact-item">
                <span>DCI Cyber Crimes</span>
                <span>#333</span>
              </div>
              <div className="contact-item">
                <span>CBK Fraud Desk</span>
                <span>020-2860000</span>
              </div>
              <div className="contact-item">
                <span>M-Pesa Fraud</span>
                <span>234</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="feed-footer">
          <div className="footer-content">
            <div className="footer-stats">
              <span>📊 {feed.length.toLocaleString()} total posts</span>
              <span>🇰🇪 {feed.filter(p => p.flag === '🇰🇪').length} Kenyan posts</span>
              <span>🚨 {feed.filter(p => p.sentiment === 'negative').length} scam alerts</span>
            </div>
            <div className="footer-links">
              <a href="/about">About r/TradingScamsKE</a>
              <a href="/guidelines">Community Rules</a>
              <a href="/privacy">Privacy</a>
              <a href="/contact">Contact Mods</a>
              <a href="/resources">Resources</a>
            </div>
            <p className="footer-disclaimer">
              ⚠️ This is a community-driven platform. Always verify information independently. 
              Trading carries significant risk. Never invest more than you can afford to lose.
            </p>
            <p className="footer-copyright">
              © 2026 r/TradingScamsKE. Dedicated to exposing scams in Kenya and beyond.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LiveTradingReviews;