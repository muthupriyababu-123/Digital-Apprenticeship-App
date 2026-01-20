import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-slideUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Bridge Theory & Practice</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Gain real-world experience by solving industry-level tasks while learning
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/register" className="btn btn-primary bg-white text-purple-600 hover:bg-gray-100">
              Get Started
            </a>
            <a href="/tasks" className="btn bg-purple-700 hover:bg-purple-800 text-white">
              Browse Tasks
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why SkillBridge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Real-World Projects',
                desc: 'Work on actual industry problems posted by leading companies',
              },
              {
                icon: '📈',
                title: 'Skill Tracking',
                desc: 'Monitor your progress with badges, levels, and internship readiness scores',
              },
              {
                icon: '🏆',
                title: 'Career Growth',
                desc: 'Get discovered by top companies and secure internship opportunities',
              },
              {
                icon: '👨‍🎓',
                title: 'Structured Learning',
                desc: 'Follow skill roadmaps from beginner to advanced levels',
              },
              {
                icon: '💼',
                title: 'Internship Matching',
                desc: 'AI-powered recommendations for internships matching your skills',
              },
              {
                icon: '📜',
                title: 'Certifications',
                desc: 'Earn verified certificates for completed tasks and skills',
              },
            ].map((feature, i) => (
              <div key={i} className="card text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">500+</div>
            <p className="text-blue-100">Active Tasks</p>
          </div>
          <div>
            <div className="text-4xl font-bold">50K+</div>
            <p className="text-blue-100">Students Joined</p>
          </div>
          <div>
            <div className="text-4xl font-bold">200+</div>
            <p className="text-blue-100">Partner Companies</p>
          </div>
          <div>
            <div className="text-4xl font-bold">1000+</div>
            <p className="text-blue-100">Internships Offered</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of students building real-world experience and landing internships
          </p>
          <a href="/register" className="btn btn-primary text-lg px-8 py-3">
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
