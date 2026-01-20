const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const Task = require('../models/Task');
const StudentProfile = require('../models/StudentProfile');
const Company = require('../models/Company');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-apprenticeship');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    await StudentProfile.deleteMany({});
    await Company.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create sample users
    const students = await User.insertMany([
      {
        firstName: 'Rahul',
        lastName: 'Kumar',
        email: 'rahul@example.com',
        password: 'password123',
        role: 'student',
        skills: ['JavaScript', 'React', 'Node.js'],
        interests: ['Web Development', 'Full Stack'],
      },
      {
        firstName: 'Priya',
        lastName: 'Singh',
        email: 'priya@example.com',
        password: 'password123',
        role: 'student',
        skills: ['Python', 'Data Science', 'ML'],
        interests: ['Machine Learning', 'Data Analysis'],
      },
      {
        firstName: 'Amit',
        lastName: 'Patel',
        email: 'amit@example.com',
        password: 'password123',
        role: 'student',
        skills: ['UI/UX Design', 'Figma', 'CSS'],
        interests: ['Design', 'Frontend'],
      },
    ]);

    const companies = await User.insertMany([
      {
        firstName: 'Tech',
        lastName: 'Corp',
        email: 'techcorp@example.com',
        password: 'password123',
        role: 'company',
      },
      {
        firstName: 'Data',
        lastName: 'Systems',
        email: 'datasys@example.com',
        password: 'password123',
        role: 'company',
      },
    ]);

    const educators = await User.insertMany([
      {
        firstName: 'Dr',
        lastName: 'Sharma',
        email: 'sharma@college.com',
        password: 'password123',
        role: 'educator',
      },
    ]);

    console.log('✓ Created sample users');

    // Create sample tasks
    const tasks = await Task.insertMany([
      {
        title: 'Build a Todo Application with React',
        description: 'Create a fully functional todo application with add, edit, delete, and filter functionalities using React hooks.',
        category: 'web-dev',
        difficulty: 'beginner',
        skills: ['React', 'JavaScript', 'CSS'],
        postedBy: companies[0]._id,
        deliverables: ['GitHub Repository', 'Deployed Link', 'Code Documentation'],
        estimatedHours: 8,
        xpReward: 150,
        status: 'published',
      },
      {
        title: 'Data Analysis with Pandas',
        description: 'Analyze a real-world dataset using Python Pandas and create insightful visualizations.',
        category: 'data-science',
        difficulty: 'intermediate',
        skills: ['Python', 'Pandas', 'Data Analysis', 'Matplotlib'],
        postedBy: companies[1]._id,
        deliverables: ['Jupyter Notebook', 'Analysis Report'],
        estimatedHours: 12,
        xpReward: 200,
        status: 'published',
      },
      {
        title: 'E-commerce Product Page Design',
        description: 'Design a modern, responsive product page for an e-commerce website with multiple features.',
        category: 'design',
        difficulty: 'intermediate',
        skills: ['UI Design', 'Figma', 'Responsive Design'],
        postedBy: companies[0]._id,
        deliverables: ['Figma File', 'Design Specifications', 'Prototype'],
        estimatedHours: 10,
        xpReward: 180,
        status: 'published',
      },
      {
        title: 'Build a REST API with Express',
        description: 'Create a production-ready REST API with authentication, error handling, and database integration.',
        category: 'web-dev',
        difficulty: 'advanced',
        skills: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        postedBy: companies[0]._id,
        deliverables: ['API Code', 'Documentation', 'Postman Collection'],
        estimatedHours: 15,
        xpReward: 250,
        status: 'published',
      },
      {
        title: 'Mobile App UI Development',
        description: 'Develop the UI for a mobile application using React Native or Flutter.',
        category: 'mobile-dev',
        difficulty: 'intermediate',
        skills: ['React Native', 'Mobile UI', 'JavaScript'],
        postedBy: companies[0]._id,
        deliverables: ['GitHub Repo', 'APK/IPA', 'UI Screenshots'],
        estimatedHours: 14,
        xpReward: 220,
        status: 'published',
      },
      {
        title: 'Machine Learning Model Development',
        description: 'Build and train an ML model for prediction tasks with proper evaluation metrics.',
        category: 'data-science',
        difficulty: 'advanced',
        skills: ['Python', 'scikit-learn', 'TensorFlow', 'Machine Learning'],
        postedBy: companies[1]._id,
        deliverables: ['Trained Model', 'Jupyter Notebook', 'Performance Report'],
        estimatedHours: 20,
        xpReward: 300,
        status: 'published',
      },
      {
        title: 'Docker Containerization',
        description: 'Containerize a full-stack application using Docker and Docker Compose.',
        category: 'devops',
        difficulty: 'intermediate',
        skills: ['Docker', 'DevOps', 'Linux', 'YAML'],
        postedBy: companies[0]._id,
        deliverables: ['Dockerfile', 'Docker Compose File', 'Documentation'],
        estimatedHours: 8,
        xpReward: 160,
        status: 'published',
      },
      {
        title: 'Next.js Full-Stack Project',
        description: 'Build a complete full-stack application using Next.js with API routes and database.',
        category: 'web-dev',
        difficulty: 'advanced',
        skills: ['Next.js', 'React', 'API Routes', 'Database Design'],
        postedBy: companies[0]._id,
        deliverables: ['GitHub Repo', 'Live Demo', 'Technical Documentation'],
        estimatedHours: 25,
        xpReward: 350,
        status: 'published',
      },
    ]);

    console.log('✓ Created sample tasks');

    // Create student profiles
    const studentProfiles = await StudentProfile.insertMany([
      {
        user: students[0]._id,
        totalXP: 1250,
        level: 5,
        completedTasks: [tasks[0]._id, tasks[2]._id],
        badges: [
          { name: 'First Task', icon: '⭐', earnedAt: new Date() },
          { name: 'Fast Learner', icon: '🚀', earnedAt: new Date() },
        ],
        internshipReadinessScore: 75,
        skillProgress: [
          { skill: 'React', proficiency: 'advanced', tasksCompleted: 3 },
          { skill: 'JavaScript', proficiency: 'advanced', tasksCompleted: 5 },
          { skill: 'CSS', proficiency: 'intermediate', tasksCompleted: 2 },
        ],
      },
      {
        user: students[1]._id,
        totalXP: 980,
        level: 4,
        completedTasks: [tasks[1]._id],
        badges: [
          { name: 'Data Master', icon: '📊', earnedAt: new Date() },
        ],
        internshipReadinessScore: 60,
        skillProgress: [
          { skill: 'Python', proficiency: 'advanced', tasksCompleted: 4 },
          { skill: 'Data Science', proficiency: 'intermediate', tasksCompleted: 2 },
        ],
      },
    ]);

    console.log('✓ Created student profiles');

    // Create company profiles
    const companyProfiles = await Company.insertMany([
      {
        user: companies[0]._id,
        companyName: 'TechCorp Solutions',
        industry: 'Software Development',
        description: 'Leading software development company focusing on web and mobile applications.',
        postedTasks: [tasks[0]._id, tasks[2]._id, tasks[3]._id, tasks[4]._id],
        shortlistedStudents: [students[0]._id],
        verificationStatus: 'verified',
      },
      {
        user: companies[1]._id,
        companyName: 'DataSystems AI',
        industry: 'AI & Machine Learning',
        description: 'Specialized in data science, AI, and machine learning solutions.',
        postedTasks: [tasks[1]._id, tasks[5]._id],
        shortlistedStudents: [students[1]._id],
        verificationStatus: 'verified',
      },
    ]);

    console.log('✓ Created company profiles');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Sample Credentials:');
    console.log('Student: rahul@example.com / password123');
    console.log('Company: techcorp@example.com / password123');
    console.log('Educator: sharma@college.com / password123');

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
