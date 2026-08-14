export const projectsData = [
  {
    slug: 'guardiansense',
    title: 'Guardian Sense',
    subtitle: 'Safety-Critical On-Device Emergency Accident Response System',
    category: 'AI/ML & Mobile',
    year: '2024',
    featured: true,
    image: '/GS.jpg',
    github: 'https://github.com/Abdullahar990',
    summary:
      'An on-device AI emergency detection platform that monitors smartphone sensor streams (accelerometer + gyroscope) to detect accidents and falls with sub-800ms response time.',
    overview:
      'GuardianSense eliminates emergency response dispatch delays by running motion inference directly on edge devices without cloud connectivity dependencies. A lightweight quantized model analyzes 50Hz kinetic telemetry, notifying authenticated hospital, police, and admin portals through Supabase and Node.js backend services.',
    metrics: [
      { label: 'Detection Accuracy', value: '92%' },
      { label: 'Inference Latency', value: '<800ms' },
      { label: 'Telemetry Rate', value: '50 Hz' },
      { label: 'Portals', value: '3 Web Apps' },
    ],
    tech: ['Flutter', 'ONNX', 'TensorFlow', 'Python', 'Next.js', 'Node.js', 'Supabase'],
    architectureDetails: [
      {
        title: 'On-Device Mobile Inference',
        description:
          'Flutter mobile client ingesting 6-axis IMU streams at 50Hz and running quantized LSTM Autoencoder + Isolation Forest inference locally via ONNX runtime.',
      },
      {
        title: 'Hybrid Anomaly Architecture',
        description:
          'Temporal BiLSTM reconstructs expected nominal motion trajectories; Isolation Forest evaluates reconstruction residual vectors to flag severe kinetic impacts.',
      },
      {
        title: 'Tri-Portal Dispatch System',
        description:
          'Three dedicated Next.js web applications (Hospital, Police, System Admin) receiving real-time emergency telemetry dispatches with sub-800ms latency.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'IMU INGESTION',
        title: '6-Axis Kinetic Telemetry',
        desc: 'Continuous 50Hz accelerometer and gyroscope sampling on mobile device capturing baseline human motion kinematics.',
      },
      {
        step: '02',
        tag: 'TEMPORAL RECONSTRUCTION',
        title: 'BiLSTM Autoencoder (ONNX)',
        desc: 'Quantized neural network reconstructs expected motion trajectories; abnormal movement produces high reconstruction residuals.',
      },
      {
        step: '03',
        tag: 'ANOMALY SCORING',
        title: 'Isolation Forest Thresholding',
        desc: 'Tree-based anomaly detector evaluates error residuals, distinguishing severe collision impacts and falls from daily activity.',
      },
      {
        step: '04',
        tag: 'DISPATCH ORCHESTRATION',
        title: 'Tri-Portal Dispatch Broadcast',
        desc: 'Emergency incident state propagates in <800ms to Hospital, Police, and Admin web dashboards via Supabase and Node.js backend.',
      },
    ],
  },
  {
    slug: 'check-inn',
    title: 'Check INN, Chill Out',
    subtitle: 'Modular Hotel Booking & Property Listing Front-End Application',
    category: 'Frontend Web Engineering',
    year: '2024',
    featured: false,
    image: '/Hotel.jpg',
    github: 'https://github.com/Abdullahar990/check-inn-chill-out',
    summary:
      'A full front-end build of a hotel booking flow — search, room details, booking, and an owner-facing add-hotel form — built in Next.js with componentized, reusable UI across guest and owner views.',
    overview:
      'Check INN, Chill Out is a modular front-end hospitality application created with Next.js and React. The project demonstrates component architecture, responsive layout design, state management for booking interactions, and structured forms for hotel property onboarding.',
    metrics: [
      { label: 'Architecture', value: 'Next.js UI' },
      { label: 'Components', value: 'Modular / Reusable' },
      { label: 'Views', value: 'Guest + Owner' },
      { label: 'Responsive', value: 'Mobile-First' },
    ],
    tech: ['Next.js', 'React', 'HTML5', 'CSS Modules', 'JavaScript'],
    architectureDetails: [
      {
        title: 'Componentized UI Architecture',
        description:
          'Structured Next.js component hierarchy separating layout primitives, search filters, interactive room detail viewports, and owner property forms.',
      },
      {
        title: 'Multi-View Customer Journeys',
        description:
          'Dual interface design accommodating both guest reservation browsing flows and hotel owner onboarding and room management screens.',
      },
      {
        title: 'Client-Side Interaction State',
        description:
          'Dynamic state handling for date selections, guest count modifiers, room pricing calculations, and interactive form input validations.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'DISCOVERY VIEW',
        title: 'Search & Property Filter UI',
        desc: 'Guest browses property inventory with client-side location filters, date-pickers, and room amenity criteria.',
      },
      {
        step: '02',
        tag: 'INSPECTION VIEW',
        title: 'Room Details & Media Gallery',
        desc: 'Reusable component renders high-resolution room photos, amenity lists, pricing breakdowns, and policy disclosures.',
      },
      {
        step: '03',
        tag: 'CHECKOUT VIEW',
        title: 'Reservation Capture Form',
        desc: 'Validated booking interface captures guest credentials, special accommodations, and reservation schedule.',
      },
      {
        step: '04',
        tag: 'OWNER VIEW',
        title: 'Hotel Management Dashboard',
        desc: 'Owner-facing administration interface for publishing new room listings, updating pricing, and viewing property stats.',
      },
    ],
  },
  {
    slug: 'disease-prediction',
    title: 'Disease Prediction System',
    subtitle: 'KNN Clinical Classifier with Permutation Feature Selection',
    category: 'Machine Learning & Flask',
    year: '2023',
    featured: false,
    image: '/DPA.jpg',
    github: 'https://github.com/Abdullahar990/Disease-Prediction-App',
    summary:
      'A symptom-checker web app serving a K-Nearest Neighbors classifier trained on a labeled symptom dataset, with feature selection via permutation importance to reduce the model down to its most predictive symptoms.',
    overview:
      'This diagnostic utility analyzes patient-reported symptom vectors against labeled medical case data. Using Scikit-learn, the training pipeline executes recursive feature elimination via permutation importance to isolate high-signal symptoms, training an optimized K-Nearest Neighbors (k=10) classifier served via a lightweight Flask web service.',
    metrics: [
      { label: 'Algorithm', value: 'KNN (k=10)' },
      { label: 'Feature Selection', value: 'Permutation Imp.' },
      { label: 'Web Server', value: 'Python Flask' },
      { label: 'Data Stack', value: 'NumPy / Pandas' },
    ],
    tech: ['Python', 'Scikit-learn', 'Flask', 'NumPy', 'Pandas'],
    architectureDetails: [
      {
        title: 'Permutation Feature Elimination',
        description:
          'Evaluated symptom importance by measuring prediction degradation upon random feature shuffling, pruning non-informative symptom inputs.',
      },
      {
        title: 'K-Nearest Neighbors Classifier',
        description:
          'Distance-weighted spatial clustering (k=10) comparing active patient symptom vectors against high-density clinical training clusters.',
      },
      {
        title: 'Flask Microservice API',
        description:
          'Lightweight Python web API deserializing joblib model weights and returning ranked disease probability estimates.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'DATA PREPARATION',
        title: 'Symptom Matrix Ingestion',
        desc: 'Multi-feature symptom dataset cleansed, vectorized, and structured into binary presence matrices with Pandas and NumPy.',
      },
      {
        step: '02',
        tag: 'FEATURE SELECTION',
        title: 'Permutation Importance Pruning',
        desc: 'Iterative feature evaluation calculates symptom importance scores, stripping low-signal indicators from the feature space.',
      },
      {
        step: '03',
        tag: 'SPATIAL CLUSTERING',
        title: 'KNN Classification (k=10)',
        desc: 'Distance metric computes proximity between user symptom query and nearest labeled clinical instances in 10-neighbor space.',
      },
      {
        step: '04',
        tag: 'REST INFERENCE',
        title: 'Flask Diagnostic Response',
        desc: 'Model delivers diagnostic prediction and relative symptom match probabilities to client interface.',
      },
    ],
  },
  {
    slug: 'spare-parts',
    title: 'Spare Parts Management',
    subtitle: 'Enterprise Relational Inventory System with PDO Prepared Statements',
    category: 'Full-Stack Systems & SQL',
    year: '2023',
    featured: false,
    image: '/Spare.jpg',
    github: 'https://github.com/Abdullahar990/Spare-Parts-Management-System',
    summary:
      'A full-stack warehouse CRUD inventory system built with PHP and MySQL, featuring PDO prepared statement security, password_verify() hashing, and optimized indexed queries for fast stock reporting.',
    overview:
      'An industrial warehouse web application for monitoring stock movements, supplier catalogs, and inventory replenishment thresholds. The backend is architected with PHP Data Objects (PDO) to protect against SQL injection and utilizes B-tree indexes to maintain rapid aggregation queries across multi-category inventory tables.',
    metrics: [
      { label: 'Security', value: 'PDO / password_verify' },
      { label: 'Database', value: 'MySQL (Indexed)' },
      { label: 'Architecture', value: 'PHP MVC / CRUD' },
      { label: 'Frontend', value: 'Bootstrap / JS' },
    ],
    tech: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    architectureDetails: [
      {
        title: 'Secure PDO Authentication',
        description:
          'Cryptographic password hashing using password_verify() combined with parameterized PDO prepared statements across all database queries.',
      },
      {
        title: 'Live Relational Aggregate Queries',
        description:
          'Dashboard executing real-time SELECT COUNT(*) and threshold aggregation queries across users, products, categories, and supplier catalogs.',
      },
      {
        title: 'Warehouse Stock Flow Controls',
        description:
          'Complete transactional record keeping for part issuances, purchase receipts, low-stock threshold triggers, and inventory reports.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'AUTH VERIFICATION',
        title: 'PDO & password_verify() Security',
        desc: 'Technician credentials authenticated against cryptographic hashes via parameterized PDO queries, creating a secure session.',
      },
      {
        step: '02',
        tag: 'REAL-TIME DASHBOARD',
        title: 'Live SQL Aggregate Calculations',
        desc: 'System executes live SELECT COUNT(*) queries across products, active users, and suppliers to generate dashboard telemetry.',
      },
      {
        step: '03',
        tag: 'THRESHOLD EVALUATION',
        title: 'Indexed SKU Margin Query',
        desc: 'Relational database evaluates current part quantities against minimum reorder boundaries using indexed SKU columns.',
      },
      {
        step: '04',
        tag: 'LOGISTICS OUTPUT',
        title: 'Inventory Report & Alert Dispatch',
        desc: 'Automated requisition notices fired for depleted items; comprehensive stock reconciliation report delivered to warehouse managers.',
      },
    ],
  },
];
