import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_USERS,
  MOCK_HIVES,
  MOCK_HARVESTS,
  MOCK_PRODUCTS,
  MOCK_BATCHES,
  MOCK_NOTIFICATIONS,
  MOCK_MONTHLY_PRODUCTION
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged in user (defaults to beekeeper for demo, can switch to admin or customer)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('agritrace_user');
    return saved ? JSON.parse(saved) : MOCK_USERS[1]; // Sujeet Kumar (Beekeeper)
  });

  const [hives, setHives] = useState(() => {
    const saved = localStorage.getItem('agritrace_hives');
    return saved ? JSON.parse(saved) : MOCK_HIVES;
  });

  const [harvests, setHarvests] = useState(() => {
    const saved = localStorage.getItem('agritrace_harvests');
    return saved ? JSON.parse(saved) : MOCK_HARVESTS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('agritrace_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('agritrace_batches');
    return saved ? JSON.parse(saved) : MOCK_BATCHES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('agritrace_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Save changes to localStorage for persistent interactive demos
  useEffect(() => {
    localStorage.setItem('agritrace_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('agritrace_hives', JSON.stringify(hives));
  }, [hives]);

  useEffect(() => {
    localStorage.setItem('agritrace_harvests', JSON.stringify(harvests));
  }, [harvests]);

  useEffect(() => {
    localStorage.setItem('agritrace_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('agritrace_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Role Switcher / Demo Login
  const switchRole = (roleKey) => {
    const user = MOCK_USERS.find(u => u.roleKey === roleKey) || MOCK_USERS[1];
    setCurrentUser(user);
  };

  const loginAsUser = (email) => {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    // Default fallback to beekeeper
    setCurrentUser(MOCK_USERS[1]);
    return { success: true, user: MOCK_USERS[1] };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Add new Hive
  const addHive = (newHive) => {
    const hiveId = newHive.id || `HIVE-00${hives.length + 1}`;
    const hiveRecord = {
      ...newHive,
      id: hiveId,
      temperature: '34.6°C',
      humidity: '60%',
      hiveWeight: '35.0 KG',
      framesCount: Number(newHive.framesCount) || 10,
      lastInspection: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      honeyProducedKg: 0,
      inspections: [
        {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          inspector: currentUser ? currentUser.name : 'Inspector',
          broodStatus: 'Established',
          stores: 'Initial Setup',
          parasiteCount: 'None',
          status: newHive.healthStatus || 'Healthy'
        }
      ]
    };
    setHives([hiveRecord, ...hives]);

    addNotification({
      title: 'New Hive Added',
      message: `Hive ${hiveId} (${hiveRecord.name}) added to management registry.`,
      type: 'success',
      link: `/hives/${hiveId}`
    });

    return hiveRecord;
  };

  // Add new Harvest
  const addHarvest = (newHarvest) => {
    const harvestId = `HRV-2026-00${harvests.length + 1}`;
    const harvestRecord = {
      ...newHarvest,
      id: harvestId,
      quantity: Number(newHarvest.quantity),
      batchId: newHarvest.batchId || null
    };
    setHarvests([harvestRecord, ...harvests]);

    addNotification({
      title: 'Harvest Logged',
      message: `${harvestRecord.quantity} ${harvestRecord.unit} of ${harvestRecord.honeyType} recorded from ${harvestRecord.hiveId}.`,
      type: 'success',
      link: '/harvest'
    });

    return harvestRecord;
  };

  // Add new Batch
  const addBatch = (newBatch) => {
    const prefix = newBatch.productCategory === 'Honey' ? 'HNY' : (newBatch.productCategory || 'AGRI').substring(0, 3).toUpperCase();
    const batchId = newBatch.id || `${prefix}-2026-00${batches.length + 1}`;
    
    // Generate realistic demo blockchain data
    const mockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const mockTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const blockNumber = (1984210 + batches.length + 1).toString();

    const batchRecord = {
      ...newBatch,
      id: batchId,
      status: 'Verified',
      qrCodeGenerated: true,
      blockchain: {
        network: 'AgriTrace Consortium Ledger (Prototype)',
        blockNumber,
        dataHash: mockHash,
        transactionId: mockTx,
        gasUsed: '47,500',
        smartContract: newBatch.productCategory === 'Honey' ? '0xAgriTraceHoneyRegistryV2_09A1' : '0xAgriTraceMultiCropRegistry_01F9',
        merkleRoot: '0x' + mockHash.substring(2, 22),
        verificationStatus: 'Verified & Tamper-Evident',
        isPrototype: true
      },
      traceabilityJourney: newBatch.traceabilityJourney || [
        {
          step: 1,
          title: 'Farm / Hive Origin Recorded',
          actor: newBatch.producer || currentUser?.name,
          location: newBatch.origin || 'Karnataka, India',
          timestamp: new Date().toLocaleString(),
          status: 'Completed',
          details: `Source registration recorded with IoT coordinates.`
        },
        {
          step: 2,
          title: 'Harvest & Initial Processing',
          actor: 'Certified Field Team',
          location: newBatch.origin || 'Karnataka, India',
          timestamp: new Date().toLocaleString(),
          status: 'Completed',
          details: `Harvest quantity ${newBatch.quantity} verified.`
        },
        {
          step: 3,
          title: 'Quality Grade & Moisture Testing',
          actor: 'NABL Certified Quality Wing',
          location: 'Regional Testing Station',
          timestamp: new Date().toLocaleString(),
          status: 'Completed',
          details: `Moisture: ${newBatch.moistureLevel || 'Standard'}. Grade: ${newBatch.qualityGrade || 'Grade A'}.`
        },
        {
          step: 4,
          title: 'Food-Safe Sealed Packaging',
          actor: 'EcoPack India Line',
          location: 'Processing Hub',
          timestamp: new Date().toLocaleString(),
          status: 'Completed',
          details: `${newBatch.packagingType || 'Food Grade Packaging'} with tamper-evident seal.`
        },
        {
          step: 5,
          title: 'Prototype Blockchain Ledger Anchored',
          actor: 'AgriTrace Smart Contract',
          location: 'Decentralized Agri Node Cluster',
          timestamp: new Date().toLocaleString(),
          status: 'Completed',
          details: `Anchored to Block #${blockNumber} with SHA-256 hash.`
        },
        {
          step: 6,
          title: 'Public QR Verification Live',
          actor: 'Customer Verification Gateway',
          location: 'Point of Sale / Web',
          timestamp: new Date().toLocaleString(),
          status: 'Active',
          details: 'Ready for consumer scanning and tamper-evident journey exploration.'
        }
      ]
    };

    setBatches([batchRecord, ...batches]);

    addNotification({
      title: 'Batch Generated & Verified',
      message: `Batch ${batchId} for ${batchRecord.product} generated and registered on prototype blockchain.`,
      type: 'success',
      link: `/batches/${batchId}`
    });

    return batchRecord;
  };

  // Add Notification
  const addNotification = ({ title, message, type = 'info', link = null }) => {
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
      link
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setHives(MOCK_HIVES);
    setHarvests(MOCK_HARVESTS);
    setProducts(MOCK_PRODUCTS);
    setBatches(MOCK_BATCHES);
    setNotifications(MOCK_NOTIFICATIONS);
    setCurrentUser(MOCK_USERS[1]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        loginAsUser,
        logout,
        hives,
        addHive,
        harvests,
        addHarvest,
        products,
        batches,
        addBatch,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        searchQuery,
        setSearchQuery,
        monthlyProduction: MOCK_MONTHLY_PRODUCTION,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
