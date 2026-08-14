export const projectsData = [
  {
    slug: 'guardiansense',
    title: 'Guardian Sense',
    subtitle: 'Safety-Critical On-Device Emergency Response System',
    category: 'AI/ML & Mobile',
    year: '2024',
    featured: true,
    image: '/GS.jpg',
    github: 'https://github.com/Abdullahar990',
    summary:
      'An on-device AI emergency detection platform that monitors real-time motion sensor streams to detect vehicle accidents and severe falls with sub-800ms response time.',
    overview:
      'GuardianSense addresses emergency response delays by processing 6-axis accelerometer and gyroscope telemetry directly on user smartphones. Using a lightweight ONNX-converted deep learning pipeline, the system detects critical kinetic anomalies without relying on continuous cloud connectivity.',
    metrics: [
      { label: 'Detection Accuracy', value: '92%' },
      { label: 'Inference Latency', value: '<800ms' },
      { label: 'Concurrent Users', value: '50+' },
      { label: 'Sampling Frequency', value: '50 Hz' },
    ],
    tech: ['Next.js', 'Node.js', 'Flutter', 'MongoDB', 'TensorFlow', 'ONNX', 'Python'],
    architectureDetails: [
      {
        title: 'Hybrid Deep Learning Pipeline',
        description:
          'Combines a Bidirectional LSTM Autoencoder to model normal human motion kinematics with an Isolation Forest that scores residual reconstruction error.',
      },
      {
        title: 'Edge Deployment via ONNX',
        description:
          'Quantized TensorFlow models deployed natively in Flutter for zero-network dependency during severe physical collisions.',
      },
      {
        title: 'Multi-Role Emergency Portals',
        description:
          'Three role-specific Next.js dashboards (Hospital dispatch, Police coordination, and System Admin) backed by authenticated Node.js REST services.',
      },
    ],
    stages: [
      {
        step: '00',
        tag: 'CHASSIS ASSEMBLED',
        title: 'GuardianSense Edge Runtime',
        desc: 'Self-contained safety runtime executing low-latency inference on device hardware.',
      },
      {
        step: '01',
        tag: 'TELEMETRY INGESTION',
        title: 'Raw Sensor Stream (IMU)',
        desc: 'Continuous 50Hz 6-axis accelerometer and gyroscope data captured and normalized.',
      },
      {
        step: '02',
        tag: 'NEURAL RECONSTRUCTION',
        title: 'BiLSTM Autoencoder',
        desc: 'Temporal recurrent network reconstructs nominal kinetic trajectories to produce residual error vectors.',
      },
      {
        step: '03',
        tag: 'ANOMALY ISOLATION',
        title: 'Isolation Forest Scoring',
        desc: 'Tree-based anomaly detector evaluates reconstruction residuals against calibrated decision thresholds.',
      },
      {
        step: '04',
        tag: 'INCIDENT DISPATCH',
        title: 'On-Device Emergency Alert',
        desc: 'Crossed threshold triggers immediate automated dispatch to hospital and police services in <800ms.',
      },
    ],
  },
  {
    slug: 'check-inn',
    title: 'Check INN, Chill Out',
    subtitle: 'Full-Stack Hotel Management & Booking Platform',
    category: 'Full-Stack Web',
    year: '2024',
    featured: false,
    image: '/Hotel.jpg',
    github: 'https://github.com/Abdullahar990/check-inn-chill-out',
    summary:
      'A full-featured hospitality platform featuring real-time room availability calculation, customer reservation flows, and role-based administrative consoles.',
    overview:
      'Check INN, Chill Out is a production-oriented MERN platform built to streamline hotel room allocation and guest checkout cycles. It incorporates JWT-secured endpoint guards and atomic database transactions to eliminate double-booking vulnerabilities.',
    metrics: [
      { label: 'API Security', value: 'JWT RBAC' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'Latency', value: '<120ms' },
      { label: 'Uptime Target', value: '99.9%' },
    ],
    tech: ['Next.js', 'MongoDB', 'Node.js', 'Express.js', 'JWT', 'Bootstrap'],
    architectureDetails: [
      {
        title: 'Atomic Booking Engine',
        description:
          'Utilizes MongoDB transactional sessions to guarantee consistency during concurrent reservation attempts across high-demand dates.',
      },
      {
        title: 'Role-Based Access Control',
        description:
          'Granular permission tiers distinguishing Guests, Front-Desk Managers, and System Administrators with cryptographic token verification.',
      },
      {
        title: 'Optimized REST Services',
        description:
          'Express backend with indexed querying for fast room search filtering by occupancy, pricing, and amenities.',
      },
    ],
    stages: [
      {
        step: '00',
        tag: 'IDLE GATEWAY',
        title: 'Client Request Ingestion',
        desc: 'Guest client initiates room query or reservation payload from Next.js web application.',
      },
      {
        step: '01',
        tag: 'AUTH VERIFICATION',
        title: 'JWT Security Middleware',
        desc: 'Bearer token decoded and verified against cryptographic signature; role permissions validated.',
      },
      {
        step: '02',
        tag: 'TRANSACTION EXECUTION',
        title: 'Booking Engine & MongoDB Lock',
        desc: 'Atomic query verifies room availability across target date range and provisions temporary reservation hold.',
      },
      {
        step: '03',
        tag: 'STATE CONFIRMATION',
        title: 'Express REST Confirmation',
        desc: 'Transaction committed; updated booking state and receipt returned to client in under 120ms.',
      },
    ],
  },
  {
    slug: 'disease-prediction',
    title: 'Disease Prediction System',
    subtitle: 'Diagnostic Machine Learning Classifier Evaluation',
    category: 'Machine Learning',
    year: '2023',
    featured: false,
    image: '/DPA.jpg',
    github: 'https://github.com/Abdullahar990/Disease-Prediction-App',
    summary:
      'A comparative diagnostic pipeline trained on 5,000+ clinical records, applying SMOTE class balancing across 4 classical machine learning architectures.',
    overview:
      'A clinical decision-support diagnostic system built to evaluate symptom patterns against medical records. The project implemented a rigorous benchmarking pipeline comparing Random Forest, Support Vector Machines, K-Nearest Neighbors, and Logistic Regression under imbalanced class distributions.',
    metrics: [
      { label: 'Top Accuracy', value: '88%' },
      { label: 'Patient Records', value: '5,000+' },
      { label: 'Models Evaluated', value: '4 ML' },
      { label: 'Class Balancing', value: 'SMOTE' },
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask'],
    architectureDetails: [
      {
        title: 'SMOTE Class Oversampling',
        description:
          'Synthetically augmented minority diagnostic categories to resolve extreme medical dataset class imbalances prior to training.',
      },
      {
        title: 'Multi-Classifier Benchmarking',
        description:
          'Evaluated Random Forest, SVM (RBF kernel), KNN, and Logistic Regression with 5-fold cross-validation and hyperparameter grid searches.',
      },
      {
        title: 'Lightweight Flask API',
        description:
          'Serialized winning Random Forest weights with joblib for instant symptom probability evaluation via REST endpoint.',
      },
    ],
    stages: [
      {
        step: '00',
        tag: 'DATA INGESTION',
        title: '5,000+ Clinical Records',
        desc: 'Raw multi-feature medical records ingested and cleansed with missing value imputation.',
      },
      {
        step: '01',
        tag: 'CLASS BALANCING',
        title: 'SMOTE Synthetic Sampling',
        desc: 'Synthetic Minority Over-sampling Technique equalizes diagnostic category representation.',
      },
      {
        step: '02',
        tag: 'PARALLEL BENCHMARK',
        title: '4 ML Classifiers Trained',
        desc: 'Simultaneous cross-validated training across Random Forest, SVM, KNN, and Logistic Regression.',
      },
      {
        step: '03',
        tag: 'OPTIMAL SELECTION',
        title: 'Winning Model (88% Accuracy)',
        desc: 'Top-performing ensemble selected and serialized into Flask microservice for real-time symptom scoring.',
      },
    ],
  },
  {
    slug: 'spare-parts',
    title: 'Spare Parts Management',
    subtitle: 'Warehouse Logistics & Inventory Threshold Tracking',
    category: 'Systems & Backend',
    year: '2023',
    featured: false,
    image: '/Spare.jpg',
    github: 'https://github.com/Abdullahar990/Spare-Parts-Management-System',
    summary:
      'An enterprise inventory database system featuring automated replenishment triggers and indexed query optimization that cut report latency by 40%.',
    overview:
      'Designed for industrial warehouse operations, this management system tracks multi-category spare parts, vendor purchase orders, and issuance logs. The backend leverages optimized composite indexing to maintain sub-second query performance during heavy inventory reconciliation cycles.',
    metrics: [
      { label: 'Query Latency Reduction', value: '40%' },
      { label: 'Catalog Items', value: '1,000+' },
      { label: 'Architecture', value: 'PHP/MySQL' },
      { label: 'Alerting', value: 'Automated' },
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'Bootstrap'],
    architectureDetails: [
      {
        title: 'Composite Index Optimization',
        description:
          'Restructured relational schemas with multi-column B-tree indexes, reducing complex inventory aggregation report generation time by 40%.',
      },
      {
        title: 'Threshold-Triggered Alerts',
        description:
          'Automated database triggers monitor real-time stock levels against minimum safety margins to generate reorder requests.',
      },
      {
        title: 'Audit Logging & Tracking',
        description:
          'Full chronological event logging tracking part check-ins, requisition approvals, and warehouse technician signatures.',
      },
    ],
    stages: [
      {
        step: '00',
        tag: 'TRANSACTION ENTRY',
        title: 'Stock Movement Ingested',
        desc: 'Warehouse technician records part issuance or incoming shipment in web console.',
      },
      {
        step: '01',
        tag: 'INDEXED QUERY',
        title: 'MySQL B-Tree Evaluation',
        desc: 'Optimized indexed query compares updated quantities against SKU safety stock thresholds.',
      },
      {
        step: '02',
        tag: 'THRESHOLD TRIGGER',
        title: 'Automated Reorder Dispatch',
        desc: 'Depleted part levels fire immediate procurement requisition alert to warehouse managers.',
      },
      {
        step: '03',
        tag: 'ANALYTICS GENERATION',
        title: 'Report Output (-40% Latency)',
        desc: 'Aggregated logistics report produced with 40% reduced execution time via optimized relational schema.',
      },
    ],
  },
];
