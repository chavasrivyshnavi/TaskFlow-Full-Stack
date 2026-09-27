import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  ListChecks,
  BarChart3,
  Tags,
  Search,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

const FEATURES = [
  {
    icon: ListChecks,
    title: 'Built for real workloads',
    text: 'Priorities, due dates and categories keep every task exactly where it belongs.',
  },
  {
    icon: BarChart3,
    title: 'See your progress',
    text: 'A weekly chart and live stats show what you finished and what is piling up.',
  },
  {
    icon: Tags,
    title: 'Your own categories',
    text: 'Group tasks the way you actually think about your work — not the way software expects you to.',
  },
  {
    icon: Search,
    title: 'Find anything fast',
    text: 'Search, filter and sort get you to the one task you need in seconds.',
  },
];

const STEPS = [
  { title: 'Create an account', text: 'Sign up in a few seconds — no credit card, no setup.' },
  { title: 'Add your tasks', text: 'Set a priority, a category, and a due date for each one.' },
  { title: 'Track your day', text: 'Watch your dashboard update as you check things off.' },
];

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="container landing-nav-inner">
          <div className="landing-brand">
            <span className="sidebar-brand-icon">
              <CheckSquare size={20} />
            </span>
            TaskFlow
          </div>
          <div className="landing-nav-actions">
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-inner">
          <h1>
            Organize your work.
            <br />
            Own your day.
          </h1>
          <p className="hero-sub">
            TaskFlow is a focused task manager for people who have too much to do and not enough
            structure. Set priorities, track deadlines, and actually see progress.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>

          <div className="hero-preview card">
            <div className="hero-preview-top">
              <div className="hero-dot" style={{ background: '#dc2626' }} />
              <div className="hero-dot" style={{ background: '#f59e0b' }} />
              <div className="hero-dot" style={{ background: '#16a34a' }} />
            </div>
            <div className="hero-preview-body">
              <div className="hero-stat-row">
                {[
                  { label: 'Total Tasks', value: '24' },
                  { label: 'Completed', value: '16' },
                  { label: 'Pending', value: '6' },
                  { label: 'Overdue', value: '2' },
                ].map((s) => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-value">{s.value}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="hero-task-row">
                <span className="hero-task-check" />
                <span>Finish quarterly report</span>
                <span className="priority-badge badge-high">High</span>
              </div>
              <div className="hero-task-row">
                <span className="hero-task-check hero-task-check-done" />
                <span className="hero-task-done">Review design mockups</span>
                <span className="priority-badge badge-medium">Medium</span>
              </div>
              <div className="hero-task-row">
                <span className="hero-task-check" />
                <span>Plan next sprint</span>
                <span className="priority-badge badge-low">Low</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="container">
          <h2 className="section-title">Everything a busy week needs</h2>
          <div className="feature-grid">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div className="feature-card card" key={title}>
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-section-alt">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step-card" key={s.title}>
                <div className="step-number">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <Smartphone size={28} />
          <h2>Works wherever you work</h2>
          <p>Desktop, tablet or phone — your tasks stay in sync and in reach.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container landing-footer-inner">
          <div className="landing-brand">
            <span className="sidebar-brand-icon">
              <CheckSquare size={18} />
            </span>
            TaskFlow
          </div>
          <p>© {new Date().getFullYear()} TaskFlow. Built for people who like getting things done.</p>
        </div>
      </footer>
    </div>
  );
}
