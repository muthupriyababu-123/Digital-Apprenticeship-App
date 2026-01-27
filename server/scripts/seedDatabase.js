const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import Models
const User = require('../models/User');
const Task = require('../models/Task');
const StudentProfile = require('../models/StudentProfile');
const Company = require('../models/Company');

/* -------------------- SEED DATABASE -------------------- */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    /* -------------------- CLEAR OLD DATA -------------------- */
    await User.deleteMany({});
    await Task.deleteMany({});
    await StudentProfile.deleteMany({});
    await Company.deleteMany({});

    console.log('✓ Cleared existing data');

    /* -------------------- CREATE USERS -------------------- */
    // Create students
    const student1 = new User({
      firstName: 'Rahul',
      lastName: 'Kumar',
      email: 'rahul@example.com',
      password: 'password123',
      role: 'student',
      skills: ['JavaScript', 'React', 'Node.js'],
      interests: ['Web Development', 'Full Stack'],
    });
    await student1.save();

    const student2 = new User({
      firstName: 'Priya',
      lastName: 'Singh',
      email: 'priya@example.com',
      password: 'password123',
      role: 'student',
      skills: ['Python', 'Data Science', 'ML'],
      interests: ['Machine Learning', 'Data Analysis'],
    });
    await student2.save();

    const student3 = new User({
      firstName: 'Test',
      lastName: 'Login',
      email: 'testlogin123@gmail.com',
      password: 'Test@1234',
      role: 'student',
      skills: ['UI/UX Design', 'Figma', 'CSS'],
      interests: ['Design', 'Frontend'],
    });
    await student3.save();

    // Create companies
    const company1 = new User({
      firstName: 'Sanjanaa',
      lastName: 'S G',
      email: 'sanjanaasasi@gmail.com',
      password: 'sanjanaa@2007#',
      role: 'company',
    });
    await company1.save();

    const company2 = new User({
      firstName: 'Data',
      lastName: 'Systems',
      email: 'datasys@example.com',
      password: 'password123',
      role: 'company',
    });
    await company2.save();

    // Create educators
    const educator1 = new User({
      firstName: 'vinu',
      lastName: 'rithika',
      email: 'vinu@example.com',
      password: 'password123',
      role: 'educator',
    });
    await educator1.save();

    const students = [student1, student2, student3];
    const companies = [company1, company2];
    const educators = [educator1];

    console.log('✓ Created users');

    /* -------------------- CREATE TASKS -------------------- */
    const tasks = await Task.insertMany([
      {
        title: 'Build a Todo App with React',
        description: 'Create a complete Todo app using React hooks.',
        category: 'web-dev',
        difficulty: 'beginner',
        skills: ['React', 'JavaScript', 'CSS'],
        postedBy: companies[0]._id,
        deliverables: ['GitHub Repo', 'Live Demo'],
        estimatedHours: 8,
        xpReward: 150,
        status: 'published',
      },
      {
        title: 'Data Analysis with Pandas',
        description: 'Analyze datasets using Python and Pandas.',
        category: 'data-science',
        difficulty: 'intermediate',
        skills: ['Python', 'Pandas', 'Matplotlib'],
        postedBy: companies[1]._id,
        deliverables: ['Notebook', 'Report'],
        estimatedHours: 12,
        xpReward: 200,
        status: 'published',
      },
      {
        title: 'REST API with Express',
        description: 'Build a secure REST API with JWT authentication.',
        category: 'web-dev',
        difficulty: 'advanced',
        skills: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        postedBy: companies[0]._id,
        deliverables: ['API Code', 'Docs'],
        estimatedHours: 15,
        xpReward: 250,
        status: 'published',
      },
    ]);

    console.log('✓ Created tasks');

    /* -------------------- STUDENT PROFILES -------------------- */
    await StudentProfile.insertMany([
      {
        user: students[0]._id,
        totalXP: 1200,
        level: 5,
        completedTasks: [tasks[0]._id],
        badges: [{ name: 'First Task', icon: '⭐', earnedAt: new Date() }],
        internshipReadinessScore: 75,
      },
      {
        user: students[1]._id,
        totalXP: 950,
        level: 4,
        completedTasks: [tasks[1]._id],
        badges: [{ name: 'Data Master', icon: '📊', earnedAt: new Date() }],
        internshipReadinessScore: 65,
      },
    ]);

    console.log('✓ Created student profiles');

    /* -------------------- COMPANY PROFILES -------------------- */
    await Company.insertMany([
      {
        user: companies[0]._id,
        companyName: 'TechCorp Solutions',
        industry: 'Software Development',
        description: 'Web and mobile application development company.',
        postedTasks: [tasks[0]._id, tasks[2]._id],
        shortlistedStudents: [students[0]._id],
        verificationStatus: 'verified',
      },
      {
        user: companies[1]._id,
        companyName: 'DataSystems AI',
        industry: 'AI & Machine Learning',
        description: 'AI-powered data science company.',
        postedTasks: [tasks[1]._id],
        shortlistedStudents: [students[1]._id],
        verificationStatus: 'verified',
      },
    ]);

    console.log('✓ Created company profiles');

    console.log('\n✅ DATABASE SEEDED SUCCESSFULLY');
    console.log('\n🔐 Sample Login Credentials');
    console.log('Student  : rahul@example.com / password123');
    console.log('Student  : priya@example.com / password123');
    console.log('Student  : testlogin123@gmail.com / Test@1234');
    console.log('Company  : datasys@example.com / password123');
    console.log('Educator : vinu@example.com / password123');

    await mongoose.connection.close();
    console.log('\n✓ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();