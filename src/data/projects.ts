export const projectsData = [
  {
    slug: 'guardiansense',
    title: 'Guardian Sense',
    subtitle: 'On-device accident detection and connected response portals',
    category: 'Applied AI & Mobile',
    year: '2024',
    featured: true,
    image: '/GS.jpg',
    github: 'https://github.com/Abdullahar990/GuardianSense',
    sourceLabel: 'View repository',
    summary:
      'A Flutter app that detects unusual motion using smartphone sensors and on-device machine learning, connected to hospital, police and admin response portals.',
    overviewTitle: 'Detect an incident close to the source.',
    overview:
      'An accident-detection model is useful only when its output can reach the people who need it. Guardian Sense connects a mobile detection pipeline with incident records and response dashboards. The Flutter app processes accelerometer and gyroscope data locally with ONNX models. Supabase and a Node.js API connect those incidents to three Next.js portals, where responders can review and manage them.',
    scope:
      'Detection runs on the phone; incident sharing and the response portals need a network connection. The figures below the introduction are project-reported detection benchmarks, rather than a guarantee of emergency response time.',
    nextIteration:
      'Evaluate false positives across more devices and everyday motion, then measure battery use and end-to-end alert delivery separately from model inference.',
    metrics: [
      { label: 'Reported detection accuracy', value: '92%' },
      { label: 'Reported inference latency', value: '<800ms' },
      { label: 'Sensor sampling rate', value: '50 Hz' },
      { label: 'Response interfaces', value: '3 portals' },
    ],
    tech: ['Flutter', 'ONNX', 'TensorFlow', 'Python', 'Next.js', 'Node.js', 'Supabase'],
    architectureDetails: [
      {
        title: 'Keep inference on the device',
        description:
          'Export the Python-trained models to ONNX so the Flutter client can analyse sensor windows locally, without sending every sample to a server.',
      },
      {
        title: 'Combine two views of motion',
        description:
          'An LSTM autoencoder models movement over time. An Isolation Forest adds an anomaly score, helping the pipeline distinguish unusual motion from its baseline.',
      },
      {
        title: 'Separate response workflows',
        description:
          'Hospital, police and admin portals share incident data through Supabase and a Node.js API, while each interface presents the information relevant to its users.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'SENSOR INPUT',
        title: 'Accelerometer & gyroscope data',
        desc: 'The phone samples acceleration and rotation at 50 Hz, building a short window of motion data for the detection pipeline.',
      },
      {
        step: '02',
        tag: 'LOCAL INFERENCE',
        title: 'LSTM autoencoder via ONNX',
        desc: 'The on-device model reconstructs a motion window. A larger difference between the input and reconstruction indicates movement outside the learned baseline.',
      },
      {
        step: '03',
        tag: 'ANOMALY DETECTION',
        title: 'Isolation Forest scoring',
        desc: 'An additional anomaly model scores the sensor features. The detection logic combines the model outputs to decide whether to raise an incident.',
      },
      {
        step: '04',
        tag: 'CONNECTED RESPONSE',
        title: 'Incident records & response portals',
        desc: 'An incident is shared through Supabase and backend services. Hospital, police and admin interfaces let responders view incidents and manage their status.',
      },
    ],
  },
  {
    slug: 'check-inn',
    title: 'Check INN, Chill Out',
    subtitle: 'A hotel discovery and booking interface prototype',
    category: 'Frontend Engineering',
    year: '2024',
    featured: false,
    image: '/Hotel.jpg',
    github: 'https://github.com/Abdullahar990/check-inn-chill-out',
    sourceLabel: 'View repository',
    summary:
      'A Next.js interface prototype for exploring hotel listings, viewing room details and entering booking or property information, with reusable guest and owner components.',
    overviewTitle: 'Make the journey from browsing to booking clear.',
    overview:
      'Hotel interfaces serve two different audiences: guests looking for a stay and owners presenting a property. This project explores both journeys through a set of Next.js and React screens. Shared navigation, image galleries and form components keep the experience consistent, while CSS Modules give each view its own layout.',
    scope:
      'This is a frontend prototype with sample listings and local form state. It demonstrates the interface and navigation; it does not process payments or persist hotel reservations.',
    nextIteration:
      'Connect the screens to a property and availability API, then add accessible form validation and test the complete reservation journey.',
    metrics: [
      { label: 'Framework', value: 'Next.js + React' },
      { label: 'Styling', value: 'CSS Modules' },
      { label: 'User journeys', value: 'Guest + owner' },
      { label: 'Project scope', value: 'UI prototype' },
    ],
    tech: ['Next.js', 'React', 'HTML5', 'CSS Modules', 'JavaScript'],
    architectureDetails: [
      {
        title: 'Reuse the shared pieces',
        description:
          'Navigation, category controls, image galleries and user details live in reusable components, keeping repeated screens consistent and easier to maintain.',
      },
      {
        title: 'Design for both audiences',
        description:
          'Guest screens focus on listings, room details and the booking journey. Owner screens focus on property information and the form for adding a hotel.',
      },
      {
        title: 'Keep form state local',
        description:
          'React state manages property fields, facility selections and image previews, allowing the owner interface to be explored before a backend is connected.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'DISCOVERY',
        title: 'Browse sample hotel listings',
        desc: 'A listing grid combines destination photos, nightly prices and ratings. Category navigation gives guests another route into the available screens.',
      },
      {
        step: '02',
        tag: 'ROOM DETAILS',
        title: 'Inspect a property',
        desc: 'A room detail page brings the photo gallery, amenities, guest capacity and sample booking information into one view.',
      },
      {
        step: '03',
        tag: 'BOOKING INTERFACE',
        title: 'Continue to the reservation screens',
        desc: 'The reserve action leads into the booking and payment interface. These screens demonstrate the proposed guest journey using sample data.',
      },
      {
        step: '04',
        tag: 'OWNER INTERFACE',
        title: 'Enter property details',
        desc: 'An owner form collects hotel information, facility selections and image previews in local state, ready for a future API integration.',
      },
    ],
  },
  {
    slug: 'disease-prediction',
    title: 'Disease Prediction System',
    subtitle: 'A symptom classification experiment with KNN and Flask',
    category: 'Machine Learning & Flask',
    year: '2023',
    featured: false,
    image: '/DPA.jpg',
    github: 'https://github.com/Abdullahar990/Disease-Prediction-App',
    sourceLabel: 'View repository',
    summary:
      'A machine learning demonstration that converts selected symptoms into a binary feature vector and returns a K-Nearest Neighbors prediction through a Flask interface.',
    overviewTitle: 'Connect a trained model to a usable interface.',
    overview:
      'This project follows a model from tabular training data to a small web application. A K-Nearest Neighbors classifier uses ten neighbors to classify symptom vectors. The training script compares feature subsets by removing a symptom, retraining and measuring the change in score. Flask loads the saved model and maps the selected symptoms into the same feature order used during training.',
    scope:
      'The application returns a predicted dataset label. It is a machine learning demonstration, without clinical validation or a medical diagnosis workflow.',
    nextIteration:
      'Use a separate validation split for feature selection, reserve the test set for final evaluation, and make model uncertainty and dataset limitations clearer in the interface.',
    metrics: [
      { label: 'Classifier', value: 'KNN · 10 neighbors' },
      { label: 'Feature evaluation', value: 'Removal + retraining' },
      { label: 'Serving layer', value: 'Python / Flask' },
      { label: 'Data preparation', value: 'NumPy / Pandas' },
    ],
    tech: ['Python', 'Scikit-learn', 'Flask', 'NumPy', 'Pandas'],
    architectureDetails: [
      {
        title: 'Evaluate the symptom features',
        description:
          'The training script removes individual features and retrains the classifier to compare scores, then saves a model trained on a selected symptom subset.',
      },
      {
        title: 'Start with a simple classifier',
        description:
          'K-Nearest Neighbors with ten neighbors provides a straightforward baseline for comparing the binary symptom input against labeled training examples.',
      },
      {
        title: 'Match training and serving inputs',
        description:
          'A saved feature list defines the input order. The Flask endpoint builds a matching binary vector, loads the model with joblib and returns one predicted label.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'DATA PREPARATION',
        title: 'Build the symptom matrix',
        desc: 'Pandas separates symptom features from the target label in the training and testing CSV files, preparing the inputs for a KNN classifier.',
      },
      {
        step: '02',
        tag: 'FEATURE EVALUATION',
        title: 'Compare reduced feature sets',
        desc: 'The script removes a feature, retrains and compares its score. A selected subset is used to train the saved model and export the symptom list.',
      },
      {
        step: '03',
        tag: 'CLASSIFICATION',
        title: 'KNN with ten neighbors',
        desc: 'Selected symptoms become a binary input vector. The classifier compares it with labeled training examples and chooses a predicted class.',
      },
      {
        step: '04',
        tag: 'WEB RESPONSE',
        title: 'Return the model prediction',
        desc: 'The Flask prediction endpoint returns a JSON response containing the predicted label for the symptom selection.',
      },
    ],
  },
  {
    slug: 'spare-parts',
    title: 'Spare Parts Management',
    subtitle: 'A PHP and MySQL interface for inventory records',
    category: 'Full-Stack Systems & SQL',
    year: '2023',
    featured: false,
    image: '/Spare.jpg',
    github: 'https://github.com/Abdullahar990/Spare-Parts-Management-System',
    sourceLabel: 'View repository',
    summary:
      'A PHP and MySQL application for managing product, supplier and user records, with table views, database operations and a dashboard of record counts.',
    overviewTitle: 'Bring day-to-day inventory records into one place.',
    overview:
      'Inventory work depends on keeping products, suppliers and users easy to find and update. This project brings those records into a PHP application backed by MySQL. PDO handles database access, separate pages support record operations, and a dashboard summarizes the number of users, products and suppliers.',
    scope:
      'The repository demonstrates inventory record management and database-backed views. Authentication and input handling would need further review before using it in a live warehouse.',
    nextIteration:
      'Strengthen account lookup, authorization and input validation, then add stock movement history and verified low-stock reporting.',
    metrics: [
      { label: 'Backend', value: 'PHP / PDO' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Records', value: 'Products + suppliers' },
      { label: 'Dashboard', value: 'SQL counts' },
    ],
    tech: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    architectureDetails: [
      {
        title: 'Use a relational data model',
        description:
          'MySQL stores the product, supplier and user records. PHP pages read those relationships to present product details and their associated suppliers.',
      },
      {
        title: 'Keep database access explicit',
        description:
          'PDO is used for database queries, including prepared statements for record lookups and updates. The project also uses password verification against stored hashes.',
      },
      {
        title: 'Give operations a clear overview',
        description:
          'A dashboard runs SQL count queries for users, products and suppliers, then displays those totals in a chart alongside links to the record management views.',
      },
    ],
    stages: [
      {
        step: '01',
        tag: 'SESSION ENTRY',
        title: 'Open the management interface',
        desc: 'A PHP login flow verifies a password against stored hashes and establishes a session used to access the management pages.',
      },
      {
        step: '02',
        tag: 'DATABASE ACCESS',
        title: 'Read product & supplier records',
        desc: 'PDO queries retrieve the data needed for product, supplier and user views, with related records combined in the interface.',
      },
      {
        step: '03',
        tag: 'RECORD OPERATIONS',
        title: 'Manage the inventory catalog',
        desc: 'Dedicated pages provide forms and table actions for adding, viewing, updating or deleting the records supported by the application.',
      },
      {
        step: '04',
        tag: 'DASHBOARD SUMMARY',
        title: 'Show current record counts',
        desc: 'SQL count queries summarize users, products and suppliers. A dashboard chart presents those totals for a quick overview.',
      },
    ],
  },
];
